"use client"

import { useState, useEffect, useRef } from "react"
import { ScrollText, Eye, Headphones, Play, Pause, SkipBack, SkipForward } from "lucide-react"
import NavigationCrystal from "@/components/NavigationCrystal"

interface PlanetData {
  id: string
  name: string
  color: string
  position: { top: string; left: string }
  size: string
  description: string
}

const planets: PlanetData[] = [
  {
    id: "stories",
    name: "Story Realm",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    position: { top: "20%", left: "15%" },
    size: "w-24 h-24 md:w-32 md:h-32",
    description: "Immerse yourself in captivating written stories",
  },
  {
    id: "audio",
    name: "Audio Galaxy",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    position: { top: "40%", left: "70%" },
    size: "w-28 h-28 md:w-36 md:h-36",
    description: "Listen to enchanting audio stories and podcasts",
  },
  {
    id: "visual",
    name: "Visual Cosmos",
    color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    position: { top: "65%", left: "25%" },
    size: "w-20 h-20 md:w-28 md:h-28",
    description: "Watch mesmerizing video stories come to life",
  },
]

const contentTypes = [
  {
    icon: ScrollText,
    label: "Read",
    color: "bg-purple-500",
    description: "Written Stories",
  },
  {
    icon: Eye,
    label: "Watch",
    color: "bg-emerald-500",
    description: "Video Content",
  },
  {
    icon: Headphones,
    label: "Listen",
    color: "bg-blue-500",
    description: "Audio & Podcasts",
  },
]

// Placeholder data
const placeholderStories = [
  {
    id: 1,
    title: "The Enchanted Forest",
    content: `Once upon a time, in a land far beyond the stars, there lived a brave little rabbit named Luna. She had the softest white fur that shimmered like moonlight and eyes that sparkled with curiosity.

Every morning, Luna would hop through the enchanted forest near her burrow, greeting the ancient oak trees and listening to the whispers of the wind. The forest was filled with magical creatures - talking flowers that sang lullabies, wise old owls who told stories of distant lands, and friendly squirrels who shared their acorn treasures.

One day, as Luna was exploring deeper into the forest than ever before, she discovered a hidden clearing where a magnificent crystal castle stood. The castle was made entirely of rainbow-colored crystals that refracted the sunlight into beautiful patterns on the forest floor.

Luna's heart raced with excitement as she approached the castle. She had heard stories of this place from the wise owls, but never thought she would see it with her own eyes. The castle seemed to call to her, its crystal walls humming with ancient magic.

As she stepped closer, the castle doors slowly opened, revealing a warm golden light from within. A gentle voice echoed through the clearing: "Welcome, brave little one. You have found the Castle of Dreams, where all wishes come true."

Luna's eyes widened with wonder. She had always dreamed of having the courage to explore the world beyond her forest home. Now, standing before this magical castle, she realized that her greatest adventure was just beginning.

The crystal castle shimmered and glowed, promising endless possibilities and magical adventures that would change Luna's life forever.`,
  },
  {
    id: 2,
    title: "The Star Catcher",
    content: `In a village where the sky touched the earth, there lived a young girl named Stella who had the most important job in the world - she was the Star Catcher.

Every evening, as the sun dipped below the horizon, Stella would climb to the highest tower in her village and wait for the stars to fall from the sky. She carried a special net woven from moonbeams and stardust, designed to catch the falling stars before they could disappear into the darkness.

The stars were not just beautiful lights in the sky - they were the dreams and hopes of people all around the world. When a star fell, it meant someone's dream was in danger of being lost forever. Stella's job was to catch these falling stars and return them to the sky, ensuring that dreams would never die.

One particularly magical night, Stella noticed something extraordinary. Instead of the usual one or two falling stars, hundreds of them were cascading down like a brilliant waterfall of light. Each star glowed with a different color - some were golden like sunshine, others were silver like moonlight, and some were the most beautiful shades of pink, blue, and green.

Stella worked tirelessly through the night, catching star after star with her moonbeam net. As she caught each one, she could hear the whisper of the dream it carried - a child's wish for a new friend, a grandmother's hope for her family's happiness, a young artist's dream of creating something beautiful.

By the time dawn broke, Stella had caught every single falling star and carefully placed them back in the sky where they belonged. The village awoke to the most spectacular sunrise they had ever seen, with the sky painted in colors more vibrant than any rainbow.

Stella smiled as she watched the stars twinkle happily in their places, knowing that she had helped preserve countless dreams and hopes for people she would never meet. Her work as the Star Catcher was not just a job - it was a calling that brought light and magic to the world.`,
  },
]

