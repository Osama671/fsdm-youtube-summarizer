const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const preview = document.getElementById("preview");

searchForm.onsubmit = (e) => {
  e.preventDefault();
  // expecting YouTube URL to have this format: https://www.youtube.com/watch?v={video_id}
  const url = new URL(searchInput.value);
  const videoId = url.searchParams.get("v");

  const videoEmbed = `
    <iframe class="preview" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  `;

  preview.innerHTML = videoEmbed;
};
