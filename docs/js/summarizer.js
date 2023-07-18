const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const preview = document.getElementById("preview");
const summary = document.getElementById("summary");
const error = document.getElementById("error");
const progressBar = document.getElementById("progress-bar");
const progressFilled = document.getElementById("progress-filled");

searchForm.onsubmit = (e) => {
  e.preventDefault();
  hideError();

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

  showEmbed(videoId);
  hideSummary();
  resetProgressBar();
  fakeProgress();
};

const showEmbed = (videoId) => {
  const videoEmbed = `
    <iframe class="preview" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  `;

  preview.innerHTML = videoEmbed;
};

const fakeProgress = () => {
  let progress = 0;
  const timer = setInterval(() => {
    if (progress >= 100) {
      clearInterval(timer);
      progressBar.style.visibility = "hidden";
      showSummary();
    }

    progress = progress + 35;
    progressFilled.style.width = `${progress}%`;
  }, 1000);
};

const hideSummary = () => {
  summary.style.visibility = "hidden";
};

const showSummary = () => {
  summary.style.visibility = "visible";
};

const resetProgressBar = () => {
  progressFilled.style.width = "0%";
  progressBar.style.visibility = "visible";
};

const hideError = () => {
  error.style.visibility = "hidden";
};

const showError = (errorMessage) => {
  error.innerHTML = errorMessage;
  error.style.visibility = "visible";
};
