'use client'

import { useParams } from 'next/navigation'
import { api } from '@/store/useCampersStore'
import { useEffect, useState } from 'react'
import { PageCamper } from '@/components/PageCamper/PageCamper'
import { Camper } from '@/types'

export default function CamperDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [camper, setCamper] = useState<Camper | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        const res = await api.get(`/campers/${id}`)
        setCamper(res.data)
      } catch (error) {
        console.error(error)
        setCamper(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCamper()
  }, [id])

  if (isLoading) return <p>Loading...</p>
  if (!camper) return <p>Camper not found</p>

  return <PageCamper camper={camper} />
}
