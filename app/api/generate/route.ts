import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { generatePrompt } from "@/lib/prompt-generator";
import { generateImageWithGCP } from "@/lib/google-ai";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { playlist } = await request.json();

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist is required" },
        { status: 400 }
      );
    }

    const prompt = generatePrompt(playlist);

    // Generate image with Google Cloud Vertex AI
    const imageDataUrl = await generateImageWithGCP(prompt);

    if (!imageDataUrl) {
      return NextResponse.json(
        { error: "Failed to generate image: No image returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl: imageDataUrl, prompt });

  } catch (error: any) {
    console.error("AI Image Error:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
