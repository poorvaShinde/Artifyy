"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PlaylistInput from "@/components/playlist-input";
import PlaylistDisplay from "@/components/playlist-display";
import CoverGenerator from "@/components/cover-generator";




export default function Home() {
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState<any>(null);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Spotify Playlist Cover Generator
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create stunning AI-powered covers for your playlists
            </p>
          </div>

          <Card className="p-8">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Sign in with Spotify to get started
              </p>
              <Button onClick={() => signIn("spotify")} size="lg" className="w-full">
                Sign in with Spotify
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Playlist Cover Generator</h1>
          <Button onClick={() => signOut()} variant="outline">
            Sign out
          </Button>
        </div>

        <PlaylistInput onPlaylistLoaded={setPlaylist} />
        {playlist && (
          <>
            <PlaylistDisplay playlist={playlist} />
            <CoverGenerator playlist={playlist} />
          </>
)}

        {playlist && <PlaylistDisplay playlist={playlist} />}
      </div>
    </div>
  );
}
