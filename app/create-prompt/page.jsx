'use client' 

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form'

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [prompt, setPrompt] = useState({ content: '', tag: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          content: prompt.content,
          userId: session?.user.id,
          tag: prompt.tag,
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
      type='Create'
      prompt={prompt}
      setPrompt={setPrompt}
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreatePrompt
