import { useState, useRef } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import useCardSpotlight from '../hooks/useCardSpotlight'

export default function CinematicContact({ onPlaySuccess }) {
  const cardRef = useRef(null)
  useCardSpotlight(cardRef, { tilt: false })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ submitted: false, error: false, message: '' })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitted: false,
        error: true,
        message: 'Please complete all fields (Name, Email, and Message / Query).',
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ submitted: false, error: false, message: 'Sending message...' })

    try {
      const response = await fetch('https://formsubmit.co/ajax/e5547f81d9c9035a6b5f6e04c5198d1f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          'Message / Query': formData.message.trim(),
          _replyto: formData.email.trim(),
          _subject: `New Portfolio Contact — ${formData.name.trim()}`,
          _captcha: 'false',
          _template: 'table',
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && (data.success === 'true' || data.success === true || data.success === undefined)) {
        onPlaySuccess?.()
        setStatus({
          submitted: true,
          error: false,
          message: 'Message sent successfully! Thank you for reaching out.',
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      setStatus({
        submitted: false,
        error: true,
        message: err.message || 'Unable to deliver message right now. Please check connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
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

        {/* Right Column: Transmission Form */}
        <div className="contact-form-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid-2col">
              <div className="cinematic-input-group">
                <label htmlFor="name" className="cinematic-input-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="cinematic-text-field"
                />
              </div>

              <div className="cinematic-input-group">
                <label htmlFor="email" className="cinematic-input-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="cinematic-text-field"
                />
              </div>
            </div>

            <div className="cinematic-input-group" style={{ marginTop: '1rem' }}>
              <label htmlFor="message" className="cinematic-input-label">
                Message / Query *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message or query here..."
                rows={4}
                required
                className="cinematic-text-field cinematic-textarea"
              />
            </div>

            {status.message && (
              <div
                style={{
                  marginTop: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: status.error ? 'rgba(255, 42, 59, 0.2)' : 'rgba(34, 197, 94, 0.15)',
                  border: status.error ? '1px solid rgba(255, 42, 59, 0.4)' : '1px solid rgba(34, 197, 94, 0.4)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ffffff',
                }}
              >
                {status.submitted && <CheckCircle2 size={18} style={{ color: '#22c55e', flexShrink: 0 }} />}
                {status.error && <AlertCircle size={18} style={{ color: '#ff2a3b', flexShrink: 0 }} />}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            >
              {isSubmitting ? (
                <>
                  <span>Sending Message...</span>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
