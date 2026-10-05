import { useRef } from 'react'
import { Sparkles, ShoppingBag, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'
import useCardSpotlight from '../hooks/useCardSpotlight'

function ProjectCard({ proj, index }) {
  const cardRef = useRef(null)
  useCardSpotlight(cardRef, { tilt: true })

  // ATS score telemetry
  const reportCount = 'PDF'

  return (
    <div
      ref={cardRef}
      className="project-cinematic-card spotlight-card"
      data-project-index={index}
    >
      {/* Dynamic spotlight border highlight overlay */}
      <div className="card-spotlight-border" aria-hidden="true" />

      {/* Left Column: Narrative, Metadata & Direct Actions */}
      <div className="project-info-pane">
        <div className="project-meta-pill-row">
          <span className="project-index-tag">// PROJECT {proj.id}</span>
          <span className="project-category-tag">{proj.category}</span>
          <span className="project-status-dot">
            <span className="hud-pulse-dot" />
            <span>FEATURED</span>
          </span>
        </div>

        <h3 className="project-headline">{proj.title}</h3>
        <p className="project-lead-line">{proj.headline}</p>
        <p className="project-narrative">{proj.description}</p>

        <div className="project-tags-cloud">
          {proj.tags.map((tag) => (
            <span key={tag} className="project-tech-badge">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-btn-group">
          <a
            href={proj.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-project-live"
          >
            <span>Live Experience</span>
            <ArrowUpRight size={16} />
          </a>

          <a
            href={proj.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-project-code"
          >
            <span>Source Code</span>
            <GithubIcon size={15} />
          </a>
        </div>
      </div>

      {/* Right Column: Perspective 3D Interactive UI Frame */}
      <div className="project-viewport-frame">
        {/* Browser Top Bar */}
        <div className="browser-header-strip">
          <div className="browser-traffic-lights">
            <span className="light-dot light-red" />
            <span className="light-dot light-yellow" />
            <span className="light-dot light-green" />
          </div>

          <span className="browser-url-pill">
            {proj.type === 'ai-simulator'
              ? 'ai-interview-simulator.vercel.app'
              : 'vigneshsirivella.github.io/foodz'}
          </span>

          <div className="browser-live-indicator">
            <span className="hud-pulse-dot" />
            <span>PRODUCTION</span>
          </div>
        </div>

        {/* Inner Mockup Canvas */}
        {proj.type === 'ai-simulator' ? (
          <div className="mockup-inner-canvas ai-simulator-canvas">
            {/* Active Interview Prompt Card */}
            <div className="sim-prompt-box">
              <div className="sim-prompt-meta">
                <span className="sim-prompt-badge">Q03 · SYSTEM ARCHITECTURE</span>
                <span className="sim-prompt-status">
                  <span className="hud-pulse-dot" /> AI ACTIVE
                </span>
              </div>
              <p className="sim-prompt-query">
                "Explain how React's reconciliation engine (Fiber) handles component tree diffing and state batching."
              </p>
            </div>

            {/* Simulator Telemetry Row */}
            <div className="simulator-hud-row">
              <div className="sim-user-status">
                <span className="sim-status-pulse" />
                <span className="sim-status-label">
                  AI QUESTION & FEEDBACK ENGINE
                </span>
              </div>

              <div className="sim-metrics-cluster">
                <div className="sim-metric-item">
                  <span className="sim-metric-val">{reportCount}</span>
                  <span className="sim-metric-tag">REPORTS</span>
                </div>
                <div className="sim-metric-item">
                  <span className="sim-metric-val">LIVE</span>
                  <span className="sim-metric-tag">TRENDS</span>
                </div>
              </div>
            </div>

            {/* Speech & Audio Feedback Card */}
            <div className="sim-speech-card">
              <div className="sim-speech-header">
                <span className="sim-speech-title">
                  Interview Feedback Feed
                </span>
                <span className="sim-speech-badge">
                  <Sparkles size={11} style={{ display: 'inline', marginRight: 4 }} />
                  AI FEEDBACK
                </span>
              </div>

              <div className="sim-audio-waveform">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="waveform-bar"
                    style={{
                      animationDelay: `${(i * 0.05).toFixed(2)}s`,
                      height: `${Math.max(22, Math.sin(i * 0.45) * 75 + 25)}%`,
                    }}
                  />
                ))}
              </div>

              <div className="sim-speech-feedback">
                <CheckCircle2 size={14} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                <span>Feedback generated · downloadable PDF report ready.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="foodz-mockup-canvas">
            <div className="foodz-hero-bar">
              <span className="foodz-logo">FoodZ</span>
              <span className="foodz-cart-pill">
                <ShoppingBag size={13} style={{ display: 'inline', marginRight: 5 }} />
                CART (3)
              </span>
            </div>

            <div className="foodz-cards-preview-row">
              <div className="foodz-card-item">
                <div className="foodz-item-thumb">🍔</div>
                <div className="foodz-item-line">Classic Burger · ₹149</div>
              </div>
              <div className="foodz-card-item">
                <div className="foodz-item-thumb">🍕</div>
                <div className="foodz-item-line">Artisan Pizza · ₹249</div>
              </div>
              <div className="foodz-card-item">
                <div className="foodz-item-thumb">🥗</div>
                <div className="foodz-item-line">Mediterranean · ₹199</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CinematicProjects() {
  const projects = [
    {
      id: '01',
      title: 'AI Interview Simulator',
      category: 'Full-Stack / AI Platform',
      headline: 'Next-Gen Intelligent Candidate Preparation',
      description:
        'Full-stack AI interview platform with login, registration and OTP email verification. Generates AI interview questions and candidate feedback, exports PDF reports, and tracks history, performance trends and strong/weak topics on a dashboard.',
      tags: ['React', 'TypeScript', 'Django', 'Python', 'REST APIs', 'AI API', 'Vercel', 'Render'],
      liveUrl: 'https://ai-interview-simulator-five-pink.vercel.app',
      codeUrl: 'https://github.com/VigneshSirivella/ai-interview-simulator',
      type: 'ai-simulator',
    },
    {
      id: '02',
      title: 'FoodZ',
      category: 'Web Application & Commerce',
      headline: 'Streamlined Digital Ordering Experience',
      description:
        'Responsive food-ordering app with menu browsing, search and filters (ratings, bestsellers, offers), cart, checkout, promo codes and order history, with dark/light mode and mobile-optimised layouts.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Responsive UX'],
      liveUrl: 'https://vigneshsirivella.github.io/Foodz/',
      codeUrl: 'https://github.com/VigneshSirivella/Foodz',
      type: 'foodz',
    },
  ]

  return (
    <section id="projects" className="scene-projects">
      <div className="cinematic-container">
        {/* Editorial Section Header */}
        <div className="section-editorial-header">
          <div className="section-pill-tag">
            <span>// FEATURED WORK</span>
          </div>

          <h2 className="section-editorial-title">
            Projects That Define My Journey
          </h2>

          <p className="section-editorial-subtitle">
            A curated portfolio of production-grade platforms, full-stack
            architectures, and AI models built for scale, intelligence, and speed.
          </p>
        </div>

        {/* Cinematic Stacking Deck Showcase */}
        <div className="projects-showcase-stack">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              id={`project-card-${idx}`}
              className="project-stack-wrapper"
              style={{ zIndex: idx + 1 }}
            >
              <ProjectCard proj={proj} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
