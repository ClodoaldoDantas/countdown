import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from "./constants.js";
import { formatTime } from "./utils.js";

const fullscreenButton = document.getElementById("btn-fullscreen");
const startButton = document.getElementById("btn-start");
const pauseButton = document.getElementById("btn-pause");
const resetButton = document.getElementById("btn-reset");
const timerDisplay = document.getElementById("timer");

let totalSeconds = 60 * 30; // 30 minutes
let intervalId = null;

const showPauseButton = () => {
  pauseButton.style.display = "flex";
  startButton.style.display = "none";
};

const showStartButton = () => {
  pauseButton.style.display = "none";
  startButton.style.display = "flex";
};

function updateDisplay() {
  let hours = Math.floor(totalSeconds / SECONDS_IN_HOUR);

  let minutes = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
  );

  let seconds = totalSeconds % SECONDS_IN_MINUTE;

  let hourFormatted = formatTime(hours);
  let minutesFormatted = formatTime(minutes);
  let secondsFormatted = formatTime(seconds);

  timerDisplay.innerText = `${hourFormatted}:${minutesFormatted}:${secondsFormatted}`;
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
  showStartButton();
}

function startTimer() {
  if (intervalId || totalSeconds <= 0) {
    return;
  }

  intervalId = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;

      showPauseButton();
      updateDisplay();
    } else {
      pauseTimer();
      alert("Time's up!");
    }
  }, 1000);
}

function resetTimer() {
  totalSeconds = 60 * 30;
  pauseTimer();
  updateDisplay();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
fullscreenButton.addEventListener("click", toggleFullscreen);
