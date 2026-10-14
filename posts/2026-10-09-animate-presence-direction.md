---
title: "Framer Motion 기초부터 방향별 슬라이드 구현까지"
date: "2026-01-07"
desc: "Framer Motion을 처음 적용하며 motion 컴포넌트, variants, AnimatePresence의 개념을 하나씩 파악하고, custom prop으로 방향별 슬라이드를 구현한 과정을 정리했다."
tags: ["Framer Motion"]
---

Roome 온보딩은 6단계로 구성됩니다. 이전·다음 버튼으로 단계를 이동할 수 있습니다.

![다음 버튼을 누르며 단계가 넘어가는 온보딩 화면](/blog/animate-presence-direction/온보딩.gif)

처음 구현했을 때는 단순 페이드로 전환했는데, "이전" 버튼을 누를 때도 "다음" 버튼을 누를 때와 같은 방향으로 전환됐습니다. 사용자가 앞으로 가는지 뒤로 가는지 공간적 맥락을 파악하기 어려웠습니다.

방향이 있는 슬라이드를 구현하면서 Framer Motion을 처음 적용했고, `motion` 컴포넌트부터 `AnimatePresence`, `variants`, `custom` prop까지 개념을 하나씩 파악해 나갔습니다.

## CSS 애니메이션으로는 exit를 처리하기 어렵다

방향이 있는 슬라이드를 구현하려면 현재 화면이 나가는(exit) 애니메이션과 새 화면이 들어오는(enter) 애니메이션이 모두 필요합니다. 처음에는 CSS 애니메이션으로 구현하려 했습니다.

CSS 애니메이션은 **요소가 DOM에 존재하는 동안에만** 실행됩니다. `display: none`으로 숨기면 `display`는 transition이 적용되지 않는 속성이라 즉시 사라지고, React가 컴포넌트를 언마운트하면 DOM 노드가 즉시 삭제됩니다. "페이드 아웃하면서 사라져"라고 해도, CSS 입장에서는 "사라져" 명령을 받는 순간 바로 없애버립니다.

> exit 애니메이션을 실행하려면 애니메이션이 끝날 때까지 요소를 DOM에 붙잡아 둘 주체가 필요하다.

Framer Motion의 `AnimatePresence`가 그 역할을 합니다. 자식 컴포넌트가 언마운트될 때 즉시 제거하지 않고, exit 애니메이션이 끝난 뒤에 DOM에서 제거합니다.

## motion 컴포넌트의 initial, animate, exit

Framer Motion은 React 컴포넌트에 선언적으로 애니메이션을 추가하는 라이브러리입니다. `motion` 컴포넌트로 개별 요소의 애니메이션을 정의하고, `variants`로 상태를 이름으로 묶고, `AnimatePresence`로 언마운트 시 exit 애니메이션을 실행합니다. 이 세 가지가 함께 동작합니다.

`motion.div`는 Framer Motion의 기본 단위입니다. HTML `div`와 동일하게 동작하면서 `initial`, `animate`, `exit` prop을 추가로 받습니다.

```tsx
<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -50 }}
  transition={{ duration: 0.3 }}
/>
```

- `initial`: 컴포넌트가 마운트될 때의 시작 상태
- `animate`: 마운트 후 전환되는 목표 상태
- `exit`: 언마운트될 때의 종료 상태 (`AnimatePresence` 안에 있어야 동작)

`exit`는 `AnimatePresence` 안에 있을 때만 실행됩니다. 단독으로 쓰면 브라우저가 언마운트 타이밍을 지연시켜 줄 주체가 없어 exit 애니메이션이 동작하지 않습니다.

## variants로 애니메이션 상태에 이름 붙이기

`initial`, `animate`, `exit`에 객체를 직접 넣는 방식은 간단한 경우에 적합합니다. 조건에 따라 다른 애니메이션이 필요하거나 상태를 재사용하고 싶다면 `variants`를 사용합니다.

`variants`는 각 상태를 이름으로 정의한 객체입니다. `initial`, `animate`, `exit`에는 값 대신 상태 이름을 문자열로 전달합니다.

```tsx
const variants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.25 } },
};

<motion.div
  variants={variants}
  initial="enter"
  animate="center"
  exit="exit"
/>
```

각 상태를 객체 대신 **함수**로 작성하면 외부에서 값을 주입할 수 있습니다. 이때 `custom` prop으로 전달한 값이 함수의 인자로 들어옵니다.

```ts
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50, // 앞으로: 오른쪽에서 / 뒤로: 왼쪽에서
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50, // 뒤로: 오른쪽으로 / 앞으로: 왼쪽으로
    opacity: 0,
  }),
};
```

함수가 아닌 상태(`center`)는 그대로 객체로 두면 됩니다. 함수 형태가 필요한 상태만 선택적으로 함수로 작성할 수 있습니다.

## AnimatePresence와 key의 역할

`AnimatePresence`는 자식 컴포넌트가 **언마운트되는 순간**을 감지해 exit 애니메이션을 실행합니다. 언마운트가 일어나지 않으면 exit 애니메이션도 없습니다.

여기서 React의 `key` 동작이 중요합니다. React는 `key`가 같으면 같은 컴포넌트로 취급해 재렌더하고, `key`가 다르면 다른 컴포넌트로 취급해 이전 것을 언마운트하고 새 것을 마운트합니다.

