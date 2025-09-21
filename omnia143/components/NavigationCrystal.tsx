"use client"

import { useState } from "react"
import { Heart, Search, Settings, Users, Calendar, Info } from "lucide-react"

const crystalOptions = [
  {
    id: "about",
    name: "About Omnia",
    icon: Info,
    color: "from-blue-400 to-blue-600",
    description: "Learn about our mission and story"
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    color: "from-gray-400 to-gray-600",
    description: "Customize your experience"
  },
  {
    id: "search",
    name: "Search Content",
    icon: Search,
    color: "from-purple-400 to-purple-600",
    description: "Find stories and content"
  },
  {
    id: "social",
    name: "Social Media",
    icon: Users,
    color: "from-pink-400 to-pink-600",
    description: "Connect with our community"
  },
  {
    id: "events",
    name: "Live Events",
    icon: Calendar,
    color: "from-orange-400 to-orange-600",
    description: "Join live bedtime stories"
  },
  {
    id: "donate",
    name: "Donate",
    icon: Heart,
    color: "from-red-400 to-red-600",
    description: "Support our mission"
  }
]

export default function NavigationCrystal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCrystal, setSelectedCrystal] = useState<string | null>(null)

  const handleCrystalClick = (crystalId: string) => {
    setSelectedCrystal(crystalId)
    setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCrystal(null)
  }

  return (
    <>
      {/* Main Green Crystal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Open navigation menu"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-full shadow-inner"></div>
      </button>

      {/* Crystal Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative z-10 w-80 h-80 flex items-center justify-center">
            {/* Circular Container */}
            <div className="relative w-full h-full">
              {crystalOptions.map((crystal, index) => {
                const IconComponent = crystal.icon
                const angle = (index * 60) - 90 // Start from top, 60 degrees apart
                const radius = 120 // Distance from center
                const x = Math.cos(angle * Math.PI / 180) * radius
                const y = Math.sin(angle * Math.PI / 180) * radius
                
                return (
                  <button
                    key={crystal.id}
                    onClick={() => handleCrystalClick(crystal.id)}
                    className={`absolute w-16 h-16 ${crystal.color} rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50`}
                    style={{
                      left: `calc(50% + ${x}px - 32px)`,
                      top: `calc(50% + ${y}px - 32px)`,
                    }}
                    aria-label={crystal.name}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </button>
                )
              })}
              
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-full shadow-inner"></div>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 text-gray-400 hover:text-gray-200 text-4xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Individual Crystal Pages */}
      {selectedCrystal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            {selectedCrystal === "about" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">About Omnia</h3>
                <p className="text-gray-600">
                  Omnia is a magical storytelling platform designed for people with developmental issues. 
                  We create accessible, engaging experiences through written stories, audio adventures, 
                  and visual tales under the starlit sky.
                </p>
              </div>
            )}

            {selectedCrystal === "settings" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Settings</h3>
                <p className="text-gray-600">
                  Customize your Omnia experience. Adjust text size, audio volume, 
                  color themes, and accessibility options to make your journey perfect for you.
                </p>
              </div>
            )}

            {selectedCrystal === "search" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Search Content</h3>
                <p className="text-gray-600">
                  Find your favorite stories, audio tracks, and visual content. 
                  Search by keywords, categories, or browse our cosmic library of adventures.
                </p>
              </div>
            )}

            {selectedCrystal === "social" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Social Media</h3>
                <p className="text-gray-600">
                  Connect with our community! Share your favorite stories, 
                  join discussions, and stay updated on new content and events.
                </p>
              </div>
            )}

            {selectedCrystal === "events" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Live Events</h3>
                <p className="text-gray-600">
                  Join our live bedtime story sessions! Experience magical tales 
                  in real-time with our community. Check the ticker for upcoming events.
                </p>
              </div>
            )}

            {selectedCrystal === "donate" && (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Donate</h3>
                <p className="text-gray-600">
                  Support our mission to create accessible storytelling experiences. 
                  Your donations help us develop new content and improve our platform.
                </p>
              </div>
            )}

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
