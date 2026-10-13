---
title: "innerHTML 대신 TreeWalker로 텍스트 하이라이팅"
date: "2026-07-27"
desc: "innerHTML 치환으로 금융 용어에 span을 삽입하면 뉴스 사이트의 이벤트 리스너가 파괴되는 문제를, TreeWalker로 텍스트 노드만 순회하고 DocumentFragment로 일괄 교체해 DOM 무결성을 유지했다."
tags: ["JavaScript", "DOM", "Chrome Extension"]
---

light 확장 프로그램이 기사에서 금융 용어를 감지하면 `<span class="light-term">` 태그로 감싸야 합니다. 텍스트 중간에 HTML 태그를 삽입하는 가장 간단한 방법은 `innerHTML`을 사용하는 것입니다. 네이버 뉴스에서 테스트했을 때 용어는 정상적으로 하이라이팅됐지만 기사 공유 버튼이 동작하지 않았습니다. 댓글 영역도 초기화됐습니다.

## innerHTML을 재설정하면 DOM이 재파싱된다

`element.innerHTML`에 값을 할당하면 해당 요소 전체가 HTML로 재파싱됩니다. 재파싱 과정에서 새 DOM 노드가 생성되는데, 기존 노드에 `addEventListener`로 붙인 리스너는 이 새 노드에 존재하지 않습니다.

```js
// 위험한 방식
element.innerHTML = element.innerHTML.replace(
  /배당수익률/,
  "<span class='light-term'>배당수익률</span>"
);
// → 이벤트 리스너 전부 제거됨
// → 뉴스 사이트의 공유·댓글·동영상 플레이어 동작 불가
```

단순 순회도 문제가 있습니다. `querySelectorAll("*")`로 모든 노드를 순회하면 `<script>` 안의 JavaScript 코드, `<input>` placeholder, `<title>` 텍스트도 처리 대상에 포함됩니다. 스크립트 내부에 "ETF"라는 문자열이 있으면 JavaScript 코드가 파괴될 수 있습니다.

## TreeWalker — 텍스트 노드만 선택적으로 순회

[`TreeWalker`](https://developer.mozilla.org/ko/docs/Web/API/TreeWalker)는 DOM 트리를 순회하는 API입니다. `NodeFilter.SHOW_TEXT`를 지정하면 텍스트 노드만 방문합니다. `acceptNode` 필터 함수로 순회 대상을 세밀하게 제어할 수 있습니다.

```ts
// termScanner.ts

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "CODE", "PRE"]);

function scanAndHighlight(root: Element, terms: string[]) {
  const termPattern = new RegExp(`(${terms.map(escapeRegex).join("|")})`, "g");

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (node.parentElement && SKIP_TAGS.has(node.parentElement.tagName)) {
          return NodeFilter.FILTER_REJECT; // script·style 안은 건너뜀
        }
        if (!node.nodeValue?.trim()) return NodeFilter.FILTER_SKIP; // 빈 텍스트 건너뜀
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  // 먼저 처리 대상 텍스트 노드 목록 수집
  // 순회 중 DOM을 직접 수정하면 TreeWalker가 깨지므로 2단계로 처리
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  textNodes.forEach((textNode) => {
    if (!termPattern.test(textNode.nodeValue ?? "")) return;
    termPattern.lastIndex = 0;
    replaceTextNode(textNode, termPattern);
  });
}
```

TreeWalker는 기존 DOM을 유지하면서 텍스트 노드만 방문합니다. `script`·`style` 내부는 `FILTER_REJECT`로 완전히 건너뛰어 스크립트 파괴 위험이 없습니다.

<Callout type="warning">
TreeWalker 순회 중 DOM을 수정하면 순회 상태가 깨집니다. 반드시 텍스트 노드를 먼저 수집한 뒤, 수집이 끝나고 나서 DOM을 수정해야 합니다.
</Callout>

## DocumentFragment — 리플로우를 1회로 줄이기

텍스트 노드를 span으로 교체할 때 DOM에 노드를 하나씩 추가하면 추가할 때마다 리플로우가 발생합니다. [`DocumentFragment`](https://developer.mozilla.org/ko/docs/Web/API/DocumentFragment)는 메모리 상의 임시 컨테이너로, DOM에 실제로 연결되어 있지 않습니다. Fragment에 모든 노드를 먼저 구성한 뒤 `replaceChild`로 한 번에 교체하면 리플로우가 1회만 발생합니다.

```ts
function replaceTextNode(textNode: Text, pattern: RegExp) {
  const text = textNode.nodeValue ?? "";
  // split(pattern): 캡처 그룹이 있으면 구분자(용어)도 배열에 포함됨
  // ["일반텍스트", "ETF", "는 상장지수펀드"] 형태
  const parts = text.split(pattern);

  if (parts.length === 1) return;

  const fragment = document.createDocumentFragment();
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      // 홀수 인덱스: 매칭된 용어 → span으로 감싸기
      const span = document.createElement("span");
      span.className = "light-term";
      span.setAttribute("data-term", part);
      span.textContent = part;
      fragment.appendChild(span);
    } else {
      if (part) fragment.appendChild(document.createTextNode(part));
    }
  });

  // 한 번에 교체 → 리플로우 1회
  textNode.parentNode?.replaceChild(fragment, textNode);
}
```

## 정리

| 방식 | 이벤트 리스너 | script·style 처리 | 리플로우 |
|------|--------------|-------------------|---------|
| `innerHTML` 치환 | 파괴됨 | script 파괴 위험 | N회 |
| `querySelectorAll("*")` 순회 | 유지 | 포함됨 (오탐) | N회 |
| **TreeWalker + DocumentFragment** | 유지 | 완전 제외 | 1회 |

`innerHTML`을 쓰지 않는 것이 핵심이었습니다. 기존 DOM을 유지하면서 텍스트 노드만 교체해야 뉴스 사이트의 공유·댓글·동영상 플레이어가 그대로 동작합니다. TreeWalker는 DOM을 건드리지 않고 원하는 노드만 수집할 수 있어 이 요구사항에 맞았습니다.
