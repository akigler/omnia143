"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SettingsPage from "@/components/SettingsPage"
import { useAuth } from "@/contexts/AuthContext"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Settings() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null // Will redirect to home
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <SettingsPage 
      onBack={handleBack} 
      isFirstTime={false}
    />
  )
}

