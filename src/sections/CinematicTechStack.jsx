import { useRef } from 'react'
import useCardSpotlight from '../hooks/useCardSpotlight'

function TechClusterCard({ cluster, startIndex }) {
  const cardRef = useRef(null)
  useCardSpotlight(cardRef, { tilt: true })

  return (
    <div ref={cardRef} className="tech-cluster-card spotlight-card">
      <div className="card-spotlight-border" aria-hidden="true" />

      <div className="cluster-heading-row">
        <h3 className="cluster-name">
          <span className="cluster-dot" />
          <span>{cluster.category}</span>
        </h3>
        <span className="cluster-counter">{cluster.skills.length} SKILLS</span>
      </div>

      <div className="cluster-chips-wrap">
        {cluster.skills.map((skill, sIdx) => {
          const idxStr = String(startIndex + sIdx).padStart(2, '0')
          return (
            <div key={skill} className="tech-skill-chip">
              <span className="chip-num">{idxStr}</span>
              <span>{skill}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function CinematicTechStack() {
  const clusters = [
    {
      category: 'Frontend Development',
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Vite'],
    },
    {
      category: 'Backend & APIs',
      skills: ['Python', 'Django', 'Django REST Framework', 'RESTful APIs', 'JWT Authentication', 'MVC Pattern'],
    },
    {
      category: 'Databases & Relational Systems',
      skills: ['PostgreSQL', 'MySQL', 'Relational Schemas', 'ORM Modeling', 'Query Optimization'],
    },
    {
      category: 'Cloud, AI & Production Tools',
      skills: ['Gemini API', 'Generative AI Integration', 'Vercel', 'Render', 'Git / GitHub', 'Linux Shell'],
    },
  ]

  let runningIndex = 1
  const clusterStartIndices = clusters.map((c) => {
    const start = runningIndex
    runningIndex += c.skills.length
    return start
  })

  return (
    <section id="skills" className="scene-techstack">
      <div className="cinematic-container">
        {/* Editorial Section Header */}
        <div className="section-editorial-header">
          <div className="section-pill-tag">
            <span>// TECHNICAL STACK</span>
          </div>

          <h2 className="section-editorial-title">
            Technologies I Work With
          </h2>

          <p className="section-editorial-subtitle">
            Full-stack engineering expertise across modern reactive frontends,
            Python systems, intelligent AI APIs, and reliable cloud deployments.
          </p>
        </div>

        {/* Categorized Clusters Grid */}
        <div className="tech-categories-grid">
          {clusters.map((cluster, idx) => (
            <TechClusterCard
              key={cluster.category}
              cluster={cluster}
              startIndex={clusterStartIndices[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
