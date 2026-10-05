import { motion } from 'framer-motion'
import '../styles/experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="portfolio-container">
        {/* Header */}
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="experience-pill-label">
            <span>// WORK EXPERIENCE</span>
          </div>

          <h2 className="experience-title">Professional Experience</h2>
        </motion.div>

        {/* Compact Technical Timeline Card */}
        <motion.div
          className="experience-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
        >
          <div className="experience-card-inner">
            {/* Left: Role & Company */}
            <div className="experience-card-header">
              <div className="experience-badge-row">
                <span className="experience-role-badge">INTERNSHIP</span>
                <span className="experience-track-id">// EXP-01</span>
              </div>

              <h3 className="experience-role-title">PYTHON DEVELOPMENT INTERN</h3>
              <p className="experience-company-name">Decode Labs</p>
            </div>

            {/* Right: Description & Skills */}
            <div className="experience-card-body">
              <p className="experience-desc">
                Worked with Python development concepts, practical programming
                tasks, problem solving and application development.
              </p>

              <div className="experience-tags">
                <span className="experience-tag">Python</span>
                <span className="experience-tag">Programming Tasks</span>
                <span className="experience-tag">Problem Solving</span>
                <span className="experience-tag">Application Dev</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
