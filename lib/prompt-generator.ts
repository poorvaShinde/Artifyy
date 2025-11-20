export function generatePrompt(playlist: any): string {
  const name = playlist.name;
  const description = playlist.description || "";
  
  const tracks = playlist.tracks?.items || [];
  const trackNames: string[] = [];
  const artists: string[] = [];
  
  tracks.slice(0, 10).forEach((item: any) => {
    if (item.track) {
      if (item.track.name) {
        trackNames.push(item.track.name);
      }
      if (item.track.artists?.[0]?.name) {
        artists.push(item.track.artists[0].name);
      }
    }
  });

  const uniqueArtists = [...new Set(artists)];

  const allText = `${name} ${description} ${trackNames.join(' ')} ${uniqueArtists.join(' ')}`.toLowerCase();
  
  let mood = "vibrant and energetic";
  let colorPalette = "bright, bold colors";
  let artStyle = "modern abstract";
  
  //mood detection based on song titles and artists
  if (allText.match(/chill|relax|calm|peace|ambient|lounge|soft|sleep|dream|quiet/)) {
    mood = "calm and peaceful";
    colorPalette = "soft pastels, gentle gradients, soothing blues";
    artStyle = "minimalist, serene";
  } else if (allText.match(/dark|night|noir|gothic|shadow|deep|midnight|moon|black color/)) {
    mood = "dark and mysterious";
    colorPalette = "deep black color, dark purples, moody blues";
    artStyle = "dramatic, cinematic";
  } else if (allText.match(/love|romance|heart|valentine|sweet|kiss|baby|you|together/)) {
    mood = "romantic and warm";
    colorPalette = "warm pinks, soft reds, gentle oranges";
    artStyle = "elegant, flowing";
  } else if (allText.match(/party|dance|club|rave|electronic|edm|beat|drop|bass|hype/)) {
    mood = "energetic and vibrant";
    colorPalette = "neon colors, electric blues, hot pinks";
    artStyle = "futuristic, dynamic";
  } else if (allText.match(/sad|melancholy|blues|rain|tears|alone|broken|hurt|pain/)) {
    mood = "melancholic and introspective";
    colorPalette = "muted blues, grays, subdued tones";
    artStyle = "emotional, atmospheric";
  } else if (allText.match(/rock|metal|heavy|intense|aggression|fire|scream/)) {
    mood = "powerful and intense";
    colorPalette = "bold reds, metallic tones";
    artStyle = "grungy, raw";
  } else if (allText.match(/summer|beach|tropical|sunny|vacation|island|ocean/)) {
    mood = "bright and uplifting";
    colorPalette = "sunny yellows, ocean blues, tropical greens";
    artStyle = "vibrant, playful";
  } else if (allText.match(/classical|jazz|elegant|sophisticated|piano|violin/)) {
    mood = "sophisticated and timeless";
    colorPalette = "rich golds, deep burgundies, elegant blues";
    artStyle = "refined, artistic";
  }

  const artistMention = uniqueArtists.length > 0 
    ? `featuring artists like ${uniqueArtists.slice(0, 5).join(", ")}` 
    : "";

  const trackMention = trackNames.length > 0
    ? `with songs including "${trackNames.slice(0, 3).join('", "')}"` 
    : "";

  return `Create a stunning album cover for a playlist called "${name}". 
${artistMention ? `${artistMention}. ` : ""}
${trackMention ? `${trackMention}. ` : ""}
Style: ${artStyle}, professional music cover art. 
Mood: ${mood}. 
Color palette: ${colorPalette}.
${description ? `Theme: ${description}. ` : ""}
No text or words in the image. 
High quality, suitable for Spotify playlist cover.`;
}