const placeholderAudio = [
  {
    id: 1,
    title: "Ocean Waves",
    description: "Gentle ocean waves for relaxation",
    duration: "10:00",
    cover: "🌊",
  },
  {
    id: 2,
    title: "Forest Birds",
    description: "Morning birdsong in the enchanted forest",
    duration: "8:30",
    cover: "🐦",
  },
  {
    id: 3,
    title: "Rain Sounds",
    description: "Peaceful rain on leaves",
    duration: "12:15",
    cover: "🌧️",
  },
]

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: "50%", left: "50%" })
  const [activeModal, setActiveModal] = useState<'content' | 'audio' | 'scroll' | null>(null)
  const [currentStory, setCurrentStory] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(0)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet)
    const topPercent = Number.parseFloat(planet.position.top)
    const leftPercent = Number.parseFloat(planet.position.left)

    // Adjust modal position to appear near the planet but not overlap
    let modalTop = topPercent
    let modalLeft = leftPercent

    // Adjust positioning to keep modal on screen
    if (leftPercent > 60) {
      modalLeft = leftPercent - 25 // Move left if planet is on right side
    } else {
      modalLeft = leftPercent + 15 // Move right if planet is on left side
    }

    if (topPercent < 30) {
      modalTop = topPercent + 15 // Move down if planet is near top
    } else if (topPercent > 60) {
      modalTop = topPercent - 20 // Move up if planet is near bottom
    }

    setModalPosition({ top: `${modalTop}%`, left: `${modalLeft}%` })
    setIsModalOpen(true)
    setActiveModal('content')
  }

  const handleContentTypeClick = (type: string) => {
    if (type === 'Read') {
      setActiveModal('scroll')
    } else if (type === 'Listen') {
      setActiveModal('audio')
    } else if (type === 'Watch') {
      // Future implementation for video content
      console.log('Video content coming soon!')
    }
  }

  const generateStars = () => {
    const stars = []
    for (let i = 0; i < 100; i++) {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }
      stars.push(<div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" style={style} />)
    }
    return stars
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setActiveModal(null)
    setSelectedPlanet(null)
  }

  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.error('Audio playback error:', error)
      }
    }
  }

  // Handle audio events
  useEffect(() => {
    if (activeModal !== 'audio') return

    const audio = audioRef.current
    if (!audio) {
      console.log('No audio element found')
      return
    }

    console.log('Setting up audio events for:', audio.src)

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setAudioCurrentTime(audio.currentTime)
        setAudioProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded, duration:', audio.duration)
      setAudioDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setAudioProgress(0)
      setAudioCurrentTime(0)
    }

    const handleError = (e: Event) => {
      console.error('Audio error:', e)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [activeModal])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0">{generateStars()}</div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 text-balance">Omnia</h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
          Journey through enchanted realms of stories, audio adventures, and visual tales under the starlit sky
        </p>
      </header>

      {/* Interactive Planets */}
      <main className="relative z-10 flex-1 flex items-center justify-center min-h-[60vh]">
        {planets.map((planet) => (
          <button
            key={planet.id}
            onClick={() => handlePlanetClick(planet)}
            className={`absolute ${planet.size} ${planet.color} rounded-full animate-float cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50`}
            style={planet.position}
            aria-label={`Open ${planet.name}`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          </button>
        ))}

        {/* Planet Labels */}
        {planets.map((planet) => (
          <div
            key={`${planet.id}-label`}
            className="absolute text-white text-sm md:text-base font-medium pointer-events-none"
            style={{
              top: `calc(${planet.position.top} + 100px)`,
              left: planet.position.left,
              transform: "translateX(-50%)",
            }}
          >
            {planet.name}
          </div>
        ))}
      </main>

      {/* Content Type Modal */}
      {isModalOpen && activeModal === 'content' && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/0" onClick={closeModal} />
          <div
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: modalPosition.top, left: modalPosition.left }}
          >
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-white">{selectedPlanet?.name}</h2>
            </div>

            <div className="flex justify-center items-center gap-8">
              {contentTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.label}
                    className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-lg`}
                    onClick={() => handleContentTypeClick(type.label)}
                    aria-label={`${type.label} - ${type.description}`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </button>
                )
              })}
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

      {/* Audio Modal */}
      {activeModal === 'audio' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
          
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
            
            <div className="text-center">
              {/* Background Image */}
              <div className="relative w-64 h-64 mx-auto rounded-lg shadow-lg mb-6 overflow-hidden">
                <img
                  src="/images/ghostrunner.jpg"
                  alt="Audio Background"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">Audio Story</h3>
              <p className="text-gray-600 mb-6">Immerse yourself in this enchanting audio experience</p>

              {/* Audio Player */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
                
                {/* Time Display */}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{Math.floor(audioCurrentTime / 60)}:{('0' + Math.floor(audioCurrentTime % 60)).slice(-2)}</span>
                  <span>{Math.floor(audioDuration / 60)}:{('0' + Math.floor(audioDuration % 60)).slice(-2)}</span>
                </div>

                {/* Play/Pause Button */}
                <div className="flex justify-center">
                  <button 
                    onClick={togglePlayPause} 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-6 shadow-lg hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12" />}
                  </button>
                </div>
              </div>

              {/* Hidden Audio Element */}
              <audio
                ref={audioRef}
                src="/audio/Ghostrunner Daniel Deluxe The orb  Soundtrack.mp3"
                preload="metadata"
              />
            </div>
          </div>
        </div>
      )}

      {/* Scroll Modal */}
      {activeModal === 'scroll' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
          
          <div className="relative z-10 max-w-2xl w-full mx-4 max-h-[80vh]">
            {/* Scroll Container with Rolled Edges */}
            <div className="scroll-container">
              {/* Top Golden Ornament with Blue Gem */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="relative">
                  {/* Golden Frame */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full"></div>
                  </div>
                  {/* Wing Extensions */}
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-l-full"></div>
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-gradient-to-l from-amber-500 to-amber-600 rounded-r-full"></div>
                  {/* Crown */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-amber-500"></div>
                </div>
              </div>

              {/* Main Parchment Area */}
              <div className="parchment-scroll p-8 pt-20 pb-20 max-h-[60vh] overflow-y-auto">
                {/* Story Content - Directly show the story */}
                <div className="space-y-6">
                  {/* Story Title */}
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-amber-800 mb-2">
                      {placeholderStories[currentStory]?.title}
                    </h4>
                  </div>
                  
                  {/* Story Text */}
                  <div style={{
                    color: '#92400e',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'normal',
                    textAlign: 'justify',
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'unset',
                    textRendering: 'auto',
                    textShadow: 'none',
                    fontSmooth: 'never'
                  }}>
                    {placeholderStories[currentStory]?.content.split('\n').map((paragraph, index) => (
                      <p key={index} style={{
                        marginBottom: '16px',
                        marginTop: '0',
                        padding: '0',
                        textAlign: 'justify',
                        WebkitFontSmoothing: 'none',
                        MozOsxFontSmoothing: 'unset',
                        textRendering: 'auto',
                        textShadow: 'none',
                        fontSmooth: 'never'
                      }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Golden Ornament with Pink Gem */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="relative">
                  {/* Golden Frame */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full"></div>
                  </div>
                  {/* Wing Extensions */}
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-l-full"></div>
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-gradient-to-l from-amber-500 to-amber-600 rounded-r-full"></div>
                  {/* Finial */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-amber-500"></div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-amber-600 hover:text-amber-800 text-3xl font-bold bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Navigation Crystal */}
      <NavigationCrystal />
    </div>
  )
}
