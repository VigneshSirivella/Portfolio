import { useEffect } from 'react'

/**
 * Attaches a dynamic spotlight effect to cards.
 * Sets CSS custom properties `--mouse-x` and `--mouse-y` based on cursor position
 * relative to the target element, enabling radial torch highlights across borders.
 */
export function useCardSpotlight(ref, options = { tilt: true }) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = null
    const maxTilt = options.maxTilt ?? 6.5

    const handlePointerEnter = (e) => {
      if (e.pointerType === 'touch') return
      el.classList.remove('is-leaving')
    }

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        rafId = null
        const rect = el.getBoundingClientRect()
        if (!rect.width || !rect.height) return

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        el.style.setProperty('--mouse-x', `${x}px`)
        el.style.setProperty('--mouse-y', `${y}px`)

        if (options.tilt) {
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = ((y - centerY) / centerY) * -maxTilt
          const rotateY = ((x - centerX) / centerX) * maxTilt
          el.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
          el.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
        }
      })
    }

    const handlePointerLeave = (e) => {
      if (e.pointerType === 'touch') return
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      el.classList.add('is-leaving')
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
    }

    el.addEventListener('pointerenter', handlePointerEnter, { passive: true })
    el.addEventListener('pointermove', handlePointerMove, { passive: true })
    el.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      el.removeEventListener('pointerenter', handlePointerEnter)
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [ref, options.tilt, options.maxTilt])
}

export default useCardSpotlight
