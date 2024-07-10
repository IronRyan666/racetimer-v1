let timers = [];

document.getElementById('set-timer-1').addEventListener('click', function() {
  setTimer(1, 'timer-input-1', ['p2.mp3', 'sb.mp3']);
});

document.getElementById('set-timer-2').addEventListener('click', function() {
  setTimer(2, 'timer-input-2', ['p3.mp3', 'sb.mp3']);
});

document.getElementById('set-timer-3').addEventListener('click', function() {
  setTimer(3, 'timer-input-3', ['p4.mp3', 'sb.mp3']);
});

document.getElementById('set-timer-4').addEventListener('click', function() {
  setTimer(4, 'timer-input-4', ['p5.mp3', 'sb.mp3']);
});

document.getElementById('start-all-timers').addEventListener('click', function() {
  const delay = parseInt(document.getElementById('delay-input').value);
  if (isNaN(delay) || delay < 0) {
    alert('Please enter a valid number of seconds for the delay.');
    return;
  }
  startAllTimersWithDelay(delay);
});

function setTimer(id, inputId, sounds) {
  const duration = parseInt(document.getElementById(inputId).value);
  if (isNaN(duration) || duration <= 0) {
    alert(`Please enter a valid number of seconds for timer ${id}.`);
    return;
  }

  timers[id - 1] = { duration, label: `Timer ${id}`, remainingTime: duration, interval: null, element: null, sounds };
  displayTimer(id, duration);
}
function displayTimer(id, duration) {
  let timerContainer = document.getElementById(`timer-${id}`);
  if (!timerContainer) {
    timerContainer = document.createElement('div');
    timerContainer.classList.add('timer');
    timerContainer.id = `timer-${id}`;
    document.getElementById('timers').appendChild(timerContainer);
  }
  timerContainer.textContent = `Timer ${id}: ${duration} seconds remaining`;
  timers[id - 1].element = timerContainer;
}

function startAllTimersWithDelay(delay) {
    playSingleSound('beeper1.mp3')
  setTimeout(() => {
    timers.forEach(timer => {
      if (timer.interval) {
        clearInterval(timer.interval);
      }
      timer.remainingTime = timer.duration;
      timer.interval = setInterval(() => {
        timer.remainingTime--;
        if (timer.remainingTime > 0) {
          timer.element.textContent = `${timer.label}: ${timer.remainingTime} seconds remaining`;
          timer.element.classList.add('active');
        } else {
          clearInterval(timer.interval);
          timer.element.textContent = `${timer.label}: Time is up!`;
          timer.element.classList.remove('active');
          timer.element.classList.add('complete');
          playSound(timer.sounds);
        }
      }, 1000);
    });
  }, delay * 1000);
}


function playSound(sounds) {
  if (sounds.length === 0) return;
  const audio = new Audio(sounds[0]);
  audio.play();
  audio.addEventListener('ended', () => {
    playSound(sounds.slice(1));
  });
}
function playSingleSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  }