`step`이 1 → 2로 바뀔 때 두 경우를 비교하면 차이가 명확합니다.

### key={step}이 있을 때

- `step` 변경 → `key` 변경(1→2) → React: "다른 컴포넌트"
- 이전 `motion.div` 언마운트 → `AnimatePresence` 감지 → exit 애니메이션 실행
- 새 `motion.div` 마운트 → enter 애니메이션 실행

### key={step}이 없을 때

- `step` 변경 → `key` 없음(항상 같음) → React: "같은 컴포넌트, 재렌더만"
- 언마운트 없음 → `AnimatePresence`가 잡을 이벤트 없음 → exit 없음

`key={step}`의 역할은 AnimatePresence에 직접 신호를 보내는 것이 아닙니다. **React에게 "step이 바뀌면 새 컴포넌트야"라고 알려서 언마운트를 발생시키는 것**이고, AnimatePresence는 그 언마운트를 감지해 exit 애니메이션을 실행합니다.

```tsx
<AnimatePresence>
  <motion.div
    key={step}        // step이 바뀌면 React가 언마운트+마운트로 처리
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
  >
    <OnboardingStep step={step} />
  </motion.div>
</AnimatePresence>
```

## custom prop으로 방향 주입하기

방향 정보를 variants 함수에 전달하려면 `AnimatePresence`와 `motion` 컴포넌트 **양쪽에** `custom`을 설정해야 합니다.

```tsx
const [step, setStep] = useState(1);
const [direction, setDirection] = useState(0); // 1: 앞으로, -1: 뒤로

const nextStep = () => { setDirection(1); setStep((prev) => prev + 1); };
const prevStep = () => { setDirection(-1); setStep((prev) => prev - 1); };

<AnimatePresence custom={direction} mode="wait">
  <motion.div
    key={step}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    }}
  >
    {renderStep()}
  </motion.div>
</AnimatePresence>
```

두 `custom`은 각각 다른 역할을 합니다.

- `motion.div`의 `custom`: 새 컴포넌트가 **들어오는(enter)** 방향을 variants 함수에 전달
- `AnimatePresence`의 `custom`: 이전 컴포넌트가 **나가는(exit)** 방향을 variants 함수에 전달

exit 애니메이션은 이전 컴포넌트(key=1)가 언마운트되는 시점에 실행됩니다. 이 시점에는 이미 `nextStep()`이 호출되어 `direction` state가 바뀐 뒤입니다. `AnimatePresence`가 exit 순간의 `direction` 값을 붙잡고 있어야 이전 컴포넌트가 올바른 방향으로 퇴장합니다.

> `AnimatePresence`와 `motion` 컴포넌트 양쪽에 `custom`을 설정해야 exit 애니메이션도 최신 방향 값을 받는다.

## mode="wait"를 선택한 이유

`AnimatePresence`의 `mode`는 exit와 enter 애니메이션의 실행 순서를 결정합니다.

| mode | 동작 |
| ---- | ---- |
| `"sync"` (기본값) | exit와 enter를 동시에 실행. 두 화면이 겹쳐 보인다 |
| `"wait"` | exit 완료 후 enter 시작. 화면이 순차적으로 전환된다 |
| `"popLayout"` | exit 중인 컴포넌트를 레이아웃에서 즉시 제거하고 enter |

온보딩 각 단계의 내용을 명확히 읽어야 하므로 두 화면이 겹치지 않는 `"wait"`가 적합했습니다. 단점은 전환 시간이 exit + enter 시간의 합이 된다는 점입니다. x축은 `stiffness: 300, damping: 30`의 spring으로 빠르게 안착하도록 하고, opacity는 `duration: 0.2`로 짧게 가져가 딜레이를 최소화했습니다.

## key로 인한 언마운트 트레이드오프

`key={step}`으로 단계가 바뀔 때마다 컴포넌트가 완전히 언마운트·마운트됩니다. 하위 컴포넌트의 로컬 state가 초기화됩니다.

온보딩에서 단계별로 입력한 값을 다음 단계로 전달해야 하므로, 입력값을 부모 state로 lift up해서 관리했습니다.

```tsx
const [formValues, setFormValues] = useState<OnboardingFormValues>({});

<OnboardingStep
  step={step}
  values={formValues}
  onChange={(key, value) =>
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }
/>
```

다단계 폼에서는 이 구조가 오히려 순기능으로 작용합니다. 각 단계의 입력값을 부모에서 중앙 관리하도록 강제되므로, 어느 단계에서든 전체 입력 데이터를 예측 가능하게 추적할 수 있습니다.

## 정리

| 개념 | 역할 |
| ---- | ---- |
| `motion.div` | `initial`, `animate`, `exit` prop으로 애니메이션을 선언 |
| `variants` | 애니메이션 상태를 이름으로 정의. 함수 형태로 외부 값을 주입 가능 |
| `AnimatePresence` | 자식 언마운트 시 exit 애니메이션을 실행하고 DOM 제거를 지연 |
| `key` | 변경 시 AnimatePresence가 exit + enter를 트리거 |
| `custom` | variants 함수에 방향 같은 동적 값을 전달 |

`key={step}`으로 단계 변경 시 exit·enter를 트리거하고, `custom={direction}`으로 variants 함수에 방향 값을 전달합니다. CSS transition의 exit 제약은 `AnimatePresence`가 해결하고, 방향성은 `variants` 함수와 `custom` prop 조합이 담당합니다.
