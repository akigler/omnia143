"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
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
  const router = useRouter()

  const handleCrystalClick = (crystalId: string) => {
    if (crystalId === "settings") {
      router.push('/settings')
      setIsModalOpen(false)
    } else {
      setSelectedCrystal(crystalId)
      setIsModalOpen(false)
    }
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
        className="fixed bottom-6 right-6 z-40 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Open navigation menu"
      >
        <Image
          src="/images/emeraldGreen.png"
          alt="Emerald Green Crystal"
          width={112}
          height={112}
          className="w-[95%] h-[95%]"
        />
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
                <Image
                  src="/images/emeraldGreen.png"
                  alt="Emerald Green Crystal"
                  width={72}
                  height={72}
                  className="w-[90%] h-[90%]"
                />
              </div>
            </div>

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
                  The Omnia Foundation corp. is a Made In Vermont nonprofit organization dedicated to empowering children worldwide through mindfully curated and accessible digital content. Rooted in love, peace, compassion, and imagination, our work nurtures curiosity, socio-emotional learning, self-awareness, critical thinking and STEM exploration. We center the needs of children and families, offering free, low-stimulation experiences. All of our offerings are created to support neurodivergent and developmentally diverse communities, promoting a world where every child can access new worlds and learn from archetypes and stories that inspire unity, possibility, and personal growth.
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
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
                
                <div className="relative z-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Follow Omnia on socials</h3>
                    <p className="text-purple-200 text-lg">Connect with our community across all platforms</p>
                  </div>
                  
                  {/* Social Media Icons in a Line */}
                  <div className="flex justify-center items-center gap-6 flex-wrap">
                    {[
                      {
                        id: "tiktok",
                        name: "TikTok",
                        icon: "/socialIcons/icons8-tiktok-50.svg",
                        color: "from-pink-400 to-pink-600",
                        url: "https://www.tiktok.com/@sethcosta2?_t=ZP-903FlLHQWqd&_r=1"
                      },
                      {
                        id: "facebook",
                        name: "Facebook", 
                        icon: "/socialIcons/icons8-facebook-50.svg",
                        color: "from-blue-400 to-blue-600",
                        url: "https://www.facebook.com/share/16yGc2LChz/"
                      },
                      {
                        id: "instagram",
                        name: "Instagram",
                        icon: "/socialIcons/icons8-instagram-50.svg", 
                        color: "from-purple-400 to-purple-600",
                        url: "https://www.instagram.com/invites/contact/?igsh=182kj74rspjki&utm_content=z1ch3og"
                      },
                      {
                        id: "x",
                        name: "X",
                        icon: "/socialIcons/icons8-x-50.svg",
                        color: "from-gray-400 to-gray-600", 
                        url: "https://x.com/143_Omnia?t=9Fw4FQ_rh4mw2rJ2njMGuQ&s=09"
                      },
                      {
                        id: "youtube",
                        name: "YouTube",
                        icon: "/socialIcons/icons8-youtube-50.svg",
                        color: "from-red-400 to-red-600",
                        url: "https://youtube.com/@omnia_143?si=qNwvJwrDt2kluyPF"
                      }
                    ].map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group w-20 h-20 ${social.color} rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50`}
                        aria-label={`Follow us on ${social.name}`}
                      >
                        <img 
                          src={social.icon} 
                          alt={social.name}
                          className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                        />
                      </a>
                    ))}
                  </div>
                </div>
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
