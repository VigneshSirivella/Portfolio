import { motion } from 'framer-motion'
import '../styles/technologies.css'

const TECHNOLOGIES = [
  'Python',
  'JavaScript',
  'React',
  'HTML5',
  'CSS3',
  'Bootstrap',
  'Django',
  'REST APIs',
  'PostgreSQL',
  'Git',
  'GitHub',
  'Vite',
  'Render',
  'Vercel',
  'Gemini API',
  'Generative AI',
  'Responsive Design',
]

export default function Technologies() {
  return (
    <section id="skills" className="tech-section">
      <div className="portfolio-container">
        <motion.div
          className="tech-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="tech-pill-label">
            <span>// TECHNICAL STACK</span>
          </div>

          <h2 className="tech-title">Technologies I Work With</h2>

          <p className="tech-subtitle">
            Full-stack expertise across modern web development, Python,
            AI-powered applications, APIs and cloud deployment.
          </p>
        </motion.div>

        {/* Technology Pills Grid */}
        <motion.div
          className="tech-chips-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {TECHNOLOGIES.map((tech, idx) => (
            <motion.div
              key={tech}
              className="tech-chip"
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="tech-chip-index">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="tech-chip-name">{tech}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
