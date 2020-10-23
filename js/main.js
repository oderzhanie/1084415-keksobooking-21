'use strict';

const activatePage = () => {
  window.form.activateForm();
  window.map.activateMap();
};

window.pin.mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

window.pin.mainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
});
