const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const preview = document.getElementById("preview");
const summary = document.getElementById("summary");
const summaryText = document.getElementById("summary-text");
const error = document.getElementById("error");
const progressBar = document.getElementById("progress-bar");
const progressFilled = document.getElementById("progress-filled");

const baseUrl = "http://174.138.38.99:8181";

searchForm.onsubmit = async (e) => {
  e.preventDefault();
  hideError();

  const url = searchInput.value;
  let videoId;
  try {
    videoId = getVideoId(url);
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

  try {
    resetProgressBar();
    startProgressBar();

    const summary = await summarize(url);

    showSummary(summary);
  } catch (e) {
    showError(e.toString());
  } finally {
    hideProgressBar();
  }
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

const summarize = async (url, wordLimit = 100) => {
  const response = await fetch(
    `${baseUrl}/val_summ?val_summ=${url}&val_size=${wordLimit}`
  );

  const content = await response.text();
  // the backend returns this html tag for some reason. Strip it out
  return content.replace(/^<pad> /, "");
};

const startProgressBar = () => {
  let progress = 0;
  const timer = setInterval(() => {
    progress = progress + 5;

    if (progress >= 100) {
      progress = 98;
      clearInterval(timer);
    }

    progressFilled.style.width = `${progress}%`;
  }, 1000);
};

const hideSummary = () => {
  summary.style.visibility = "hidden";
};

const showSummary = (summaryContent) => {
  summaryText.innerText = summaryContent;
  summary.style.visibility = "visible";
};

const resetProgressBar = () => {
  progressFilled.style.width = "0%";
  progressBar.style.visibility = "visible";
};

const hideProgressBar = () => {
  progressBar.style.visibility = "hidden";
};

const hideError = () => {
  error.style.visibility = "hidden";
};

const showError = (errorMessage) => {
  error.innerHTML = errorMessage;
  error.style.visibility = "visible";
};
