import { useState, useEffect, useRef, useMemo } from 'react'
import {
  Search,
  Code2,
  FolderGit2,
  Briefcase,
  Layers,
  Mail,
  FileText,
  Volume2,
  VolumeX,
  ArrowRight,
  X,
  ExternalLink,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'

export default function CommandPalette({ isOpen, onClose, soundEnabled, onToggleSound, onPlayClick }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const actions = useMemo(() => [
    {
      id: 'projects',
      category: 'Navigation',
      title: 'Featured Projects',
      subtitle: 'AI Interview Simulator & FoodZ platforms',
      icon: <FolderGit2 size={16} />,
      handler: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'expertise',
      category: 'Navigation',
      title: 'Engineering Expertise',
      subtitle: 'Frontend, Backend & Distributed Systems, Cloud & AI',
      icon: <Layers size={16} />,
      handler: () => {
        document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'skills',
      category: 'Navigation',
      title: 'Technical Stack Matrix',
      subtitle: 'React, TypeScript, Python, Django, PostgreSQL, Gemini API',
      icon: <Code2 size={16} />,
      handler: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'credentials',
      category: 'Navigation',
      title: 'Credentials & System Logs',
      subtitle: 'RGUKT RK Valley CSE & DecodeLabs Internship',
      icon: <Briefcase size={16} />,
      handler: () => {
        document.getElementById('credentials')?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'contact',
      category: 'Navigation',
      title: 'Contact & Transmission',
      subtitle: 'Send direct message or email',
      icon: <Mail size={16} />,
      handler: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'resume',
      category: 'Direct Actions',
      title: 'View Professional Resume',
      subtitle: 'Software Engineer Credentials (PDF / Document)',
      icon: <FileText size={16} />,
      badge: 'PDF',
      handler: () => {
        window.open('/Sirivella_Vignesh_Resume.pdf', '_blank')
        onClose()
      },
    },
    {
      id: 'github',
      category: 'External Links',
      title: 'GitHub Profile',
      subtitle: 'github.com/VigneshSirivella',
      icon: <GithubIcon size={16} />,
      external: true,
      handler: () => {
        window.open('https://github.com/VigneshSirivella', '_blank')
        onClose()
      },
    },
    {
      id: 'linkedin',
      category: 'External Links',
      title: 'LinkedIn Network',
      subtitle: 'Connect professionally',
      icon: <LinkedinIcon size={16} />,
      external: true,
      handler: () => {
        window.open('https://www.linkedin.com/in/vignesh-sirivella-70b551297', '_blank')
        onClose()
      },
    },
    {
      id: 'sound',
      category: 'System Preferences',
      title: soundEnabled ? 'Mute Interface Sounds' : 'Enable Interface Sounds',
      subtitle: 'Synthesized Web Audio clicks & feedback',
      icon: soundEnabled ? <VolumeX size={16} /> : <Volume2 size={16} />,
      badge: soundEnabled ? 'ACTIVE' : 'MUTED',
      handler: () => {
        onToggleSound()
      },
    },
  ], [onClose, onToggleSound, soundEnabled])

  const filtered = useMemo(() => {
    if (!query.trim()) return actions
    const q = query.toLowerCase()
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    )
  }, [actions, query])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
    setSelectedIndex(0)
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        onPlayClick?.()
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        onPlayClick?.()
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          onPlayClick?.()
          filtered[selectedIndex].handler()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex, onClose, onPlayClick])

  if (!isOpen) return null

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cmd-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Command Search Input Bar */}
        <div className="cmd-header-bar">
          <Search size={18} className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input-field"
            placeholder="Type a command or jump to section... (e.g. projects, skills, resume)"
            value={query}
            onChange={handleQueryChange}
          />
          <button className="cmd-close-btn" onClick={onClose} aria-label="Close command palette">
            <kbd className="cmd-esc-badge">ESC</kbd>
            <X size={15} />
          </button>
        </div>

        {/* Results List */}
        <div className="cmd-results-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty-state">
              <span>No commands matching "{query}"</span>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? 'is-selected' : ''}`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    onPlayClick?.()
                    item.handler()
                  }}
                >
                  <div className="cmd-item-icon">{item.icon}</div>

                  <div className="cmd-item-text">
                    <div className="cmd-item-title-row">
                      <span className="cmd-item-title">{item.title}</span>
                      {item.badge && <span className="cmd-item-badge">{item.badge}</span>}
                    </div>
                    <span className="cmd-item-subtitle">{item.subtitle}</span>
                  </div>

                  <div className="cmd-item-tail">
                    {item.external ? (
                      <ExternalLink size={13} className="cmd-tail-icon" />
                    ) : (
                      <ArrowRight size={13} className="cmd-tail-icon" />
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="cmd-footer-bar">
          <div className="cmd-helper-keys">
            <span><kbd className="cmd-key">↑</kbd><kbd className="cmd-key">↓</kbd> navigate</span>
            <span><kbd className="cmd-key">↵</kbd> select</span>
            <span><kbd className="cmd-key">esc</kbd> close</span>
          </div>
          <span className="cmd-status-indicator">
            <span className="hud-pulse-dot" /> COMMAND CENTER ACTIVE
          </span>
        </div>
      </div>
    </div>
  )
}
