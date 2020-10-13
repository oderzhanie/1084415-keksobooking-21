'use strict';

(() => {
  const map = document.querySelector(`.map`);

  const activateMap = () => {
    map.classList.remove(`map--faded`);
    map.classList.add(`map--active`);
    const mapPins = document.querySelector(`.map__pins`);
    const pinTemplate = document.querySelector(`#pin`).content;

    const similarPinsFragment = document.createDocumentFragment();


    for (let i = 0; i < window.data.pinItems; i++) {
      const clonedPin = pinTemplate.cloneNode(true);
      const pinButton = clonedPin.querySelector(`button`);
      const pinImg = pinButton.querySelector(`img`);
      const clonedPinPositionX = window.data.similarObjects[i].location.x + window.consts.PIN_WIDTH_HALF;
      const clonedPinPositionY = window.data.similarObjects[i].location.y + window.consts.PIN_HEIGHT;
      pinButton.style = `left: ` + clonedPinPositionX + `px; top: ` + clonedPinPositionY + `px;`;
      pinButton.id = window.data.similarObjects[i].id;
      pinButton.classList.add(`map__pin--object`);
      pinImg.src = window.data.similarObjects[i].author.avatar;
      pinImg.alt = window.data.similarObjects[i].offer.title;
      similarPinsFragment.appendChild(clonedPin);
    }

    mapPins.appendChild(similarPinsFragment);
    window.form.addressField.value = window.pin.getPinCoords();

    const objectPins = map.querySelectorAll(`.map__pin--object`);

    for (const pin of objectPins) {
      pin.addEventListener(`click`, () => {
        window.popup.popupRenderHandler(pin);
        pinActivateHandler(pin);
      });

      pin.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          window.popup.popupRenderHandler(pin);
        }
      });
    }

    const pinActivateHandler = (pin) => {
      const prevActivePin = map.querySelector(`.map__pin--active`);
      if (prevActivePin !== null) {
        prevActivePin.classList.remove(`map__pin--active`);
      }

      pin.classList.add(`map__pin--active`);
    };
  };

  window.map = {
    map,
    activateMap
  };
})();
