import { motion } from 'framer-motion'
import vigneshImg from '../assets/vignesh.png'
import '../styles/about.css'

export default function About() {
  return (
    <section id="about" className="profile-section">
      <div className="portfolio-container">
        <div className="profile-grid">
          {/* ========================================================
              LEFT COLUMN: Tilted Rounded Profile / Device Card
             ======================================================== */}
          <motion.div
            className="profile-card-wrapper"
            initial={{ opacity: 0, y: 35, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="profile-device-card">
              <div className="profile-image-container">
                <img
                  src={vigneshImg}
                  alt="Vignesh Sirivella Profile"
                  className="profile-card-img"
                  loading="lazy"
                />
              </div>

              {/* Status Bar at Bottom of Portrait Card */}
              <div className="profile-card-footer">
                <div className="profile-status-indicator">
                  <span className="profile-status-dot" />
                  <span className="profile-status-text">OPEN TO OPPORTUNITIES</span>
                </div>
                <span className="profile-year-badge">2026</span>
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              RIGHT COLUMN: Technical Heading, Bio & Stat Blocks
             ======================================================== */}
          <motion.div
            className="profile-info-column"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pill Label */}
            <div className="profile-pill-label">
              <span>// SYSTEM PROFILE</span>
            </div>

            {/* Large Heading */}
            <h2 className="profile-title">
              <span>Hello, I'm</span>
              <span className="profile-name-highlight">Vignesh Sirivella</span>
            </h2>

            {/* Description */}
            <p className="profile-description">
              A passionate Computer Science Engineering student and developer
              focused on building clean, functional, and scalable web
              applications. I enjoy creating intuitive user experiences,
              practical software solutions, and modern full-stack projects.
            </p>

            {/* Three Compact Role / Stat Blocks */}
            <div className="profile-stats-grid">
              <div className="profile-stat-card">
                <span className="stat-card-title">Full-Stack</span>
                <span className="stat-card-label">ARCHITECT</span>
              </div>

              <div className="profile-stat-card">
                <span className="stat-card-title">React & Node</span>
                <span className="stat-card-label">CORE TOOL</span>
              </div>

              <div className="profile-stat-card">
                <span className="stat-card-title">Scalable</span>
                <span className="stat-card-label">SYSTEMS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
