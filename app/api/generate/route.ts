import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import OpenAI from "openai";
import { generatePrompt } from "@/lib/prompt-generator";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Check session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Parse request body
    const { playlist } = await request.json();

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist is required" },
        { status: 400 }
      );
    }

    // Generate AI prompt
    const prompt = generatePrompt(playlist);

    // Generate image
    const response = await openai.images.generate({
      model: "gpt-image-1",   // DALL·E 3 replaced by gpt-image-1
      prompt: prompt,
      size: "1024x1024",
      n: 1,
    });

    const imageUrl = response?.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to generate image: Missing URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl, prompt });

  } catch (error: any) {
    console.error("AI Image Error:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
