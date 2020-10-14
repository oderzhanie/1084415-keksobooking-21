'use strict';

(() => {
  const mainPin = window.map.map.querySelector(`.map__pin--main`);

  let getPinCoords = () => {
    const posX = mainPin.offsetLeft;
    const posY = mainPin.offsetTop;

    const address = window.map.map.classList.contains(`map--faded`) ? `${posX + window.consts.INACTIVE_PIN_WIDTH_HALF}, ${posY + window.consts.INACTIVE_PIN_HEIGHT_HALF}`
      : `${posX + window.consts.PIN_WIDTH_HALF}, ${posY + window.consts.PIN_HEIGHT}`;

    return address;
  };


  window.pin = {
    getPinCoords,
    mainPin
  };
})();
