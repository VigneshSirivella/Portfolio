import { useState, useRef } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import useCardSpotlight from '../hooks/useCardSpotlight'

export default function CinematicContact({ onPlaySuccess }) {
  const cardRef = useRef(null)
  useCardSpotlight(cardRef, { tilt: true, maxTilt: 6.0 })

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({ submitted: false, message: '' })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ submitted: false, message: 'Please complete all required fields.' })
      return
    }

    onPlaySuccess?.()
    setStatus({
      submitted: true,
      message: 'Transmission dispatched. Opening your email client to send directly.',
    })

    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.firstName} ${formData.lastName}`
    )
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    setTimeout(() => {
      window.location.href = `mailto:vigni9866@gmail.com?subject=${subject}&body=${body}`
    }, 600)
  }

  return (
    <section id="contact" className="scene-contact">
      {/* ========================================================
          GIANT MONOLITHIC 3D "CONTACT" TYPOGRAPHY BACKDROP
          (Exact visual climax from reference video 00:11)
         ======================================================== */}
      <div className="monolithic-3d-contact-bg" aria-hidden="true">
        <div className="monolithic-letters">
          CONTACT
        </div>
      </div>

      {/* ========================================================
          VIBRANT CRIMSON-RED FLOATING CONTACT CARD
          (Exact match to reference video 00:12)
         ======================================================== */}
      <div ref={cardRef} className="contact-red-floating-card spotlight-card">
        {/* Dynamic spotlight border highlight overlay */}
        <div className="card-spotlight-border" aria-hidden="true" />

        {/* Left Column: Headline, Subtext & Direct Telemetry */}
        <div className="contact-card-left">
          <div>
            <h2 className="contact-card-headline">Reach Out.</h2>
            <p className="contact-card-subtext" style={{ marginTop: '1rem' }}>
              Available for software engineering roles, internships, and
              collaborative builds. Fill out the dispatch form or connect directly.
            </p>
          </div>

          <div className="contact-direct-links">
            <a
              href="mailto:vigni9866@gmail.com"
              className="contact-direct-item"
            >
              <Mail size={18} />
              <span>vigni9866@gmail.com</span>
            </a>

            <a
              href="https://github.com/VigneshSirivella"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct-item"
            >
              <GithubIcon size={18} />
              <span>github.com/VigneshSirivella</span>
            </a>

            <a
              href="https://www.linkedin.com/in/vignesh-sirivella-70b551297"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct-item"
            >
              <LinkedinIcon size={18} />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Dispatch Transmission Form */}
        <div className="contact-form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid-2col">
              <div className="cinematic-input-group">
                <label htmlFor="firstName" className="cinematic-input-label">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="cinematic-text-field"
                />
              </div>

              <div className="cinematic-input-group">
                <label htmlFor="lastName" className="cinematic-input-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="cinematic-text-field"
                />
              </div>
            </div>

            <div className="cinematic-input-group" style={{ marginTop: '1rem' }}>
              <label htmlFor="email" className="cinematic-input-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="cinematic-text-field"
              />
            </div>

            <div className="cinematic-input-group" style={{ marginTop: '1rem' }}>
              <label htmlFor="message" className="cinematic-input-label">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, team, or opportunity..."
                rows={4}
                required
                className="cinematic-text-field cinematic-textarea"
              />
            </div>

            {status.message && (
              <div
                style={{
                  marginTop: '0.85rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ffffff',
                }}
              >
                {status.submitted && <CheckCircle2 size={16} />}
                <span>{status.message}</span>
              </div>
            )}

            <button type="submit" className="contact-submit-btn">
              <span>Send Message</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
