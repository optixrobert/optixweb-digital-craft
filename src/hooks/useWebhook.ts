import { useState } from 'react'

export const useWebhook = () => {
  const [isLoading, setIsLoading] = useState(false)

  const sendLeadToCRM = async (leadData: {
    name?: string
    email: string
    company?: string
    phone?: string
    message?: string
    source?: string
  }) => {
    setIsLoading(true)
    
    try {
      const response = await fetch(
        'https://eeyjlisvtmooizkmxgbq.supabase.co/functions/v1/sync-leads',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...leadData,
            source: leadData.source || 'optixweb.space',
            created_at: new Date().toISOString()
          }),
        }
      )

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Errore durante la sincronizzazione')
      }

      console.log('Lead sincronizzato con CRM:', result)
      return result
      
    } catch (error) {
      console.error('Errore webhook CRM:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { sendLeadToCRM, isLoading }
}