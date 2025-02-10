'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FloatingElements from '@/components/FloatingElements'
import Sparkles from '@/components/Sparkles'
import GiftSuggestions from '@/components/GiftSuggestion'

type FormData = {
  partnerName: string
  ageRange: string
  hobbies: string[]
  interests: string
  favoriteColors: string[]
  priceRange: string
  occasion: string
  allergies: string
  currentHobby: string
}

type GiftSuggestion = {
  name: string
  price: string
  reason: string
  whereToBuy: string
  message: string
  imagePrompt: string
  imageUrl: string | null
}

export default function GiftFinder() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([])
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    partnerName: '',
    ageRange: '',
    hobbies: [],
    interests: '',
    favoriteColors: [],
    priceRange: '',
    occasion: '',
    allergies: '',
    currentHobby: ''
  })

  const handleAddHobby = () => {
    if (formData.currentHobby.trim()) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, prev.currentHobby.trim()],
        currentHobby: ''
      }))
    }
  }

  const handleRemoveHobby = (index: number) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index)
    }))
  }

  const handleNext = () => {
    if (step === 1) {
      const validationError = validateForm()
      if (validationError) {
        setError(validationError)
        return
      }
      setStep(2)
    } else if (step === 2) {
      handleSubmit()
    }
  }

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const validateForm = () => {
    if (step === 1) {
      if (!formData.partnerName) return 'Please enter your partner\'s name'
      if (!formData.ageRange) return 'Please select an age range'
      if (formData.hobbies.length === 0) return 'Please add at least one hobby'
    } else if (step === 2) {
      if (!formData.priceRange) return 'Please select a price range'
      if (!formData.occasion) return 'Please select an occasion'
    }
    return ''
  }

  const handleSubmit = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError('')
    setStep(3)

    try {
      const response = await fetch('/api/generate-gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate suggestions')
      }

      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (err) {
      setError('Failed to generate gift suggestions. Please try again.')
      console.error('Error:', err)
      setStep(2)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 relative overflow-hidden">
      <FloatingElements />
      <Sparkles />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between mb-2">
            {['Partner Details', 'Preferences', 'Gift Suggestions'].map((label, index) => (
              <motion.div
                key={label}
                className={`text-sm md:text-base font-montserrat ${
                  step > index + 1 ? 'text-pink-600' : step === index + 1 ? 'text-pink-700' : 'text-pink-400'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {label}
              </motion.div>
            ))}
          </div>
          <div className="h-2 bg-pink-200 rounded-full">
            <motion.div
              className="h-full bg-pink-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-4 p-4 bg-red-100 text-red-600 rounded-lg text-center font-montserrat"
          >
            {error}
          </motion.div>
        )}

        {/* Form Container */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-3xl font-dancing text-pink-600 mb-6">Tell Us About Your Partner</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-pink-700 font-montserrat mb-2">Partner&apos;s Name</label>
                    <input
                      type="text"
                      value={formData.partnerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, partnerName: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors"
                      placeholder="Enter their name"
                    />
                  </div>
                  <div>
                    <label className="block text-pink-700 font-montserrat mb-2">Age Range</label>
                    <select
                      value={formData.ageRange}
                      onChange={(e) => setFormData(prev => ({ ...prev, ageRange: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors"
                    >
                      <option value="">Select age range</option>
                      <option value="18-24">18-24</option>
                      <option value="25-34">25-34</option>
                      <option value="35-44">35-44</option>
                      <option value="45-54">45-54</option>
                      <option value="55+">55+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-pink-700 font-montserrat mb-2">Hobbies</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={formData.currentHobby}
                        onChange={(e) => setFormData(prev => ({ ...prev, currentHobby: e.target.value }))}
                        className="flex-1 px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors"
                        placeholder="Add a hobby"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddHobby()}
                      />
                      <button
                        onClick={handleAddHobby}
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.hobbies.map((hobby, index) => (
                        <div
                          key={index}
                          className="bg-pink-100 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <span>{hobby}</span>
                          <button
                            onClick={() => handleRemoveHobby(index)}
                            className="text-pink-600 hover:text-pink-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-3xl font-dancing text-pink-600 mb-6">Preferences & Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-pink-700 font-montserrat mb-2">Price Range</label>
                    <select
                      value={formData.priceRange}
                      onChange={(e) => setFormData(prev => ({ ...prev, priceRange: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors"
                    >
                      <option value="">Select price range</option>
                      <option value="0-50">$0 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-200">$100 - $200</option>
                      <option value="200+">$200+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-pink-700 font-montserrat mb-2">Occasion</label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors"
                    >
                      <option value="">Select occasion</option>
                      <option value="valentine">Valentine&apos;s Day</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="christmas">Christmas</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-pink-700 font-montserrat mb-2">Additional Interests</label>
                    <textarea
                      value={formData.interests}
                      onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors"
                      rows={4}
                      placeholder="Tell us more about their interests..."
                    />
                  </div>
                  <div>
                    <label className="block text-pink-700 font-montserrat mb-2">Allergies or Dislikes</label>
                    <input
                      type="text"
                      value={formData.allergies}
                      onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors"
                      placeholder="Any allergies or things to avoid?"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <h2 className="text-3xl font-dancing text-pink-600 mb-6">
                  {isLoading ? 'Creating Your Perfect Gift Suggestions' : 'Perfect Gift Suggestions'}
                </h2>
                {isLoading ? (
                  <div className="space-y-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-4xl mx-auto"
                    >
                      💝
                    </motion.div>
                    <div className="max-w-md mx-auto space-y-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 8 }}
                        className="h-2 bg-pink-500 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-pink-800 font-montserrat"
                      >
                        <div className="space-y-2">
                          <p>🎯 Analyzing preferences...</p>
                          <p>✨ Crafting personalized suggestions...</p>
                          <p>🎨 Generating beautiful gift images...</p>
                          <p>💌 Adding romantic messages...</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <GiftSuggestions suggestions={suggestions} />
                )}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 && !isLoading && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors font-montserrat"
                >
                  Back
                </motion.button>
              )}
              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors font-montserrat ml-auto"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Next'}
                </motion.button>
              ) : (
                !isLoading && (
                  <Link href="/" className="ml-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors font-montserrat"
                    >
                      Start Over
                    </motion.button>
                  </Link>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 