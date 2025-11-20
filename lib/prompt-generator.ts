export function generatePrompt(playlist: any): string {
  const name = playlist.name;
  const description = playlist.description || "";
  
//mood detection
  const text = `${name} ${description}`.toLowerCase();
  
  let mood = "vibrant and energetic";
  if (text.includes("chill") || text.includes("relax")) {
    mood = "calm and peaceful";
  } else if (text.includes("dark") || text.includes("night")) {
    mood = "dark and mysterious";
  } else if (text.includes("love") || text.includes("romance")) {
    mood = "romantic and warm";
  }

  return `Create a stunning album cover for a playlist called "${name}". 
Style: modern, abstract, professional music cover art. 
Mood: ${mood}. 
No text or words in the image. 
High quality, suitable for Spotify playlist cover.`;
}
