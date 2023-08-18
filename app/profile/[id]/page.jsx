'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const UserProfile = ({ params }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const searchParams = useSearchParams();
  const userName = searchParams.get('name')

  const [userPrompts, setUserPrompts] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch(`/api/users/${params.id}/prompts`)
    const data = await response.json();

    setUserPrompts(data);

  };

  useEffect(() => {
    if (params?.id) fetchPrompts();
  }, []);

  const handleEdit = (prompt) => {

    router.push(`/update-prompt?id=${prompt._id}`)
  }

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    )

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id}`, {
          method: 'DELETE'
        })

        const filteredPrompts = userPrompts.filter(p => p._id !== prompt._id)

        setUserPrompts(filteredPrompts)
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
    {
      session?.user.id === params.id ? (
        <Profile
          name='My'
          prompts={userPrompts}
          desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <Profile
          name={userName}
          prompts={userPrompts}
          desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        />
      )
    }
    </>
  )
}

export default UserProfile
