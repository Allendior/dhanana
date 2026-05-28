"use client"
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  label: string
  sublabel?: string
}

export function StatCounter({ end, suffix = '', prefix = '', duration = 2, label, sublabel }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }

    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold" style={{ color: '#E8A838' }}>
        {prefix}{count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium tracking-wide uppercase" style={{ color: 'rgba(28,28,30,0.6)' }}>
        {label}
      </div>
      {sublabel && (
        <div className="mt-0.5 text-xs" style={{ color: 'rgba(28,28,30,0.4)' }}>{sublabel}</div>
      )}
    </div>
  )
}
