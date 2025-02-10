'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LOVE_ELEMENTS = ['❤️', '🌸', '💖', '💕', '💝', '🌹', '💘', '💓']

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{ id: number; x: number; delay: number; element: string }>>([])

  useEffect(() => {
    // Create 30 floating elements with random positions and symbols
    const newElements = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (0-100%)
      delay: Math.random() * 2, // Random delay (0-2s)
      element: LOVE_ELEMENTS[Math.floor(Math.random() * LOVE_ELEMENTS.length)]
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{ left: `${element.x}%` }}
          initial={{ y: '100vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-100vh',
            opacity: [0, 1, 1, 0],
            rotate: element.id % 2 === 0 ? [0, 360] : [-360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="text-2xl transform hover:scale-150 transition-transform">
            {element.element}
          </div>
        </motion.div>
      ))}

      {/* Pulsing Hearts Background */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="text-4xl text-pink-300 opacity-20">❤️</div>
        </motion.div>
      ))}

      {/* Sparkle Effects */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        >
          <div className="text-xl">✨</div>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements 