"use client"

import { createContext, useCallback, useContext, useRef, useState } from "react"

type ProgressBarContextType = {
  progress: number
  isActive: boolean
  isFinishing: boolean
  start: () => void
  done: () => void
}

const ProgressBarContext = createContext<ProgressBarContextType | null>(null)

export function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current)
      safetyTimeoutRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    cleanup()
    setIsFinishing(false)
    setIsActive(true)
    setProgress(30)

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) return prev
        const increment = Math.max(1, (85 - prev) * 0.1)
        return Math.min(85, prev + increment)
      })
    }, 500)

    // Safety timeout: auto-complete after 12 seconds
    safetyTimeoutRef.current = setTimeout(() => {
      done()
    }, 12000)
  }, [cleanup])

  const done = useCallback(() => {
    cleanup()
    setProgress(100)
    setIsFinishing(true)

    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
      setIsFinishing(false)
      setProgress(0)
    }, 400)
  }, [cleanup])

  return (
    <ProgressBarContext.Provider value={{ progress, isActive, isFinishing, start, done }}>
      {children}
    </ProgressBarContext.Provider>
  )
}

export function useProgressBar() {
  const context = useContext(ProgressBarContext)
  if (!context) {
    throw new Error("useProgressBar must be used within a ProgressBarProvider")
  }
  return context
}
