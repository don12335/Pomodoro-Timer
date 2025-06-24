let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let time = workDuration;
let isRunning = false;
let isPaused = false;
let isWork = true;
let interval;

function updateDisplay() {
  const min = String(Math.floor(time / 60)).padStart(2, '0');
  const sec = String(time % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${min}:${sec}`;
}

function startTimer() {
  if (isRunning || isPaused) return;
  isRunning = true;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      isRunning = false;
      isWork = !isWork;
      time = isWork ? workDuration : breakDuration;
      document.getElementById('status').textContent = isWork ? "工作中" : "休息中";
      startTimer(); // 自動切換
    }
  }, 1000);
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    isPaused = true;
  } else if (isPaused) {
    isPaused = false;
    startTimer();
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  isPaused = false;
  isWork = true;
  workDuration = parseInt(document.getElementById('workTime').value) * 60;
  breakDuration = parseInt(document.getElementById('breakTime').value) * 60;
  time = workDuration;
  document.getElementById('status').textContent = "工作中";
  updateDisplay();
}

function applySettings() {
  if (!isRunning) {
    workDuration = parseInt(document.getElementById('workTime').value) * 60;
    breakDuration = parseInt(document.getElementById('breakTime').value) * 60;
    time = isWork ? workDuration : breakDuration;
    updateDisplay();
  } else {
    alert("請先停止計時器再更改時間！");
  }
}

updateDisplay();
