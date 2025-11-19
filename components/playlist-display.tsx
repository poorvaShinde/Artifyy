import { Card } from "@/components/ui/card";
import Image from "next/image";

interface PlaylistDisplayProps {
  playlist: any;
}

export default function PlaylistDisplay({ playlist }: PlaylistDisplayProps) {
  return (
    <Card className="p-6">
      <div className="flex gap-4">
        {playlist.images?.[0] && (
          <Image
            src={playlist.images[0].url}
            alt={playlist.name}
            width={160}
            height={160}
            className="rounded-md"
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{playlist.name}</h2>
          <p className="text-muted-foreground mt-1">
            by {playlist.owner.display_name}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {playlist.tracks.total} tracks
          </p>
          {playlist.description && (
            <p className="text-sm mt-4">{playlist.description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
