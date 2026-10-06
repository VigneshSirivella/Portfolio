import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'
import aiInterviewImg from '../assets/ai-interview.png'
import foodzImg from '../assets/foodz.png'

function ProjectCard({ proj, index }) {
  return (
    <div
      className="project-cinematic-card"
      data-project-index={index}
    >
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
            <span>Live Demo</span>
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

        {/* Inner Mockup Canvas / Image Showcase */}
        <div className={`project-mockup-image-box ${proj.type === 'foodz' ? 'foodz-box' : ''}`}>
          <img
            src={proj.type === 'ai-simulator' ? aiInterviewImg : foodzImg}
            alt={proj.title}
            className="project-mockup-cover-img"
            loading="eager"
            decoding="async"
          />
        </div>
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

        {/* Projects Showcase: Sequential Full View */}
        <div className="projects-showcase-stack">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              id={`project-card-${idx}`}
              className="project-stack-wrapper"
            >
              <ProjectCard proj={proj} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
