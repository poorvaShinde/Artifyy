"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PlaylistInput from "@/components/playlist-input";
import PlaylistDisplay from "@/components/playlist-display";
import CoverGenerator from "@/components/cover-generator";
import Plasma from "@/components/plasma";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandSpotify,
  IconHome,
  IconMusic,
  IconSparkles,
} from "@tabler/icons-react";

export default function Home() {
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState<any>(null);
  const [demoMode, setDemoMode] = useState(false); 

  const dockLinks = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-400" />, href: "/" },
    { title: "Spotify", icon: <IconBrandSpotify className="h-full w-full text-neutral-400" />, href: "https://spotify.com" },
    { title: "Features", icon: <IconSparkles className="h-full w-full text-neutral-400" />, href: "#" },
    { title: "Music", icon: <IconMusic className="h-full w-full text-neutral-400" />, href: "#" },
    { title: "GitHub", icon: <IconBrandGithub className="h-full w-full text-neutral-400" />, href: "https://github.com" },
  ];

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-black">
        <FloatingDock items={dockLinks} />
        <div className="absolute inset-0 w-full h-full">
          <Plasma 
            color="#4f46e5" 
            speed={0.4}
            direction="forward"
            scale={1.2}
            opacity={0.4}
            mouseInteractive={true}
          />
        </div>
        <p className="text-lg relative z-10 text-white">Loading...</p>
      </div>
    );
  }

  if (!session && !demoMode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden bg-black">
        <FloatingDock items={dockLinks} />
        <div className="absolute inset-0 w-full h-full">
          <Plasma 
            color="#4f46e5" 
            speed={0.4}
            direction="forward"
            scale={1.2}
            opacity={0.5}
            mouseInteractive={true}
          />
        </div>

        <div className="max-w-2xl w-full space-y-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Spotify Playlist Cover Generator
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Create stunning AI-powered covers for your playlists
            </p>
          </div>

          <Card className="p-8 bg-gray-900/90 backdrop-blur-md border-gray-800">
            <div className="text-center space-y-4">
              <p className="text-gray-400">
                Sign in with Spotify to get started
              </p>
              <Button 
                onClick={() => signIn("spotify", { callbackUrl: "/", redirect: true })} 
                size="lg" 
                className="w-full"
              >
                Sign in with Spotify
              </Button>

             
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-500">Or</span>
                </div>
              </div>

              <Button 
                onClick={() => setDemoMode(true)} 
                size="lg" 
                variant="outline"
                className="w-full border-gray-700 text-gray-300"
              >
                Continue with Demo Mode
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Demo mode uses a sample playlist. Sign in for full access.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 relative overflow-hidden bg-black">
      <FloatingDock items={dockLinks} />
      <div className="absolute inset-0 w-full h-full">
        <Plasma 
          color="#4f46e5" 
          speed={0.5}
          direction="forward"
          scale={1.2}
          opacity={0.6}
          mouseInteractive={true}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 pt-20">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            Playlist Cover Generator {demoMode && <span className="text-sm text-gray-500">(Demo Mode)</span>}
          </h1>
          {session && (
            <Button onClick={() => signOut()} variant="outline" className="border-gray-700 text-gray-300">
              Sign out
            </Button>
          )}
          {demoMode && (
            <Button onClick={() => signIn("spotify")} variant="outline" className="border-gray-700 text-gray-300">
              Sign in with Spotify
            </Button>
          )}
        </div>

        <PlaylistInput onPlaylistLoaded={setPlaylist} />
        
        {playlist && (
          <>
            <PlaylistDisplay playlist={playlist} />
            <CoverGenerator playlist={playlist} />
          </>
        )}
      </div>
    </div>
  );
}
