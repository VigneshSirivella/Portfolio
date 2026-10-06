import { useState, useRef } from 'react'
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../components/SocialIcons'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ submitted: false, error: false, message: '', waUrl: '' })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitted: false,
        error: true,
        message: 'Please complete all required fields (Name, Email, Message).',
        waUrl: '',
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ submitted: false, error: false, message: 'Transmitting message to email and WhatsApp...', waUrl: '' })

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim()
    const emailSubject = `Portfolio Inquiry from ${fullName}`
    const fullMessage = `Name: ${fullName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`

    const waText = encodeURIComponent(
      `Hi Vignesh! My name is ${fullName} (${formData.email}).\n\n${formData.message}`
    )
    const waUrl = `https://wa.me/918500535949?text=${waText}`

    try {
      // 1. Send to email vigni9866@gmail.com via FormSubmit AJAX API
      await fetch('https://formsubmit.co/ajax/vigni9866@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          _subject: emailSubject,
          message: formData.message,
          _captcha: 'false',
          _template: 'box',
        }),
      })

      onPlaySuccess?.()
      setStatus({
        submitted: true,
        error: false,
        message: 'Dispatched to vigni9866@gmail.com & WhatsApp!',
        waUrl: waUrl,
      })

      // 2. Open WhatsApp with prefilled message
      setTimeout(() => {
        window.open(waUrl, '_blank')
      }, 500)

      setFormData({ firstName: '', lastName: '', email: '', message: '' })
    } catch {
      // Offline / fallback handling
      onPlaySuccess?.()
      setStatus({
        submitted: true,
        error: false,
        message: 'Dispatched to WhatsApp & Email client!',
        waUrl: waUrl,
      })
      window.open(waUrl, '_blank')
      window.location.href = `mailto:vigni9866@gmail.com?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(fullMessage)}`
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
              href="https://wa.me/918500535949?text=Hi%20Vignesh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct-item"
              style={{ color: '#25D366' }}
            >
              <WhatsAppIcon size={18} />
              <span style={{ color: '#ffffff' }}>WhatsApp: +91 8500535949</span>
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
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  background: status.error ? 'rgba(255, 42, 59, 0.2)' : 'rgba(37, 211, 102, 0.15)',
                  border: status.error ? '1px solid rgba(255, 42, 59, 0.4)' : '1px solid rgba(37, 211, 102, 0.4)',
                  fontSize: '0.88rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  color: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {status.submitted && <CheckCircle2 size={18} style={{ color: '#25D366', flexShrink: 0 }} />}
                  {status.error && <AlertCircle size={18} style={{ color: '#ff2a3b', flexShrink: 0 }} />}
                  <span>{status.message}</span>
                </div>

                {status.submitted && status.waUrl && (
                  <a
                    href={status.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      alignSelf: 'flex-start',
                      background: '#25D366',
                      color: '#000000',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      padding: '0.45rem 0.9rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      marginTop: '0.25rem',
                    }}
                  >
                    <WhatsAppIcon size={16} />
                    <span>Open in WhatsApp</span>
                  </a>
                )}
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
                  <span>Transmitting...</span>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                </>
              ) : (
                <>
                  <span>Send to Email & WhatsApp</span>
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
