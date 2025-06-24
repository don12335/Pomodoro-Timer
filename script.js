let time = 25 * 60;
let isRunning = false;
let interval;
let isWork = true;

function updateDisplay() {
  const min = String(Math.floor(time / 60)).padStart(2, '0');
  const sec = String(time % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${min}:${sec}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    time--;
    updateDisplay();
    if (time <= 0) {
      clearInterval(interval);
      isRunning = false;
      isWork = !isWork;
      time = isWork ? 25 * 60 : 5 * 60;
      document.getElementById('status').textContent = isWork ? "工作中" : "休息中";
      startTimer(); // 自動開始下一階段
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  isWork = true;
  time = 25 * 60;
  document.getElementById('status').textContent = "工作中";
  updateDisplay();
}

updateDisplay();
