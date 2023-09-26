import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dateInput = document.querySelector('#datetime-picker');

btnStart.disabled = true;
btnStart.addEventListener('click', onStartCounter);

let selectedDate;
let idInterval;
const TIMER_DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0].getTime();
      btnStart.disabled = false;
      dateInput.disabled = true;
    }
  },
};

const datepicker = flatpickr(dateInput, options);

function onStartCounter() {
  counter.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const counter = {
  start() {
    idInterval = setInterval(() => {
      const currentDate = Date.now();
      const leftTime = selectedDate - currentDate;
      updateTimer(convertMs(leftTime));

      if (leftTime <= 1000) {
        this.stop();
      }
    }, TIMER_DELAY);
  },

  stop() {
    btnStart.disabled = true;
    dateInput.disabled = false;
    clearInterval(idInterval);
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
