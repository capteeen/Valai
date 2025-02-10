'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import FloatingElements from '@/components/FloatingElements'
import CupidAnimation from '@/components/CupidAnimation'
import Sparkles from '@/components/Sparkles'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 relative overflow-hidden">
      {/* Background Animations */}
      <FloatingElements />
      <CupidAnimation />
      <Sparkles />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-20 -bottom-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Cupid Image */}
          <motion.div
            className="relative w-64 h-64 mx-auto mb-8"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/IMG_1429.PNG"
              alt="Cute Cupid with Gift"
              fill
              className="object-contain"
              priority
            />
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span className="text-3xl">✨</span>
            </motion.div>
          </motion.div>

          {/* Love Icon Header */}
          <motion.div
            className="flex justify-center mb-4 space-x-4 relative"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="absolute -top-6 -left-6 text-2xl"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.span>
            <span className="text-4xl">💘</span>
            <span className="text-4xl">💝</span>
            <span className="text-4xl">💖</span>
            <motion.span
              className="absolute -top-6 -right-6 text-2xl"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </motion.div>

          <div className="relative">
            <h1 className="mb-6 text-5xl md:text-6xl font-dancing text-pink-600">
              Find the Perfect Valentine&apos;s Gift
            </h1>
            <motion.span
              className="absolute -top-4 right-0 text-2xl"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </div>
          
          <p className="mb-8 text-lg md:text-xl text-pink-800 font-montserrat">
            Let our AI-powered assistant help you discover thoughtful and personalized gift ideas
            for your special someone based on their interests and preferences.
          </p>

          <div className="mb-12">
            <Link href="/gift-finder">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-white transition-colors rounded-full bg-pink-500 hover:bg-pink-600 font-montserrat shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Find the Perfect Gift</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>
            </Link>
          </div>

          {/* Buy Token Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16 text-center"
          >
            <a
              href="#" // Add your token purchase link here
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-xl font-bold text-white transition-colors rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 font-montserrat shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Buy $VALAI Token
                  <motion.span
                    className="ml-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    💎
                  </motion.span>
                </span>
              </motion.button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
          >
            <h2 className="text-3xl font-dancing text-pink-600 mb-6">Join Our Community</h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://x.com/valaisolana"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full text-white font-montserrat"
                >
                  <span className="text-xl">𝕏</span>
                  <span>Twitter</span>
                </motion.div>
              </a>
              <a
                href="https://t.me/ValAisolana"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full text-white font-montserrat"
                >
                  <span className="text-xl">📱</span>
                  <span>Telegram</span>
                </motion.div>
              </a>
            </div>
          </motion.div>

          {/* Token Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
          >
            <h2 className="text-3xl font-dancing text-pink-600 mb-4">$VALAI Token</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Token Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-pink-800">
                  <li>Access to premium gift suggestions</li>
                  <li>Exclusive discounts on recommended products</li>
                  <li>Priority AI processing for faster results</li>
                  <li>Stake tokens for passive rewards</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Token Utility</h3>
                <ul className="list-disc list-inside space-y-2 text-pink-800">
                  <li>Pay for gift recommendations using $VALAI</li>
                  <li>Earn rewards for successful gift matches</li>
                  <li>Participate in governance decisions</li>
                  <li>Access to VIP features and early updates</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How to Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
          >
            <h2 className="text-3xl font-dancing text-pink-600 mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl mb-3">1️⃣</div>
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Enter Details</h3>
                <p className="text-pink-800">Share your partner&apos;s interests, hobbies, and preferences</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">2️⃣</div>
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">AI Magic</h3>
                <p className="text-pink-800">Our AI analyzes the information to find perfect gift matches</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-3">3️⃣</div>
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Get Suggestions</h3>
                <p className="text-pink-800">Receive personalized gift ideas with purchase links</p>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
          >
            <h2 className="text-3xl font-dancing text-pink-600 mb-4">Amazing Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">AI-Powered Suggestions</h3>
                <p className="text-pink-800">Advanced AI algorithms for perfect gift matching</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Price Range Options</h3>
                <p className="text-pink-800">Find gifts that match your budget perfectly</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Purchase Links</h3>
                <p className="text-pink-800">Direct links to trusted online retailers</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Gift History</h3>
                <p className="text-pink-800">Track previous suggestions and successful gifts</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Smart Reminders</h3>
                <p className="text-pink-800">Never miss important occasions</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-montserrat font-semibold text-pink-700 mb-2">Preference Learning</h3>
                <p className="text-pink-800">AI learns and improves with each use</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
