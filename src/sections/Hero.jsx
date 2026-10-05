import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import vigneshImg from '../assets/vignesh.png'
import vigneshBackImg from '../assets/vignesh.png'
import '../styles/hero.css'

const ROLES = [
  { line1: 'PYTHON', line2: 'DEVELOPER' },
  { line1: 'WEB', line2: 'DEVELOPER' },
  { line1: 'FULL STACK', line2: 'DEVELOPER' },
  { line1: 'SOFTWARE', line2: 'DEVELOPER' },
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const heroRef = useRef(null)

  // Track Hero scroll progress: starts immediately at scrollY=0 and completes as Hero exits
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // True 3D card-like rotation around the vertical Y-axis:
  // 0% scroll   = 0deg   (Front view)
  // 25% scroll  = 90deg  (Thin edge)
  // 50% scroll  = 180deg (Back view)
  // 75% scroll  = 270deg (Thin edge)
  // 100% scroll = 360deg (Front view)
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 90, 180, 270, 360]
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  const handleScrollTo = (e, targetId) => {
    const el = document.querySelector(targetId)
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" ref={heroRef} className="hero-editorial-section">
      <div className="portfolio-container hero-editorial-container">
        <div className="hero-editorial-grid">
          {/* ========================================================
              LEFT ZONE: Greeting + 2-Line Animated Profession
             ======================================================== */}
          <div className="hero-zone hero-zone-left">
            <motion.div
              className="hero-left-top"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="hero-editorial-intro">HI, I'M VIGNESH</p>

              <div className="hero-editorial-profession-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    className="hero-editorial-profession-title"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.38,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="profession-line profession-line-1">
                      {ROLES[roleIndex].line1}
                    </span>
                    <span className="profession-line profession-line-2">
                      {ROLES[roleIndex].line2}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Desktop Bottom-Left Scroll Indicator */}
            <motion.div
              className="hero-editorial-scroll desktop-only"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => handleScrollTo(e, '#about')}
              style={{ cursor: 'pointer' }}
            >
              <span>↓ SCROLL TO</span>
              <span>SCRUB TIMELINE</span>
            </motion.div>
          </div>

          {/* ========================================================
              CENTER ZONE: Large Centered Portrait with 3D Y-Axis Turn
             ======================================================== */}
          <div className="hero-zone hero-zone-center">
            <div className="portrait-position-container">
              {/* 3D Perspective Container */}
              <div className="portrait-perspective">
                <motion.div
                  className="portrait-3d"
                  style={{
                    rotateY,
                  }}
                >
                  {/* Front Face: Front-Facing Portrait */}
                  <div className="portrait-face portrait-front">
                    <img
                      src={vigneshImg}
                      alt="Vignesh Sirivella"
                      className="hero-portrait-img"
                      loading="eager"
                    />
                  </div>

                  {/* Back Face: Natural Backside Presentation */}
                  <div className="portrait-face portrait-back">
                    <img
                      src={vigneshBackImg}
                      alt="Vignesh Sirivella (Back)"
                      className="hero-portrait-img hero-portrait-back-img"
                      loading="eager"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT ZONE: Middle-Right Intro + Action Pills
             ======================================================== */}
          <div className="hero-zone hero-zone-right">
            <motion.div
              className="hero-right-middle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="hero-editorial-right-heading">
                I TURN IDEAS INTO REALITY
              </h2>
              <p className="hero-editorial-right-description">
                Available for hire. Building fast, responsive web applications
                and intelligent software solutions using modern technologies.
              </p>
            </motion.div>

            <motion.div
              className="hero-editorial-right-bottom"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-editorial-buttons">
                <a
                  href="#projects"
                  className="hero-btn-editorial hero-btn-editorial-light"
                  onClick={(e) => handleScrollTo(e, '#projects')}
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="hero-btn-editorial hero-btn-editorial-outline"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                >
                  Contact Me
                </a>
              </div>
            </motion.div>

            {/* Mobile Bottom Scroll Indicator */}
            <div
              className="hero-editorial-scroll mobile-only"
              onClick={(e) => handleScrollTo(e, '#about')}
              style={{ cursor: 'pointer' }}
            >
              <span>↓ SCROLL TO</span>
              <span>SCRUB TIMELINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
