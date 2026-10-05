import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'

export default function CinematicFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="scene-footer">
      <div className="footer-ambient-glow" />

      <div className="cinematic-container">
        {/* Top Control Bar */}
        <div className="footer-top-row">
          <span className="footer-tagline-text">
            Software Developer · RGUKT RK Valley · Focused on Scalable Web & AI
          </span>

          <button
            type="button"
            className="footer-scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Back to Top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* ========================================================
            COLOSSAL LOWERCASE EDITORIAL SIGNATURE: "vignesh"
            (Exact ending signature from reference video 00:13)
           ======================================================== */}
        <div className="footer-colossal-signature-box">
          <span className="footer-colossal-name">vignesh</span>
        </div>

        {/* Bottom Metadata & Social Row */}
        <div className="footer-bottom-meta">
          <span>© 2026 Sirivella Vignesh. All rights reserved.</span>

          <div className="footer-social-links-list">
            <a
              href="https://github.com/VigneshSirivella"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-anchor"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/vignesh-sirivella-70b551297"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-anchor"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>

            <a
              href="mailto:vigni9866@gmail.com"
              className="footer-social-anchor"
              aria-label="Email Me"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
