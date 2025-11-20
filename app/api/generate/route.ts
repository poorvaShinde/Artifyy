import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { generatePrompt } from "@/lib/prompt-generator";
import { generateImageWithGCP } from "@/lib/google-ai";

export async function POST(request: NextRequest) {
  try {
    console.log("tep 1: API route called");
    
    const session = await getServerSession(authOptions);
    console.log("Step 2: Session check", session ? "Authenticated" : "Not authenticated");

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { playlist, customPrompt } = await request.json();
    console.log("Step 3: Received data", { hasPlaylist: !!playlist, hasCustomPrompt: !!customPrompt });

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist is required" },
        { status: 400 }
      );
    }

    const prompt = customPrompt || generatePrompt(playlist);
    console.log("Step 4: Generated prompt", prompt.substring(0, 100) + "...");

    console.log("Step 5: Calling GCP image generation...");
    const imageDataUrl = await generateImageWithGCP(prompt);
    console.log("Step 6: GCP response received", imageDataUrl ? "Success" : "Failed");

    if (!imageDataUrl) {
      return NextResponse.json(
        { error: "Failed to generate image: No image returned" },
        { status: 500 }
      );
    }

    console.log("Step 7: Returning success response");
    return NextResponse.json({ imageUrl: imageDataUrl, prompt });

  } catch (error: any) {
    console.error("AI Image Error:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
