import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/navbar.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 15)

      const heroElement = document.getElementById('hero')
      const heroBottom = heroElement ? heroElement.offsetHeight : window.innerHeight - 58
      setIsDarkSection(scrollY > heroBottom - 58)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    setMobileMenuOpen(false)
    const targetElement = document.querySelector(href)
    if (targetElement) {
      e.preventDefault()
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={`portfolio-header ${isScrolled ? 'scrolled' : ''} theme-dark`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="portfolio-container nav-container">
        <div className="nav-wrapper">
          {/* Left: VIGNESH. */}
          <a
            href="#hero"
            className="nav-brand"
            onClick={(e) => handleLinkClick(e, '#hero')}
          >
            VIGNESH.
          </a>

          {/* Center/Right Navigation */}
          <nav aria-label="Main Navigation" className="desktop-nav-wrapper">
            <ul className="desktop-nav">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="nav-link-item"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Far Right: Small rounded "Hire Me" button */}
          <div className="nav-right-actions">
            <a
              href="#contact"
              className="nav-hire-btn"
              onClick={(e) => handleLinkClick(e, '#contact')}
            >
              Hire Me
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <i className={mobileMenuOpen ? 'bi bi-x-lg' : 'bi bi-list'} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portfolio-container">
              <ul className="mobile-nav-list">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="mobile-nav-link"
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="mobile-hire-item">
                  <a
                    href="#contact"
                    className="mobile-hire-btn"
                    onClick={(e) => handleLinkClick(e, '#contact')}
                  >
                    Hire Me
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
