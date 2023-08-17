import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";

export const POST = async (request) => {
  const { userId, content, tag } = await request.json()

  try {
    await connectToDB()

    const newPrompt = await new Prompt({ creator: userId, content, tag })
    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response('Failed to create prompt', { status: 500 })
  }
}