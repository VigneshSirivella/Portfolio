import { useRef } from 'react'
import { Layers, Server, Sparkles } from 'lucide-react'
import useCardSpotlight from '../hooks/useCardSpotlight'

function ExpertiseNodeCard({ node }) {
  const cardRef = useRef(null)
  useCardSpotlight(cardRef, { tilt: true })

  return (
    <div
      ref={cardRef}
      className="expertise-node-card spotlight-card"
      data-node-index={node.index}
    >
      {/* Dynamic spotlight border highlight overlay */}
      <div className="card-spotlight-border" aria-hidden="true" />

      {/* Header: Red Icon Box & Index Tag */}
      <div className="node-header">
        <div className="node-icon-wrapper">{node.icon}</div>
        <div className="node-header-meta">
          <span className="node-badge-tag">{node.shortName} ARCHITECTURE</span>
          <span className="node-index">// {node.index}</span>
        </div>
      </div>

      {/* Title & Narrative */}
      <div className="node-body">
        <h3 className="node-title">{node.title}</h3>
        <p className="node-description">{node.description}</p>
      </div>

      {/* Blueprint Accent Divider */}
      <div className="node-divider" aria-hidden="true" />

      {/* Tech Skills Badges */}
      <div className="node-skills-container">
        <div className="node-skills-header">
          <span className="skills-badge-label">// CORE TECHNOLOGIES & CAPABILITIES</span>
        </div>
        <div className="node-tags-list">
          {node.tags.map((tag, tagIdx) => (
            <div
              key={tag}
              className="node-tag-item expertise-skill-pill"
              style={{ '--pill-idx': tagIdx }}
            >
              <span className="pill-dot" aria-hidden="true" />
              <span className="pill-label">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CinematicExpertise() {
  const nodes = [
    {
      index: '01',
      shortName: 'FRONTEND',
      title: 'Frontend Architecture',
      icon: <Layers size={28} />,
      description:
        'Building responsive, high-performance interfaces with React, TypeScript and modern frontend architecture, focused on clean component systems and smooth user experiences.',
      tags: [
        'React',
        'TypeScript',
        'JavaScript',
        'HTML / CSS',
        'Vite',
        'Responsive UI',
        'State Management',
      ],
    },
    {
      index: '02',
      shortName: 'BACKEND',
      title: 'Backend & Distributed Systems',
      icon: <Server size={28} />,
      description:
        'Engineering secure REST APIs, scalable application logic, authentication workflows and relational data systems using Python and Django.',
      tags: [
        'Python',
        'Django',
        'Django REST Framework',
        'REST APIs',
        'PostgreSQL',
        'Authentication',
        'OTP',
        'API Integration',
      ],
    },
    {
      index: '03',
      shortName: 'CLOUD & AI',
      title: 'Cloud & AI Engineering',
      icon: <Sparkles size={28} />,
      description:
        'Integrating AI-powered workflows with production-ready web applications, API services and cloud deployment pipelines.',
      tags: [
        'Generative AI',
        'AI API Integration',
        'Prompt Workflows',
        'PDF Reports',
        'Vercel',
        'Render',
        'Git / GitHub',
        'Deployment',
      ],
    },
  ]

  return (
    <section id="expertise" className="scene-expertise">
      <div className="cinematic-container">
        {/* Editorial Section Header */}
        <div className="section-editorial-header">
          <div className="section-pill-tag">
            <span>// MY EXPERTISE</span>
          </div>

          <h2 className="section-editorial-title">
            Building Modern Digital Solutions with Code & AI
          </h2>

          <p className="section-editorial-subtitle">
            Combining full-stack development, artificial intelligence, and cloud
            technologies to create scalable, impactful digital experiences.
          </p>

          {/* Sequential Step Progress Tracker */}
          <div className="expertise-step-indicator" aria-label="Expertise Progress">
            <span className="step-pill active" data-step="0">
              <span className="step-num">01</span>
              <span>FRONTEND</span>
            </span>
            <span className="step-connector" />
            <span className="step-pill" data-step="1">
              <span className="step-num">02</span>
              <span>BACKEND</span>
            </span>
            <span className="step-connector" />
            <span className="step-pill" data-step="2">
              <span className="step-num">03</span>
              <span>CLOUD & AI</span>
            </span>
          </div>
        </div>

        {/* Stacked Sticky Deck Container */}
        <div className="expertise-stacked-deck">
          {nodes.map((node, idx) => (
            <div
              key={node.index}
              id={`expertise-card-${idx}`}
              className={`expertise-sticky-card card-index-${idx}`}
              style={{ zIndex: idx + 1 }}
            >
              <ExpertiseNodeCard node={node} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
