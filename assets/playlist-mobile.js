// Mobile playlist functionality - just open Spotify links
document.addEventListener("DOMContentLoaded", () => {
  // Better mobile detection - check for touch support
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Only apply mobile behavior on actual touch devices
  if (isTouchDevice) {
    const playlistItems = document.querySelectorAll(".playlist-item");

    playlistItems.forEach((item) => {
      const iframe = item.querySelector("iframe");
      const playlistName = item.querySelector(".playlist-name");

      if (iframe && playlistName) {
        // Extract playlist ID from iframe src
        const iframeSrc = iframe.getAttribute("src");
        const playlistIdMatch = iframeSrc.match(/playlist\/([a-zA-Z0-9]+)/);

        if (playlistIdMatch) {
          const playlistId = playlistIdMatch[1];
          const spotifyUrl = `https://open.spotify.com/playlist/${playlistId}`;

          // Convert the span to a link
          const link = document.createElement("a");
          link.href = spotifyUrl;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.className = "playlist-name";
          link.innerHTML = playlistName.innerHTML;

          playlistName.parentNode.replaceChild(link, playlistName);

          // Disable hover effect on mobile by hiding iframe
          iframe.style.display = "none";
        }
      }
    });
  }
});
