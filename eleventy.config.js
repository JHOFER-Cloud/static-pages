export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("./fonts/MapleMono-Regular.woff2");
  eleventyConfig.addPassthroughCopy("./assets/*");

  // Cache for playlist names to avoid repeated API calls
  const playlistCache = new Map();

  // Async shortcode to fetch Spotify playlist name
  eleventyConfig.addAsyncShortcode(
    "spotifyPlaylist",
    async function (playlistId) {
      if (playlistCache.has(playlistId)) {
        return playlistCache.get(playlistId);
      }

      try {
        const response = await fetch(
          `https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/${playlistId}`,
        );
        const data = await response.json();
        const playlistName = data.title || `Playlist ${playlistId}`;
        playlistCache.set(playlistId, playlistName);
        return playlistName;
      } catch (error) {
        console.error(`Failed to fetch playlist ${playlistId}:`, error);
        return `Playlist ${playlistId}`;
      }
    },
  );
}
