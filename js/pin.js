'use strict';

const {map} = window.map;
const mainPin = map.querySelector(`.map__pin--main`);
const INITIAL_OFFSET_LEFT = 570;
const INITIAL_OFFSET_TOP = 375;

let getPinCoords = () => {
  const posX = mainPin.offsetLeft;
  const posY = mainPin.offsetTop;

  const address = window.map.map.classList.contains(`map--faded`) ? `${posX + window.constants.INACTIVE_PIN_WIDTH_HALF}, ${posY + window.constants.INACTIVE_PIN_HEIGHT_HALF}`
    : `${mainPin.offsetLeft + window.constants.PIN_WIDTH_HALF}, ${mainPin.offsetTop + window.constants.PIN_HEIGHT}`;

  return address;
};

const restorePinCoords = () => {
  mainPin.style.left = `${INITIAL_OFFSET_LEFT}px`;
  mainPin.style.top = `${INITIAL_OFFSET_TOP}px`;
};

window.pin = {
  getPinCoords,
  restorePinCoords,
  mainPin
};
