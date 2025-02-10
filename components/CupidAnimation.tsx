'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CupidAnimation = () => {
  const [position, setPosition] = useState({ x: -100, y: 50 })

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight / 2)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Cupid */}
      <motion.div
        className="absolute"
        animate={{
          x: position.x,
          y: position.y,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      >
        <div className="text-6xl transform -rotate-45">👼</div>
      </motion.div>

      {/* Love Arrows */}
      <motion.div
        className="absolute"
        animate={{
          x: [position.x, position.x + 200],
          y: [position.y, position.y + 200],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        <div className="text-3xl transform rotate-45">🏹❤️</div>
      </motion.div>

      {/* Floating Love Effects */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            opacity: 0 
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut"
          }}
        >
          <div className="text-2xl">💝</div>
        </motion.div>
      ))}
    </div>
  )
}

export default CupidAnimation 