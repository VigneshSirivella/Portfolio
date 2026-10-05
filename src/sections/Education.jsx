import { motion } from 'framer-motion'
import '../styles/education.css'

export default function Education() {
  return (
    <section id="certifications" className="education-section">
      <div className="portfolio-container">
        {/* Header */}
        <motion.div
          className="education-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="education-pill-label">
            <span>// ACADEMIC FOUNDATION</span>
          </div>

          <h2 className="education-title">Education & Learning</h2>
        </motion.div>

        {/* Compact Education Card */}
        <motion.div
          className="education-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
        >
          <div className="education-card-inner">
            <div className="education-left">
              <span className="education-tag">// DEGREE</span>
              <h3 className="education-degree">
                B.Tech — Computer Science & Engineering
              </h3>
              <p className="education-institution">RGUKT RK Valley</p>
            </div>

            <div className="education-right">
              <p className="education-desc">
                Core coursework focusing on Data Structures, Algorithms,
                Database Management Systems, Software Engineering, Python, and
                Full-Stack Web Development.
              </p>
              <div className="education-chips">
                <span className="education-chip">Computer Science</span>
                <span className="education-chip">Software Engineering</span>
                <span className="education-chip">Data Structures</span>
                <span className="education-chip">Web Technologies</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
