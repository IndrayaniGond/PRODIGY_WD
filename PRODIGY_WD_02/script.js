let timer;
let isRunning = false;
let [milliseconds, seconds, minutes] = [0, 0, 0];

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const lapBtn = document.getElementById("lapBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");

startBtn.addEventListener("click", startStopwatch);
lapBtn.addEventListener("click", recordLap);
resumeBtn.addEventListener("click", resumeStopwatch);
resetBtn.addEventListener("click", resetStopwatch);

function startStopwatch() {
    if (!isRunning) {
        timer = setInterval(runStopwatch, 10);
        startBtn.style.display = "none";
        resumeBtn.style.display = "none";
        lapBtn.disabled = false;
        isRunning = true;
    }
}

function runStopwatch() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    displayTime();
}

function displayTime() {
    let m = minutes < 10 ? `0${minutes}` : minutes;
    let s = seconds < 10 ? `0${seconds}` : seconds;
    let ms = milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds;

    display.textContent = `${m}:${s}:${ms}`;
}

function recordLap() {
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.childElementCount + 1}: ${lapTime}`;
    laps.appendChild(lapItem);
}

function resumeStopwatch() {
    if (!isRunning) {
        timer = setInterval(runStopwatch, 10);
        resumeBtn.style.display = "none";
        lapBtn.disabled = false;
        isRunning = true;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    [milliseconds, seconds, minutes] = [0, 0, 0];
    display.textContent = "00:00:00";
    startBtn.style.display = "inline-block";
    resumeBtn.style.display = "none";
    lapBtn.disabled = true;
    laps.innerHTML = '';
    isRunning = false;
}

startBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        resumeBtn.style.display = "inline-block";
        startBtn.style.display = "none";
        lapBtn.disabled = true;
        isRunning = false;
    } else {
        startStopwatch();
    }
});

