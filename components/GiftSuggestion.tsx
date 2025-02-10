'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type GiftSuggestion = {
  name: string
  price: string
  reason: string
  whereToBuy: string
  message: string
  imageUrl: string | null
}

type Props = {
  suggestions: GiftSuggestion[]
}

export default function GiftSuggestions({ suggestions }: Props) {
  return (
    <div className="space-y-8">
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white/90 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-6">
            {/* Image Section */}
            {suggestion.imageUrl && (
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={suggestion.imageUrl}
                  alt={suggestion.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <motion.div
                  className="absolute inset-0 bg-pink-500/10"
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {/* Content Section */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-dancing text-pink-600">{suggestion.name}</h3>
                  <span className="bg-pink-100 px-3 py-1 rounded-full text-pink-600 font-montserrat text-sm">
                    {suggestion.price}
                  </span>
                </div>

                <div className="space-y-3 text-pink-800">
                  <p className="font-montserrat">
                    <span className="font-semibold">Why it&apos;s perfect: </span>
                    {suggestion.reason}
                  </p>
                  
                  <p className="font-montserrat">
                    <span className="font-semibold">Where to buy: </span>
                    <a
                      href={suggestion.whereToBuy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 underline"
                    >
                      {suggestion.whereToBuy}
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-pink-50 rounded-lg italic">
                <p className="text-pink-700 font-dancing text-lg">
                  "{suggestion.message}"
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -right-4 -top-4 text-pink-200 text-6xl opacity-20 group-hover:opacity-30 transition-opacity"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            💝
          </motion.div>

          {/* Sparkle animations */}
          <motion.div
            className="absolute bottom-2 right-2 text-yellow-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
} 