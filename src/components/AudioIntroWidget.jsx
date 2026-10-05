import { useState } from 'react'
import vigneshAvatar from '../assets/vignesh-cutout.png'

export default function AudioIntroWidget() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="hero-welcome-badge"
      onClick={() => setIsExpanded((prev) => !prev)}
      style={{ cursor: 'pointer' }}
      title="Click to toggle greeting"
    >
      <div className="welcome-avatar-wrap">
        <img
          src={vigneshAvatar}
          alt="Sirivella Vignesh"
          className="welcome-avatar-img"
        />
        <div className="welcome-avatar-pulse" />
      </div>

      <div className="welcome-badge-text">
        <span className="welcome-badge-title">Sirivella Vignesh</span>
        <span className="welcome-badge-sub">
          {isExpanded
            ? '“Building intelligent full-stack systems”'
            : 'Welcome to my portfolio!'}
        </span>
      </div>

      <div className="soundwave-bars" aria-label="Audio wave simulation">
        <span className="wave-bar" />
        <span className="wave-bar" />
        <span className="wave-bar" />
        <span className="wave-bar" />
      </div>
    </div>
  )
}
