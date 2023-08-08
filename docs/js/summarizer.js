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
    videoId = getVideoId(searchInput.value);
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

const getVideoId = (youtubeUrl) => {
  // expecting YouTube URL in one of these formats: https://www.youtube.com/watch?v={video_id}, https://www.youtube.com/shorts/{video_id}, https://youtu.be/{video_id}
  const url = new URL(youtubeUrl);

  if (url.searchParams.get("v")) {
    return url.searchParams.get("v");
  }

  if (url.pathname.includes("shorts") || url.hostname === "youtu.be") {
    // video ID should be the last part of the URL path
    return url.pathname.split("/").pop();
  }

  throw new Error("Invalid URL");
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
