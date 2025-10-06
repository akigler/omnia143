"use client"

import { useState } from "react"
import { ArrowLeft, Check, Mail, Star, Share2, FileText, Shield, Cookie, MessageSquare, LogOut } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface SettingsPageProps {
  onBack: () => void
  isFirstTime?: boolean
  onComplete?: () => void
}

export default function SettingsPage({ onBack, isFirstTime = false, onComplete }: SettingsPageProps) {
  const { logout } = useAuth()
  const [notifications, setNotifications] = useState(false)
  const [age, setAge] = useState(18)
  const [showRateModal, setShowRateModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showCookiesModal, setShowCookiesModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  
  // Modal content states
  const [rateMessage, setRateMessage] = useState("")
  const [rateScore, setRateScore] = useState(5)
  const [contactMessage, setContactMessage] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Omnia - Magical Storytelling",
          text: "Check out Omnia, a magical storytelling platform for everyone!",
          url: window.location.origin
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Check out Omnia - a magical storytelling platform! ${window.location.origin}`
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText)
        alert("Link copied to clipboard!")
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = shareText
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        alert("Link copied to clipboard!")
      }
    }
  }

  const sendEmail = async (to: string, subject: string, body: string) => {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  const handleRateSubmit = () => {
    const subject = `App Rating - ${rateScore} stars`
    const body = `Rating: ${rateScore}/5 stars\n\nMessage: ${rateMessage}`
    sendEmail("aaron@omnia143.com", subject, body)
    setShowRateModal(false)
    setRateMessage("")
    setRateScore(5)
  }

  const handleContactSubmit = () => {
    const subject = "Contact from Omnia App"
    const body = contactMessage
    sendEmail("aaron@omnia143.com", subject, body)
    setShowContactModal(false)
    setContactMessage("")
  }

  const handleFeedbackSubmit = () => {
    const subject = "Feedback from Omnia App"
    const body = feedbackMessage
    sendEmail("aaron@omnia143.com", subject, body)
    setShowFeedbackModal(false)
    setFeedbackMessage("")
  }

  const handleComplete = () => {
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <div className="w-12"></div> {/* Spacer for centering */}
      </div>

      {/* Settings Content */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Notifications */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-6">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                <p className="text-gray-600 text-sm">Get notified about new content</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Age Appropriate Content */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-6">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">Age Appropriate Content</h3>
              <p className="text-gray-600 text-sm">Set your age for content filtering</p>
            </div>
          </div>
          <div className="px-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>0</span>
              <span className="font-semibold text-gray-800">Age: {age}</span>
              <span>143</span>
            </div>
            <input
              type="range"
              min="0"
              max="143"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Rate App */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={() => setShowRateModal(true)}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-6">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Rate App</h3>
                <p className="text-gray-600 text-sm">Share your experience with us</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Share App */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-6">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Share App</h3>
                <p className="text-gray-600 text-sm">Tell others about Omnia</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Privacy Policy */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={() => setShowPrivacyModal(true)}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-6">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Privacy Policy</h3>
                <p className="text-gray-600 text-sm">How we protect your data</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={() => setShowTermsModal(true)}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-6">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Terms and Conditions</h3>
                <p className="text-gray-600 text-sm">App usage terms</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Cookies Policy */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={() => setShowCookiesModal(true)}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-6">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Cookies Policy</h3>
                <p className="text-gray-600 text-sm">How we use cookies</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={() => setShowContactModal(true)}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-6">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
                <p className="text-gray-600 text-sm">Get in touch with us</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Feedback */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-6">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>
                <p className="text-gray-600 text-sm">Share your thoughts</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Logout */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 transition-colors text-left"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-6">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Logout</h3>
                <p className="text-gray-600 text-sm">Sign out of your account</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
        </div>

        {/* Complete Button for First Time Setup */}
        {isFirstTime && (
          <div className="pt-6">
            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Complete Setup
            </button>
          </div>
        )}
      </div>

      {/* Rate App Modal */}
      {showRateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowRateModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Rate Omnia</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRateScore(star)}
                    className={`w-8 h-8 ${star <= rateScore ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star className="w-full h-full fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
              <textarea
                value={rateMessage}
                onChange={(e) => setRateMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={3}
                placeholder="Tell us what you think..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRateSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContactModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={4}
                placeholder="How can we help you?"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleContactSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFeedbackModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Feedback</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
              <textarea
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                rows={4}
                placeholder="Share your thoughts and suggestions..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPrivacyModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 mb-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Information We Collect</h4>
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">How We Use Your Information</h4>
              <p className="text-gray-600 mb-4">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, and communicate with you.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Data Security</h4>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h4>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at 
                <a href="mailto:aaron@omnia143.com" className="text-blue-500 hover:underline"> aaron@omnia143.com</a>
              </p>
            </div>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTermsModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 mb-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Acceptance of Terms</h4>
              <p className="text-gray-600 mb-4">
                By accessing and using Omnia, you accept and agree to be bound by the terms and 
                provision of this agreement.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Use License</h4>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily download one copy of Omnia for personal, 
                non-commercial transitory viewing only.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Disclaimer</h4>
              <p className="text-gray-600 mb-4">
                The materials on Omnia are provided on an 'as is' basis. Omnia makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h4>
              <p className="text-gray-600">
                If you have any questions about these Terms and Conditions, please contact us at 
                <a href="mailto:aaron@omnia143.com" className="text-blue-500 hover:underline"> aaron@omnia143.com</a>
              </p>
            </div>
            <button
              onClick={() => setShowTermsModal(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cookies Policy Modal */}
      {showCookiesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCookiesModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Cookies Policy</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600 mb-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">What Are Cookies</h4>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your computer or mobile device 
                when you visit our website.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">How We Use Cookies</h4>
              <p className="text-gray-600 mb-4">
                We use cookies to improve your experience on our site, analyze site traffic, 
                and personalize content and advertisements.
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Types of Cookies</h4>
              <p className="text-gray-600 mb-4">
                We use both session cookies (which expire when you close your browser) and 
                persistent cookies (which stay on your device until deleted).
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Managing Cookies</h4>
              <p className="text-gray-600">
                You can control and/or delete cookies as you wish. You can delete all cookies 
                that are already on your computer and you can set most browsers to prevent them 
                from being placed.
              </p>
            </div>
            <button
              onClick={() => setShowCookiesModal(false)}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
