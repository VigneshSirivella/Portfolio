import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../styles/loader.css'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 1600 // 1.6s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const ratio = Math.min(elapsed / duration, 1)
      // Natural loader progression
      const eased = Math.round(ratio * 100)
      setProgress(eased)

      if (ratio >= 1) {
        clearInterval(interval)
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 200)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Top Technical Metadata */}
      <div className="loader-top-bar">
        <span className="loader-tech-tag">
          <span className="loader-pulse-dot" />
          INITIALIZING SYSTEM
        </span>
        <span className="loader-tech-tag">PORTFOLIO 2026</span>
      </div>

      {/* Center Identity & Large Counter */}
      <div className="loader-center-content">
        <div className="loader-name-block">
          <h1 className="loader-title">
            <span>VIGNESH</span>
            <span>SIRIVELLA</span>
          </h1>
          <p className="loader-subtitle">FULL-STACK & SOFTWARE DEVELOPER</p>
        </div>

        <div className="loader-counter-wrapper">
          <span className="loader-counter">{progress}%</span>
        </div>
      </div>

      {/* Bottom Status & Progress Bar */}
      <div className="loader-bottom-bar">
        <div className="loader-progress-track">
          <div
            className="loader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loader-bottom-labels">
          <span className="loader-status-text">LOADING MODULES...</span>
          <span className="loader-security-text">
            <i className="bi bi-shield-check me-1" />
            SECURE CONNECTION
          </span>
        </div>
      </div>
    </motion.div>
  )
}
