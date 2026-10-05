import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './styles/cinematic.css'
const CinematicCanvas = lazy(() => import('./components/CinematicCanvas'))
import CinematicNavbar from './components/CinematicNavbar'
import CinematicCursor from './components/CinematicCursor'
import CommandPalette from './components/CommandPalette'
import useSoundEffects from './hooks/useSoundEffects'
import CinematicHero from './sections/CinematicHero'
import CinematicExpertise from './sections/CinematicExpertise'
import CinematicTechStack from './sections/CinematicTechStack'
import CinematicProjects from './sections/CinematicProjects'
import CinematicCredentials from './sections/CinematicCredentials'
import CinematicContact from './sections/CinematicContact'
import CinematicFooter from './sections/CinematicFooter'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const scrollProgressRef = useRef(0)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const { soundEnabled, toggleSound, playClick, playSuccess } = useSoundEffects()

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        playClick()
        setCommandPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [playClick])

  useEffect(() => {
    // 1. Initialize Lenis Smooth Virtual Scrolling (Optimized for instant, buttery responsiveness)
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      scrollProgressRef.current = e.progress
    })

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(500, 33)

    // 2. GSAP ScrollTrigger Global Choreography
    const ctx = gsap.context(() => {
      // Hero headline entrance
      gsap.from('.hero-main-title', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from('.hero-portrait-stage', {
        scale: 0.92,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.35,
      })

      // Section titles kinetic reveals
      gsap.utils.toArray('.section-editorial-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
      })

      // Architecture Nodes: Sticky Stacking Deck Scroll Effect
      const stickyCards = gsap.utils.toArray('.expertise-sticky-card')
      const stepPills = gsap.utils.toArray('.expertise-step-indicator .step-pill')

      stickyCards.forEach((card, index) => {
        // Step tracker synchronization: highlights the step when this card is in focus at sticky position
        ScrollTrigger.create({
          trigger: card,
          start: () => (window.innerWidth <= 768 ? 'top 70px' : 'top 100px'),
          end: () => `+=${window.innerHeight * 0.45}`,
          onEnter: () => {
            stepPills.forEach((pill, i) => pill.classList.toggle('active', i === index))
          },
          onEnterBack: () => {
            stepPills.forEach((pill, i) => pill.classList.toggle('active', i === index))
          },
        })

        // Technology Badges (Skill Pills) Ambient Float & Smooth Reveal
        const pills = card.querySelectorAll('.expertise-skill-pill')
        if (pills.length) {
          pills.forEach((p) => p.classList.add('is-floating'))

          ScrollTrigger.create({
            trigger: card,
            start: index === 0 ? 'top 85%' : 'top 70%',
            onEnter: () => {
              gsap.fromTo(
                pills,
                { y: 10, opacity: 0.7 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.45,
                  stagger: 0.04,
                  ease: 'power2.out',
                  clearProps: 'opacity,transform',
                  overwrite: 'auto',
                }
              )
            },
            onEnterBack: () => {
              gsap.to(pills, {
                opacity: 1,
                y: 0,
                duration: 0.25,
                clearProps: 'opacity,transform',
                overwrite: 'auto',
              })
            },
          })
        }

        // Scale-down & dimming effect: as the NEXT card slides up and covers THIS card
        if (index < stickyCards.length - 1) {
          const nextCard = stickyCards[index + 1]
          if (card && nextCard) {
            gsap.to(card, {
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 65%',
                end: () => (window.innerWidth <= 768 ? 'top 70px' : 'top 100px'),
                scrub: true,
              },
              scale: 0.94,
              opacity: 0.35,
              transformOrigin: 'center top',
              ease: 'none',
            })
          }
        }
      })

      // Technical Stack Matrix: One-By-One Staggered Slide-in
      gsap.utils.toArray('.tech-cluster-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 55,
          opacity: 0,
          duration: 0.95,
          delay: (idx % 2) * 0.15,
          ease: 'power3.out',
          clearProps: 'transform',
        })
      })

      // Featured Projects: Pinned Sticky Stacking Deck
      const projectWrappers = gsap.utils.toArray('.project-stack-wrapper')
      projectWrappers.forEach((wrapper, index) => {
        // Stacking depth scrub: as the NEXT card slides up, this card scales down & subtly dims
        if (index < projectWrappers.length - 1) {
          const nextWrapper = projectWrappers[index + 1]
          if (wrapper && nextWrapper) {
            gsap.to(wrapper, {
              scrollTrigger: {
                trigger: nextWrapper,
                start: 'top 65%',
                end: () => (window.innerWidth <= 768 ? 'top 72px' : 'top 100px'),
                scrub: true,
              },
              scale: 0.95,
              opacity: 0.75,
              transformOrigin: 'center top',
              ease: 'none',
            })
          }
        }
      })

      // Credentials & Logs: Sequential Timeline Entrance
      gsap.utils.toArray('.credentials-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 55,
          opacity: 0,
          duration: 0.95,
          delay: idx * 0.14,
          ease: 'power3.out',
          clearProps: 'transform',
        })
      })

      // 3D Monolithic Contact dramatic scale scrub
      gsap.from('.monolithic-letters', {
        scrollTrigger: {
          trigger: '.scene-contact',
          start: 'top 90%',
          end: 'bottom bottom',
          scrub: 1.5,
        },
        scale: 0.8,
        letterSpacing: '0.02em',
        opacity: 0.15,
      })

      // Colossal footer name kinetic expansion
      gsap.from('.footer-colossal-name', {
        scrollTrigger: {
          trigger: '.scene-footer',
          start: 'top 90%',
          end: 'bottom bottom',
          scrub: 1.2,
        },
        y: 40,
        letterSpacing: '-0.08em',
      })
    })

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [])

  return (
    <div className="cinematic-experience-root">
      {/* Precision Magnetic Cinematic Cursor */}
      <CinematicCursor />

      {/* Global Interactive Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onPlayClick={playClick}
      />

      {/* Persistent Three.js Canvas Layer */}
      <Suspense fallback={null}>
        <CinematicCanvas scrollProgressRef={scrollProgressRef} />
      </Suspense>

      {/* Ambient Film Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Floating HUD Navbar with Live Clock, Search, Sound & Progress */}
      <CinematicNavbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onPlayClick={playClick}
      />

      {/* Continuous Film-Grade Sections */}
      <main id="main-cinematic-content">
        <CinematicHero />
        <CinematicExpertise />
        <CinematicTechStack />
        <CinematicProjects />
        <CinematicCredentials />
        <CinematicContact onPlaySuccess={playSuccess} />
      </main>

      {/* Monumental Editorial Footer */}
      <CinematicFooter />
    </div>
  )
}
