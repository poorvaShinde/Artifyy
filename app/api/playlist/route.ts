import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { extractPlaylistId, fetchPlaylist } from "@/lib/spotify";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { input } = await request.json();

    const playlistId = extractPlaylistId(input);
    if (!playlistId) {
      return NextResponse.json(
        { error: "Invalid playlist URL or ID" },
        { status: 400 }
      );
    }
    const playlist = await fetchPlaylist(
      playlistId,
      session.accessToken
    );

    return NextResponse.json({ playlist });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch playlist" },
      { status: 500 }
    );
  }
}
