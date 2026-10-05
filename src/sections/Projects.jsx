import { motion } from 'framer-motion'
import '../styles/projects.css'

const PROJECTS = [
  {
    id: '01',
    numLabel: '// PROJECT 01',
    title: 'AI Interview Simulator',
    category: 'FULL-STACK / AI PLATFORM',
    description:
      'An AI-powered interview preparation platform with interview practice, feedback, performance tracking, video preparation, ATS tools and responsive dashboards.',
    tags: [
      'React',
      'Vite',
      'Django',
      'PostgreSQL',
      'Gemini API',
      'Vercel',
      'Render',
    ],
    liveUrl: '#',
    codeUrl: '#',
    previewType: 'simulator',
  },
  {
    id: '02',
    numLabel: '// PROJECT 02',
    title: 'FoodZ',
    category: 'WEB APPLICATION',
    description:
      'A responsive food ordering web application with menu browsing, category filters, cart management, checkout flow, orders and mobile-friendly user experience.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Python'],
    liveUrl: '#',
    codeUrl: '#',
    previewType: 'foodz',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="portfolio-container">
        {/* Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="projects-pill-label">
            <span>// PORTFOLIO WORK</span>
          </div>

          <h2 className="projects-title">Featured Engineering Projects</h2>
        </motion.div>

        {/* Large Horizontal Project Cards */}
        <div className="projects-list">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="project-horizontal-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
            >
              {/* Left Column: Project Content & Actions */}
              <div className="project-content-column">
                <div className="project-meta-top">
                  <span className="project-num-tag">{proj.numLabel}</span>
                  <span className="project-category-tag">{proj.category}</span>
                </div>

                <h3 className="project-card-title">{proj.title}</h3>

                <p className="project-card-description">{proj.description}</p>

                {/* Tech Tags */}
                <div className="project-tags-wrap">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions-row">
                  <a
                    href={proj.liveUrl}
                    className="project-btn project-btn-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (proj.liveUrl === '#') e.preventDefault()
                    }}
                  >
                    LIVE →
                  </a>
                  <a
                    href={proj.codeUrl}
                    className="project-btn project-btn-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (proj.codeUrl === '#') e.preventDefault()
                    }}
                  >
                    CODE →
                  </a>
                </div>
              </div>

              {/* Right Column: Elegant Dark Technical Mockup Preview */}
              <div className="project-preview-column">
                <div className="project-mockup-frame">
                  {/* Browser Bar */}
                  <div className="mockup-browser-bar">
                    <div className="mockup-dots">
                      <span className="mockup-dot red" />
                      <span className="mockup-dot yellow" />
                      <span className="mockup-dot green" />
                    </div>
                    <span className="mockup-url">
                      {proj.id === '01'
                        ? 'simulator.vignesh.dev'
                        : 'foodz.vignesh.dev'}
                    </span>
                  </div>

                  {/* Mockup Canvas */}
                  <div className="mockup-canvas">
                    {proj.previewType === 'simulator' ? (
                      <div className="preview-simulator-layout">
                        <div className="preview-sidebar">
                          <div className="preview-bar sm" />
                          <div className="preview-bar sm" />
                          <div className="preview-bar sm" />
                        </div>
                        <div className="preview-main-pane">
                          <div className="preview-hero-block">
                            <span className="preview-indicator-badge">
                              <span className="dot" /> AI EVALUATION ACTIVE
                            </span>
                            <div className="preview-metric-row">
                              <div className="preview-metric-box">
                                <span className="val">94%</span>
                                <span className="lbl">ATS SCORE</span>
                              </div>
                              <div className="preview-metric-box">
                                <span className="val">A+</span>
                                <span className="lbl">FEEDBACK</span>
                              </div>
                            </div>
                          </div>
                          <div className="preview-waveform">
                            <span className="bar b1" />
                            <span className="bar b2" />
                            <span className="bar b3" />
                            <span className="bar b4" />
                            <span className="bar b5" />
                            <span className="bar b6" />
                            <span className="bar b7" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="preview-foodz-layout">
                        <div className="foodz-header-bar">
                          <span className="foodz-brand">FoodZ</span>
                          <span className="foodz-cart">CART (3)</span>
                        </div>
                        <div className="foodz-cards-row">
                          <div className="foodz-card-item">
                            <div className="foodz-item-thumb" />
                            <div className="foodz-item-line" />
                          </div>
                          <div className="foodz-card-item">
                            <div className="foodz-item-thumb" />
                            <div className="foodz-item-line" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
