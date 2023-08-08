const wordLimit = document.getElementById("word-limit");
const wordLimitSlider = document.getElementById("word-limit-slider");

const initialLimit = localStorage.getItem("wordLimit") || "100";
wordLimit.innerText = initialLimit;
wordLimitSlider.value = initialLimit;

wordLimitSlider.onchange = () => {
  localStorage.setItem("wordLimit", wordLimitSlider.value);
};
