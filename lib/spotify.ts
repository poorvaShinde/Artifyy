export interface PlaylistData {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  tracks: {
    total: number;
  };
  owner: {
    display_name: string;
  };
}

export function extractPlaylistId(input: string): string | null {
  
  const urlMatch = input.match(/playlist\/([a-zA-Z0-9]+)(\?.*)?/);
  if (urlMatch) return urlMatch[1];

  if (/^[a-zA-Z0-9]{22}$/.test(input.trim())) {
    return input.trim();
  }

  return null;
}

export async function fetchPlaylist(
  playlistId: string,
  accessToken: string
): Promise<PlaylistData> {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status}`);
  }

  return response.json();
}
