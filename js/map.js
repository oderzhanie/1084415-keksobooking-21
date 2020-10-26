'use strict';

(() => {
  const map = document.querySelector(`.map`);

  const onObjectsReady = () => {
    const mapPins = document.querySelector(`.map__pins`);
    const pinTemplate = document.querySelector(`#pin`).content;
    const similarPinsFragment = document.createDocumentFragment();

    const similarObjects = window.data.similarObjects;

    for (let i = 0; i < window.constants.PIN_ITEMS; i++) {
      const clonedPin = pinTemplate.cloneNode(true);
      const pinButton = clonedPin.querySelector(`button`);
      const pinImg = pinButton.querySelector(`img`);
      const clonedPinPositionX = similarObjects[i].location.x + window.constants.PIN_WIDTH_HALF;
      const clonedPinPositionY = similarObjects[i].location.y + window.constants.PIN_HEIGHT;
      pinButton.style = `left: ` + clonedPinPositionX + `px; top: ` + clonedPinPositionY + `px;`;
      pinButton.id = similarObjects[i].id;
      pinButton.classList.add(`map__pin--object`);
      pinImg.src = similarObjects[i].author.avatar;
      pinImg.alt = similarObjects[i].offer.title;
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

  const activateMap = () => {
    map.classList.remove(`map--faded`);
    map.classList.add(`map--active`);
    window.data.prepareSimilarObjects(onObjectsReady);
  };

  const deactivateMap = () => {
    map.classList.remove(`map--active`);
    map.classList.add(`map--faded`);

    const objectPins = map.querySelectorAll(`.map__pin--object`);
    objectPins.forEach((object) => object.remove());

    // И здесь еще вернуть основной пин в центр карты.
  };

  window.map = {
    map,
    activateMap,
    deactivateMap
  };
})();
