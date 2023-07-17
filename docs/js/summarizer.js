const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const preview = document.getElementById("preview");
const summary = document.getElementById("summary");
const error = document.getElementById("error");

searchForm.onsubmit = (e) => {
  e.preventDefault();
  error.style.visibility = "hidden";

  let videoId;
  try {
    // expecting YouTube URL to have this format: https://www.youtube.com/watch?v={video_id}
    const url = new URL(searchInput.value);
    videoId = url.searchParams.get("v");
  } catch (e) {
    showError("Invalid YouTube URL format");
    return;
  }

  if (!videoId) {
    showError("Invalid YouTube URL format");
    return;
  }

  const videoEmbed = `
    <iframe class="preview" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  `;

  preview.innerHTML = videoEmbed;

  summary.style.visibility = "visible";
};

const showError = (errorMessage) => {
  error.innerHTML = errorMessage;
  error.style.visibility = "visible";
};
