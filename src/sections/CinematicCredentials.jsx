import { useRef } from 'react'
import { GraduationCap, Briefcase, GitBranch } from 'lucide-react'
import useCardSpotlight from '../hooks/useCardSpotlight'

function CredentialCard({ children, className = '' }) {
  const cardRef = useRef(null)
  useCardSpotlight(cardRef, { tilt: true })

  return (
    <div ref={cardRef} className={`credentials-card spotlight-card ${className}`}>
      <div className="card-spotlight-border" aria-hidden="true" />
      {children}
    </div>
  )
}

export default function CinematicCredentials() {
  const repos = [
    { name: 'ai-interview-simulator', desc: 'Full-stack AI candidate evaluation platform with Django & React', lang: 'TypeScript / Python' },
    { name: 'Foodz', desc: 'Responsive web food commerce with dynamic cart & menu filtering', lang: 'JavaScript / Python' },
    { name: 'cricmotion', desc: 'Sports telemetry & motion analytics backend system', lang: 'Python' },
    { name: 'voicebox', desc: 'Speech processing & audio prompt experimental interface', lang: 'Python / Web' },
  ]

  return (
    <section id="credentials" className="scene-credentials">
      <div className="cinematic-container">
        {/* Editorial Section Header */}
        <div className="section-editorial-header">
          <div className="section-pill-tag">
            <span>// CREDENTIALS & SYSTEM LOGS</span>
          </div>

          <h2 className="section-editorial-title">
            System Logs & Professional Credentials
          </h2>

          <p className="section-editorial-subtitle">
            Reviewing architecture matrices, verified internships, academic
            foundation, and software repositories continuously.
          </p>
        </div>

        {/* 2-Column Split Grid */}
        <div className="credentials-split-grid">
          {/* Left Column: Work Experience & Engineering Repositories */}
          <div className="credentials-column">
            {/* Internship Card */}
            <CredentialCard>
              <div className="cred-card-top">
                <span className="cred-category-badge">
                  <Briefcase size={12} style={{ display: 'inline', marginRight: 4 }} />
                  INTERNSHIP · CERTIFIED
                </span>
                <span className="cred-date-tag">JUN 30 – JUL 30, 2026</span>
              </div>

              <h3 className="cred-title">Python Programming Virtual Internship</h3>
              <p className="cred-organization">DecodeLabs · Virtual Internship</p>

              <p className="cred-description">
                Engaged in foundational and practical software development tasks,
                algorithm problem-solving, modular code architecture, and hands-on
                Python application builds.
              </p>

              <div className="cred-highlights-row">
                <span className="cred-highlight-pill">Python 3</span>
                <span className="cred-highlight-pill">Practical Tasks</span>
                <span className="cred-highlight-pill">Problem Solving</span>
                <span className="cred-highlight-pill">Application Logic</span>
              </div>
            </CredentialCard>

            {/* Repositories Telemetry */}
            <CredentialCard>
              <div className="cred-card-top">
                <span className="cred-category-badge">
                  <GitBranch size={12} style={{ display: 'inline', marginRight: 4 }} />
                  ACTIVE SYSTEM REPOSITORIES
                </span>
                <span className="cred-date-tag">GITHUB TELEMETRY</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {repos.map((r) => (
                  <div
                    key={r.name}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-subtle)',
                      transition: 'border-color 0.25s ease, transform 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 42, 59, 0.4)'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      e.currentTarget.style.transform = 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)' }}>
                        {r.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-red)' }}>
                        {r.lang}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {r.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CredentialCard>
          </div>

          {/* Right Column: Academic Foundation */}
          <div className="credentials-column">
            <CredentialCard>
              <div className="cred-card-top">
                <span className="cred-category-badge">
                  <GraduationCap size={13} style={{ display: 'inline', marginRight: 4 }} />
                  ACADEMIC FOUNDATION
                </span>
                <span className="cred-date-tag">EXPECTED GRADUATION: 2028</span>
              </div>

              <h3 className="cred-title">B.Tech — Computer Science & Engineering</h3>
              <p className="cred-organization">
                Rajiv Gandhi University of Knowledge Technologies (RGUKT) · RK Valley
              </p>

              <div className="academic-gpa-stat">
                <span className="gpa-number">8.1</span>
                <span className="gpa-label">Cumulative CGPA (through Semester IV)</span>
              </div>

              <p className="cred-description">
                Rigorous four-year engineering curriculum focused on core computing principles,
                modern algorithms, database architecture, distributed systems, and software engineering.
              </p>

              <div className="academic-coursework-block">
                <span className="coursework-title">// CORE RELEVANT COURSEWORK</span>
                <div className="coursework-tags-wrap">
                  {[
                    'Data Structures & Algorithms',
                    'Database Management Systems',
                    'Object-Oriented Programming (Java/Python)',
                    'Operating Systems',
                    'Computer Networks',
                    'Web Technologies & REST APIs',
                    'Software Engineering',
                  ].map((c) => (
                    <span key={c} className="coursework-pill">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </CredentialCard>

            {/* Algorithmic Problem Solving & Engineering Metrics Card */}
            <CredentialCard>
              <div className="cred-card-top">
                <span className="cred-category-badge">
                  <span className="hud-pulse-dot" />
                  ALGORITHMIC TELEMETRY
                </span>
                <span className="cred-date-tag">CONTINUOUS MASTERY</span>
              </div>

              <h3 className="cred-title">Data Structures & System Algorithms</h3>
              <p className="cred-organization">Python · Java · Algorithmic Architecture</p>

              <div className="algo-telemetry-grid">
                <div className="algo-stat-box">
                  <span className="algo-stat-number">200+</span>
                  <span className="algo-stat-label">Problems Solved</span>
                </div>
                <div className="algo-stat-box">
                  <span className="algo-stat-number">100%</span>
                  <span className="algo-stat-label">Clean Code Modularity</span>
                </div>
                <div className="algo-stat-box">
                  <span className="algo-stat-number">O(log n)</span>
                  <span className="algo-stat-label">Search Optimizations</span>
                </div>
              </div>

              <div className="cred-highlights-row" style={{ marginTop: '1rem' }}>
                <span className="cred-highlight-pill">Trees & Graphs</span>
                <span className="cred-highlight-pill">Dynamic Programming</span>
                <span className="cred-highlight-pill">Hash Maps</span>
                <span className="cred-highlight-pill">Relational Schemas</span>
              </div>
            </CredentialCard>
          </div>
        </div>
      </div>
    </section>
  )
}
