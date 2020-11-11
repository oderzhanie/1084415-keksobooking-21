'use strict';

const map = document.querySelector(`.map`);

const renderSimilarObjects = (objects) => {
  const objectPins = map.querySelectorAll(`.map__pin--object`);
  if (objectPins) {
    objectPins.forEach((object) => object.remove());
  }

  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const similarPinsFragment = document.createDocumentFragment();

  const amountToDisplay = Math.min(window.constants.PIN_ITEMS, objects.length);
  for (let i = 0; i < amountToDisplay; i++) {
    if (i <= window.constants.PIN_ITEMS) {
      const clonedPin = pinTemplate.cloneNode(true);
      const pinButton = clonedPin.querySelector(`button`);
      const pinImg = pinButton.querySelector(`img`);
      const clonedPinPositionX = objects[i].location.x + window.constants.PIN_WIDTH_HALF;
      const clonedPinPositionY = objects[i].location.y + window.constants.PIN_HEIGHT;
      pinButton.style = `left: ` + clonedPinPositionX + `px; top: ` + clonedPinPositionY + `px;`;
      pinButton.id = objects[i].id;
      pinButton.classList.add(`map__pin--object`);
      pinImg.src = objects[i].author.avatar;
      pinImg.alt = objects[i].offer.title;
      similarPinsFragment.appendChild(clonedPin);
    }
  }

  mapPins.appendChild(similarPinsFragment);
  const newPins = map.querySelectorAll(`.map__pin--object`);

  for (const pin of newPins) {
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

window.renderObjects = {
  renderSimilarObjects
};
