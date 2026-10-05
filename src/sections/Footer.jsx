import '../styles/footer.css'

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-container footer-container">
        <div className="footer-left">
          <a href="#hero" className="footer-brand" onClick={handleScrollToTop}>
            VIGNESH.
          </a>
          <span className="footer-tech-stack">Built with React + Vite</span>
        </div>

        <div className="footer-right">
          <span className="footer-copyright">
            © 2026 Vignesh Sirivella. All rights reserved.
          </span>
          <button
            type="button"
            className="footer-back-to-top"
            onClick={handleScrollToTop}
            aria-label="Back to top"
          >
            ↑ TOP
          </button>
        </div>
      </div>
    </footer>
  )
}
