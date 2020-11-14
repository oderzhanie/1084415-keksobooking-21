'use strict';

const mainPin = window.pin.mainPin;
const MAP_TOP = 130;
const MAP_BOTTOM = 630;

mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };


  const mouseMoveHandler = (moveEvt) => {
    moveEvt.preventDefault();

    const {map} = window.map;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const mainPinY = mainPin.offsetTop + window.constants.PIN_HEIGHT - shift.y;
    if (mainPinY < MAP_TOP) {
      mainPin.style.top = (MAP_TOP - window.constants.PIN_HEIGHT) + `px`;
    } else if (mainPinY > MAP_BOTTOM) {
      mainPin.style.top = (MAP_BOTTOM - window.constants.PIN_HEIGHT) + `px`;
    } else {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
    }

    const mainPinX = mainPin.offsetLeft + window.constants.PIN_WIDTH_HALF - shift.x;
    if (mainPinX < 0) {
      mainPin.style.left = (0 - window.constants.PIN_WIDTH_HALF) + `px`;
    } else if (mainPinX > map.clientWidth) {
      mainPin.style.left = (map.clientWidth - window.constants.PIN_WIDTH_HALF) + `px`;
    } else {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
    }

    window.form.addressField.value = window.pin.getPinCoords();
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
});
