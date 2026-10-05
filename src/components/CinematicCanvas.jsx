import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CinematicCanvas({ scrollProgressRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050508, 0.035)

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Crimson Rim / Backlight
    const redRimLight = new THREE.PointLight(0xff2a3b, 8, 30)
    redRimLight.position.set(3, 1, 1)
    scene.add(redRimLight)

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
    keyLight.position.set(-4, 5, 6)
    scene.add(keyLight)

    // Contact Spotlight (illuminates 3D stage at the bottom)
    const contactSpotlight = new THREE.SpotLight(0xffffff, 6, 40, Math.PI / 4, 0.5, 1)
    contactSpotlight.position.set(0, -22, 10)
    contactSpotlight.target.position.set(0, -28, 0)
    scene.add(contactSpotlight)
    scene.add(contactSpotlight.target)

    // =========================================================================
    // 1. ATMOSPHERIC PARTICLE DUST FIELD
    // =========================================================================
    const particleCount = 750
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    const colorRed = new THREE.Color(0xff2a3b)
    const colorWhite = new THREE.Color(0xf1f3f7)
    const colorDim = new THREE.Color(0x525866)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60 - 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25

      const dice = Math.random()
      const c = dice > 0.7 ? colorRed : dice > 0.3 ? colorDim : colorWhite
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      scales[i] = Math.random() * 2.5 + 0.5
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Circular particle texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 32
    pCanvas.height = 32
    const pCtx = pCanvas.getContext('2d')
    const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    pCtx.fillStyle = gradient
    pCtx.beginPath()
    pCtx.arc(16, 16, 16, 0, Math.PI * 2)
    pCtx.fill()
    const pTexture = new THREE.CanvasTexture(pCanvas)

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      map: pTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // =========================================================================
    // 2. HERO SCULPTURAL RED 3D BACKDROP MESH (Matches Video)
    // =========================================================================
    const ribbonGeo = new THREE.TorusKnotGeometry(1.6, 0.42, 128, 32, 2, 3)
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xe50914,
      emissive: 0x6e0009,
      roughness: 0.25,
      metalness: 0.5,
      wireframe: false,
    })
    const heroRibbon = new THREE.Mesh(ribbonGeo, ribbonMat)
    heroRibbon.position.set(2.6, 0.2, -1.2)
    heroRibbon.scale.set(0.95, 0.95, 0.95)
    scene.add(heroRibbon)

    // Glowing red rings visible clearly behind portrait
    const ringGeo = new THREE.RingGeometry(2.4, 2.46, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff2a3b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    })
    const heroRing = new THREE.Mesh(ringGeo, ringMat)
    heroRing.position.set(2.6, 0.2, -1.8)
    scene.add(heroRing)

    // =========================================================================
    // 3. 3D MONOLITHS / EXTENSION STAGE FOR CONTACT SCENE
    // =========================================================================
    const monolithGroup = new THREE.Group()
    monolithGroup.position.set(0, -32, -2)

    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      roughness: 0.4,
      metalness: 0.8,
    })

    for (let i = -4; i <= 4; i++) {
      const pGeo = new THREE.BoxGeometry(0.8, Math.sin(Math.abs(i)) * 3 + 2, 0.8)
      const pillar = new THREE.Mesh(pGeo, pillarMat)
      pillar.position.set(i * 1.8, 0, (Math.random() - 0.5) * 2)
      monolithGroup.add(pillar)
    }
    scene.add(monolithGroup)

    // Mouse coordinates for subtle camera parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    // Responsive 3D layout: centers DNA ribbon in mobile viewport
    const updateResponsive3D = () => {
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        heroRibbon.position.set(0.1, -0.15, -1.0)
        heroRibbon.scale.set(0.72, 0.72, 0.72)
        heroRing.position.set(0.1, -0.15, -1.6)
        heroRing.scale.set(0.75, 0.75, 0.75)
        redRimLight.position.set(0.5, 0.2, 1.2)
      } else {
        heroRibbon.position.set(2.6, 0.2, -1.2)
        heroRibbon.scale.set(0.95, 0.95, 0.95)
        heroRing.position.set(2.6, 0.2, -1.8)
        heroRing.scale.set(1.05, 1.05, 1.05)
        redRimLight.position.set(3, 1, 1)
      }
    }
    updateResponsive3D()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      updateResponsive3D()
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      // Get current scroll progression (0 to 1) from Lenis or DOM fallback
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1
      const fallbackProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1)
      const progress = typeof scrollProgressRef?.current === 'number' ? scrollProgressRef.current : fallbackProgress

      // Idle rotations
      heroRibbon.rotation.x = elapsedTime * 0.25
      heroRibbon.rotation.y = elapsedTime * 0.35 + mouse.x * 0.4
      heroRing.rotation.z = -elapsedTime * 0.15

      // Atmospheric particles gentle drift (GPU accelerated mesh transform)
      particles.rotation.y = elapsedTime * 0.015
      particles.position.y = Math.sin(elapsedTime * 0.35) * 0.4

      // Camera Choreography across the continuous 3D world:
      // Scene 1 (Hero 0-15%): Camera at [0, 0, 8] with focal point on hero
      // Scene 2 (Expertise 15-35%): Camera dollies down & shifts left [1, -6, 7.5]
      // Scene 3 (Tech Stack 35-55%): Camera dollies [0, -12, 7]
      // Scene 4 (Projects 55-75%): Camera pulls back slightly for wide angle [-0.5, -18, 8]
      // Scene 5 (Credentials 75-88%): Camera descends [0, -24, 7.5]
      // Scene 6 & 7 (Contact & Footer 88-100%): Camera dives to monolithic 3D contact stage [0, -32, 6.5]
      const targetY = -progress * 32
      const targetZ = 8 - Math.sin(progress * Math.PI) * 1.5

      camera.position.y += (targetY - camera.position.y) * 0.08
      camera.position.z += (targetZ - camera.position.z) * 0.08
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05

      // Camera tilt / orientation
      camera.rotation.x = -progress * 0.1 + mouse.y * 0.04
      camera.rotation.y = mouse.x * 0.04

      // Dynamic light tracking (Mobile vs Desktop)
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        redRimLight.position.x = 0.5 + mouse.x * 0.6
        redRimLight.position.y = targetY + 0.2 + mouse.y * 0.6
      } else {
        redRimLight.position.x = 2.8 + mouse.x * 1.5
        redRimLight.position.y = targetY + 1 + mouse.y * 1.5
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      pTexture.dispose()
      ribbonGeo.dispose()
      ribbonMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
    }
  }, [scrollProgressRef])

  return (
    <div className="webgl-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="webgl-canvas" />
    </div>
  )
}
