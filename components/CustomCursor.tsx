"use client"
import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
      setVisible(true)
    }
    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%) rotate(12deg)',
        fontSize: 28,
        lineHeight: 1,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.15s ease',
        userSelect: 'none',
      }}
    >
      🛺
    </div>
  )
}
