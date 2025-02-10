'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CupidAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    // Update position based on dimensions
    const updatePosition = () => {
      setPosition({
        x: Math.random() * dimensions.width,
        y: Math.random() * (dimensions.height / 2)
      })
    }

    // Set initial position
    updatePosition()

    // Update position periodically
    const interval = setInterval(updatePosition, 5000)

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [dimensions])

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
      {dimensions.width > 0 && Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * dimensions.width,
            y: dimensions.height,
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