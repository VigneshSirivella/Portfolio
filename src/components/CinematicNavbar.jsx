import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight, Search, Volume2, VolumeX, FileText } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Credentials', id: 'credentials' },
  { label: 'Contact', id: 'contact' },
]

export default function CinematicNavbar({
  onOpenCommandPalette,
  soundEnabled,
  onToggleSound,
  onPlayClick,
}) {
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  // 2. Reading Progress & Active Section Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
      setScrollPercent(progress * 100)

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id))
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && scrollY >= sec.offsetTop - 200) {
          setActiveSection(NAV_ITEMS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const scrollToSection = (e, id) => {
    e.preventDefault()
    onPlayClick?.()
    setMobileMenuOpen(false)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Precision Reading Scroll Progress Bar */}
      <div
        className="hud-global-progress-bar"
        style={{ width: `${scrollPercent}%` }}
        aria-hidden="true"
      />

      <header className="cinematic-hud" aria-label="Main Navigation">
        <div className="hud-shell">
          {/* Brand: VIGNESH. */}
          <a
            href="#hero"
            className="hud-brand"
            onClick={(e) => scrollToSection(e, 'hero')}
          >
            <span>Vignesh</span>
            <span className="hud-brand-dot">.</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hud-desktop-nav">
            <ul className="hud-nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`hud-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Group */}
          <div className="hud-cta-group">
            {/* Direct Resume Link */}
            <a
              href="/Sirivella_Vignesh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hud-resume-btn"
              onClick={() => onPlayClick?.()}
              title="View Resume / Credentials"
            >
              <FileText size={13} />
              <span>Resume</span>
            </a>

            {/* Contact Action */}
            <a
              href="#contact"
              className="hud-contact-btn"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <span>Contact</span>
              <span>→</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="hud-mobile-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Menu Panel */}
      <div
        className={`hud-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="hud-mobile-drawer-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="hud-mobile-drawer-content">
          <div className="hud-mobile-header">
            <div className="hud-status-badge mobile-badge">
              <span className="hud-pulse-dot" />
              <span>AVAILABLE 2026</span>
            </div>
            <button
              type="button"
              className="hud-mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="hud-mobile-links">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`hud-mobile-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  style={{ '--link-idx': idx }}
                >
                  <span className="mobile-link-index">0{idx + 1}</span>
                  <span className="mobile-link-label">{item.label}</span>
                  <ArrowUpRight size={16} className="mobile-link-arrow" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hud-mobile-actions-row">
            <button
              type="button"
              className="hud-mobile-tool-btn"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCommandPalette?.()
              }}
            >
              <Search size={14} />
              <span>Command (⌘K)</span>
            </button>

            <button
              type="button"
              className={`hud-mobile-tool-btn ${soundEnabled ? 'is-active' : ''}`}
              onClick={() => {
                onPlayClick?.()
                onToggleSound?.()
              }}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{soundEnabled ? 'Sound On' : 'Sound Muted'}</span>
            </button>

            <a
              href="/Sirivella_Vignesh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hud-mobile-tool-btn"
              onClick={() => onPlayClick?.()}
            >
              <FileText size={14} />
              <span>Resume</span>
            </a>
          </div>

          <div className="hud-mobile-drawer-footer">
            <a
              href="#contact"
              className="hud-mobile-cta-btn"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              <span>Initiate Transmission</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
