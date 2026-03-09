"use client"

import { useProgressBar } from "@lib/context/progress-bar-context"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export default function NavigationProgress() {
  const { start, done } = useProgressBar()
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  // Complete progress bar when pathname changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      done()
      prevPathname.current = pathname
    }
  }, [pathname, done])

  // Intercept link clicks to start progress bar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return

      const href = target.getAttribute("href")
      if (!href) return

      // Skip external links, hash links, new tabs, and download links
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return
      }

      // Skip external URLs
      try {
        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) return
        // Skip if navigating to the same page
        if (url.pathname === window.location.pathname) return
      } catch {
        return
      }

      start()
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [start])

  return null
}
