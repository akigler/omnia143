"use client"

import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Omnia</h2>
        <p className="text-blue-100">Loading your enchanted journey...</p>
      </div>
    </div>
  )
}
