import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from "./constants.js";
import { formatTime, validateTime, timeToSeconds } from "./utils.js";

const startButton = document.getElementById("btn-start");
const pauseButton = document.getElementById("btn-pause");
const resetButton = document.getElementById("btn-reset");
const fullscreenButton = document.getElementById("btn-fullscreen");
const editButton = document.getElementById("btn-edit");
const timerDisplay = document.getElementById("timer");

let timeString = "00:00:00";
let totalSeconds = 0;
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

      const audio = new Audio("../assets/clock-alarm.mp3");
      audio.play();
    }
  }, 1000);
}

function resetTimer() {
  totalSeconds = timeToSeconds(timeString);
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

function editTimer() {
  const newTime = prompt("Insira o tempo no formato HH:MM:SS", timeString);

  if (newTime && validateTime(newTime)) {
    timeString = newTime;
    totalSeconds = timeToSeconds(newTime);
    updateDisplay();
  }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
fullscreenButton.addEventListener("click", toggleFullscreen);
editButton.addEventListener("click", editTimer);
