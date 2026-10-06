import { useEffect, useRef } from 'react'

export default function CinematicCursor() {
  const rootRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse / trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return

    let isVisible = false
    let isHovered = false

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (!isVisible && rootRef.current) {
        isVisible = true
        rootRef.current.style.opacity = '1'
      }

      // Check if hovering over an interactive clickable element
      const target = e.target
      const interactive = Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], .btn-hero-primary, .btn-hero-secondary, .btn-project-live, .btn-project-code, .hud-link'
        )
      )

      if (interactive !== isHovered) {
        isHovered = interactive
        if (dotRef.current && ringRef.current) {
          if (isHovered) {
            dotRef.current.classList.add('hovered')
            ringRef.current.classList.add('hovered')
          } else {
            dotRef.current.classList.remove('hovered')
            ringRef.current.classList.remove('hovered')
          }
        }
      }
    }

    const handleMouseLeave = () => {
      isVisible = false
      if (rootRef.current) {
        rootRef.current.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    let animationId
    const loop = () => {
      // Lerp ring towards mouse position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      animationId = requestAnimationFrame(loop)
    }

    animationId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="cinematic-cursor-root"
      style={{ opacity: 0, transition: 'opacity 0.25s ease' }}
      aria-hidden="true"
    >
      {/* Inner luminous precision dot */}
      <div ref={dotRef} className="cinematic-cursor-dot" />

      {/* Outer fluid trailing glow ring */}
      <div ref={ringRef} className="cinematic-cursor-ring" />
    </div>
  )
}
