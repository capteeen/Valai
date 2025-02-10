'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const SPARKLE_CHARACTERS = ['✨', '⭐', '🌟', '💫', '✦', '✯']

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; character: string }>>([])

  useEffect(() => {
    // Create initial sparkles
    const initialSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      character: SPARKLE_CHARACTERS[Math.floor(Math.random() * SPARKLE_CHARACTERS.length)]
    }))
    setSparkles(initialSparkles)

    // Add new sparkles periodically
    const interval = setInterval(() => {
      setSparkles(current => {
        const newSparkle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          character: SPARKLE_CHARACTERS[Math.floor(Math.random() * SPARKLE_CHARACTERS.length)]
        }
        return [...current.slice(-14), newSparkle] // Keep last 15 sparkles
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Random Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 0.5, 1],
          }}
        >
          <div className="text-xl md:text-2xl text-yellow-400">{sparkle.character}</div>
        </motion.div>
      ))}

      {/* Trailing Sparkles */}
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`trail-${i}`}
            className="absolute"
            initial={{ 
              x: -20,
              y: Math.random() * 100 + '%',
            }}
            animate={{
              x: '120%',
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-lg md:text-xl text-yellow-300">✨</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Corner Sparkles */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute"
          style={{
            left: i % 2 === 0 ? '5%' : '95%',
            top: i < 2 ? '5%' : '95%',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <span className="text-2xl md:text-3xl text-yellow-400">🌟</span>
        </motion.div>
      ))}
    </div>
  )
}

export default Sparkles 