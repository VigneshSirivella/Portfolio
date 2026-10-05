import { motion } from 'framer-motion'
import '../styles/roadmap.css'

const ROOT_CARDS = [
  {
    rootId: '// ROOT 01',
    title: 'Frontend Development',
    description:
      'Architecting responsive, high-performance interfaces and modern user experiences.',
    tags: ['React', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    rootId: '// ROOT 02',
    title: 'Backend Development',
    description:
      'Building robust APIs, application logic and backend services.',
    tags: ['Python', 'Django', 'REST APIs', 'PostgreSQL'],
  },
  {
    rootId: '// ROOT 03',
    title: 'AI & Machine Learning',
    description:
      'Integrating intelligent features, generative AI and AI-powered workflows.',
    tags: ['Python', 'Gemini API', 'Generative AI'],
  },
  {
    rootId: '// ROOT 04',
    title: 'Cloud & Deployment',
    description:
      'Deploying modern applications with reliable production workflows.',
    tags: ['Git', 'GitHub', 'Render', 'Vercel'],
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="roadmap-section">
      <div className="portfolio-container">
        {/* Header */}
        <motion.div
          className="roadmap-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="roadmap-pill-label">
            <span>// ENGINEERING ROADMAP</span>
          </div>

          <h2 className="roadmap-title">Core Execution Root Map</h2>
        </motion.div>

        {/* 4 Technical Root Cards */}
        <div className="roadmap-grid">
          {ROOT_CARDS.map((card, idx) => (
            <motion.div
              key={card.rootId}
              className="roadmap-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
            >
              {/* Card Top: Root ID */}
              <div className="roadmap-card-top">
                <span className="roadmap-root-id">{card.rootId}</span>
                <span className="roadmap-card-accent-line" />
              </div>

              {/* Card Body */}
              <div className="roadmap-card-body">
                <h3 className="roadmap-card-title">{card.title}</h3>
                <p className="roadmap-card-desc">{card.description}</p>
              </div>

              {/* Card Footer: Tech Tags */}
              <div className="roadmap-card-footer">
                <div className="roadmap-tags-list">
                  {card.tags.map((tag) => (
                    <span key={tag} className="roadmap-tag-item">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
