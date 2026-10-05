import { useState, useEffect, useCallback, useRef } from 'react'

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('vignesh_portfolio_sound') === 'true'
    } catch {
      return false
    }
  })

  const soundEnabledRef = useRef(soundEnabled)
  useEffect(() => {
    soundEnabledRef.current = soundEnabled
    try {
      localStorage.setItem('vignesh_portfolio_sound', String(soundEnabled))
    } catch {
      // ignore
    }
  }, [soundEnabled])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev
      if (next) {
        const ctx = getAudioContext()
        if (ctx) {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12) // A5
          gain.gain.setValueAtTime(0.08, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.18)
        }
      }
      return next
    })
  }, [])

  // Subtle futuristic micro-click for buttons & interactive elements
  const playClick = useCallback(() => {
    if (!soundEnabledRef.current) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1400, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch {
      // AudioContext muted or blocked
    }
  }, [])

  // Soft high-tech confirmation chime
  const playSuccess = useCallback(() => {
    if (!soundEnabledRef.current) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const notes = [523.25, 659.25, 783.99] // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06)
        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + idx * 0.06)
        osc.stop(ctx.currentTime + idx * 0.06 + 0.2)
      })
    } catch {
      // AudioContext muted or blocked
    }
  }, [])

  return { soundEnabled, toggleSound, playClick, playSuccess }
}

export default useSoundEffects
