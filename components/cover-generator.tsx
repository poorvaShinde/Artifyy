"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface CoverGeneratorProps {
  playlist: any;
}

export default function CoverGenerator({ playlist }: CoverGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const downloadCover = async () => {
    if (!imageUrl) return;

    try {
      //data urls directly without API call
      if (imageUrl.startsWith("data:image")) {
        // Data URL - download directly
        const a = document.createElement("a");
        a.href = imageUrl;
        a.download = `${playlist.name}_cover.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        //regular URL-API route
        const response = await fetch("/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl,
            playlistName: playlist.name,
          }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${playlist.name}_cover.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError("Download failed");
    }
  };

  const generateCover = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlist }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setImageUrl(data.imageUrl);
      setPrompt(data.prompt); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Generate AI Cover</h3>

        {!imageUrl ? (
          <Button
            onClick={generateCover}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? "Generating..." : "Generate Cover"}
          </Button>
        ) : (
          <>
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <Image
                src={imageUrl}
                alt="Generated cover"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            {}
            {prompt && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">
                  AI Prompt Used:
                </h4>
                <p className="text-sm p-3 bg-secondary rounded-md text-muted-foreground">
                  {prompt}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={downloadCover}
                className="flex-1"
                size="lg"
              >
                Download
              </Button>
              <Button
                onClick={generateCover}
                disabled={loading}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Regenerate
              </Button>
            </div>
          </>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </Card>
  );
}
