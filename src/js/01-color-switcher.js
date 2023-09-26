const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let idInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function startChangeColor() {
  btnStart.setAttribute('disabled', true);

  idInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  btnStart.removeAttribute('disabled');

  clearInterval(idInterval);
  idInterval = null;
}

btnStart.addEventListener('click', startChangeColor);
btnStop.addEventListener('click', stopChangeColor);
