'use client';
import { useEffect, useState } from 'react'

export function useTimer(minDelay: number = 1000) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minDelay)

    return () => clearTimeout(timer)
  }, [minDelay])

  return isLoading
}