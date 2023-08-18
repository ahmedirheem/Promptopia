'use client'
import Form from '@components/Form'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const UpdatePrompt = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const [prompt, setPrompt] = useState({content: '', tag: ''})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPrompt({
        content: data.content,
        tag: data.tag
      })
    }
    getPromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!promptId) return alert('Missing PromptId!')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          content: prompt.content,
          tag: prompt.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      type='Edit'
      prompt={prompt}
      setPrompt={setPrompt}
      isSubmitting={isSubmitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt
