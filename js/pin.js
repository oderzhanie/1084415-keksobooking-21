'use strict';

(() => {
  const mainPin = window.map.map.querySelector(`.map__pin--main`);

  let getPinCoords = () => {
    const posX = mainPin.offsetLeft;
    const posY = mainPin.offsetTop;

    const address = window.map.map.classList.contains(`map--faded`) ? `${posX + window.constants.INACTIVE_PIN_WIDTH_HALF}, ${posY + window.constants.INACTIVE_PIN_HEIGHT_HALF}`
      : `${mainPin.offsetLeft + window.constants.PIN_WIDTH_HALF}, ${mainPin.offsetTop + window.constants.PIN_HEIGHT}`;

    return address;
  };

  window.pin = {
    getPinCoords,
    mainPin
  };
})();
