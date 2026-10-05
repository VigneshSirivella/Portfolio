import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage('Please fill in all required fields.')
      return
    }

    // Front-end transmission confirmation (no fake server calls)
    setIsSubmitted(true)
    setStatusMessage('Transmission received. Direct form delivery will be connected soon.')

    // Optional mailto trigger
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.firstName} ${formData.lastName}`)
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:vignesh@example.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="contact-section">
      <div className="portfolio-container">
        <div className="contact-grid">
          {/* Left Column: Heading & Direct Transmission Links */}
          <motion.div
            className="contact-info-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-pill-label">
              <span>// LIVE DISPATCH MODE</span>
            </div>

            <h2 className="contact-title">
              <span>Let's Build Something</span>
              <span className="contact-title-accent">Exceptional.</span>
            </h2>

            <p className="contact-description">
              Fill out the transmission form or connect with me directly below.
            </p>

            {/* Direct Connect Chips */}
            <div className="contact-links-list">
              <a
                href="mailto:vignesh@example.com"
                className="contact-link-pill"
              >
                <i className="bi bi-envelope me-2" />
                Email Dispatch
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-pill"
              >
                <i className="bi bi-github me-2" />
                GitHub
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-pill"
              >
                <i className="bi bi-linkedin me-2" />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right Column: Transmission Form */}
          <motion.div
            className="contact-form-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-form-card">
              <form onSubmit={handleSubmit} className="transmission-form">
                <div className="form-row-2col">
                  <div className="form-field-group">
                    <label htmlFor="firstName" className="form-label">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="lastName" className="form-label">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="email" className="form-label">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="message" className="form-label">
                    YOUR MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={4}
                    required
                    className="form-textarea"
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`form-status-alert ${
                      isSubmitted ? 'status-success' : 'status-error'
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                <button type="submit" className="form-submit-btn">
                  SEND MESSAGE →
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
