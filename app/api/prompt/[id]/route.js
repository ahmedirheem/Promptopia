import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) return new Response('Prompt Not Found', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  const { content, tag } = await req.json()
  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) return new Response('Prompt Not Found', { status: 404 })

    existingPrompt.content = content;
    existingPrompt.tag = tag;

    await existingPrompt.save()

    return new Response('Prompt Edited Successfully', { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)

    return new Response("Prompt deleted successfully", { status: 200 });
    
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
}