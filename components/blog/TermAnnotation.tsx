'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: React.ReactNode
  def: string
}

// Toss-style spring: fast deceleration with subtle overshoot
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)'

export default function TermAnnotation({ children, def }: Props) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isXl, setIsXl] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const termRef = useRef<HTMLSpanElement>(null)

  const updatePos = () => {
    if (!termRef.current) return
    const termRect = termRef.current.getBoundingClientRect()
    const root = document.querySelector('#annotation-root')
    const rootRect = root?.getBoundingClientRect()
    setPos({
      top: termRect.top,
      left: rootRect?.left ?? window.innerWidth - 280,
    })
  }

  useEffect(() => {
    const checkXl = () => setIsXl(window.innerWidth >= 1280)
    checkXl()
    setMounted(true)
    updatePos()

    // Double RAF: recalculate after initial paint, then trigger transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updatePos()
        setVisible(true)
      })
    })

    window.addEventListener('scroll', updatePos, { passive: true })
    window.addEventListener('resize', updatePos)
    window.addEventListener('resize', checkXl)

    // Images/GIFs above the term shift layout after load — recalculate on article resize
    const article = document.querySelector('article')
    const resizeObserver = new ResizeObserver(updatePos)
    if (article) resizeObserver.observe(article)

    return () => {
      window.removeEventListener('scroll', updatePos)
      window.removeEventListener('resize', updatePos)
      window.removeEventListener('resize', checkXl)
      resizeObserver.disconnect()
    }
  }, [])

  const transform = !visible
    ? 'translateY(8px) scale(0.96)'
    : hovered
    ? 'translateX(-4px) scale(1)'
    : 'translateY(0) scale(1)'

  const bgColor = hovered
    ? 'rgba(252, 252, 253, 0.95)'
    : 'rgba(255, 255, 255, 0.88)'

  return (
    <>
      <span
        ref={termRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="bg-[var(--color-brand-50)] rounded px-1 underline decoration-dotted decoration-brand-blue underline-offset-2 cursor-default"
      >
        {children}
      </span>
      {mounted && isXl && createPortal(
        <div
          style={{
            position: 'fixed',
            zIndex: 50,
            top: pos.top,
            left: pos.left,
            width: 256,
            opacity: visible ? 1 : 0,
            transform,
            backgroundColor: bgColor,
            backdropFilter: 'blur(12px) saturate(160%)',
            WebkitBackdropFilter: 'blur(12px) saturate(160%)',
            border: '1px solid rgba(0, 0, 0, 0.07)',
            borderRadius: 12,
            padding: 16,
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            transition: [
              `opacity 350ms ${SPRING}`,
              `transform 350ms ${SPRING}`,
              `background-color 200ms ${SPRING}`,
            ].join(', '),
          }}
        >
          {def}
        </div>,
        document.body
      )}
    </>
  )
}
