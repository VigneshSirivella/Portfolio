import { useState, useEffect } from 'react'
import vigneshCinematic from '../assets/vignesh-cinematic.png'

const ROLES = [
  'Software Developer',
  'AI & Full-Stack Engineer',
  'Python & Django Architect',
  'React & Systems Builder',
]

export default function CinematicHero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="scene-hero">
      <div className="cinematic-container">
        <div className="hero-grid">
          {/* ========================================================
              LEFT COLUMN: Editorial Typography & Dual Action Pills
             ======================================================== */}
          <div className="hero-content-col">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>SOFTWARE DEVELOPER · RGUKT RK VALLEY</span>
            </div>

            <div className="hero-title-group">
              <h2 className="hero-salutation">Hi, I'm a</h2>
              <h1 className="hero-main-title">
                <span>{ROLES[roleIndex].split(' ')[0]}</span>{' '}
                <span className="hero-title-accent">
                  {ROLES[roleIndex].split(' ').slice(1).join(' ')}
                </span>
              </h1>
            </div>

            <p className="hero-description">
              I build fast, scalable, and modern web applications using{' '}
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>React</strong>,{' '}
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>Python</strong>,{' '}
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>Django</strong>,{' '}
              <strong style={{ color: '#ffffff', fontWeight: 600 }}>PostgreSQL</strong>, and{' '}
              <strong style={{ color: 'var(--accent-red)', fontWeight: 600 }}>AI Integration</strong>.
            </p>

            <div className="hero-actions-row">
              <a
                href="#projects"
                className="btn-hero-secondary"
                onClick={(e) => scrollTo(e, 'projects')}
              >
                <span>View My Work</span>
                <span>→</span>
              </a>

              <a
                href="#contact"
                className="btn-hero-primary"
                onClick={(e) => scrollTo(e, 'contact')}
              >
                <span>Contact Me</span>
                <span>→</span>
              </a>
            </div>

            {/* Live Engineering Impact & Telemetry Matrix */}
            <div className="hero-impact-ticker">
              <div className="impact-metric-item">
                <span className="impact-metric-val">8.1</span>
                <span className="impact-metric-label">CGPA · SEMESTER IV</span>
              </div>
              <div className="impact-metric-divider" aria-hidden="true" />
              <div className="impact-metric-item">
                <span className="impact-metric-val">2</span>
                <span className="impact-metric-label">LIVE WEB APPS</span>
              </div>
              <div className="impact-metric-divider" aria-hidden="true" />
              <div className="impact-metric-item">
                <span className="impact-metric-val">OTP + PDF</span>
                <span className="impact-metric-label">AUTH & AI REPORTS</span>
              </div>
              <div className="impact-metric-divider" aria-hidden="true" />
              <div className="impact-metric-item">
                <span className="impact-metric-val">3 PLATFORMS</span>
                <span className="impact-metric-label">VERCEL · RENDER · PAGES</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Cinematic Developer Portrait
             ======================================================== */}
          <div className="hero-visual-col">
            <div className="hero-portrait-stage">
              <img
                src={vigneshCinematic}
                alt="Sirivella Vignesh"
                className="hero-portrait-cutout"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
