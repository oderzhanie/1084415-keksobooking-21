'use strict';

(() => {
  const map = document.querySelector(`.map`);

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const activateMap = () => {
    map.classList.remove(`map--faded`);
    map.classList.add(`map--active`);
    const mapPins = document.querySelector(`.map__pins`);
    const pinTemplate = document.querySelector(`#pin`).content;

    const similarPinsFragment = document.createDocumentFragment();

    const similarObjects = [];

    window.load.download((objects) => {
      objects.forEach((elem) => {
        elem.id = window.utils.generateId();
        similarObjects.push(elem);
      });

      for (let i = 0; i < window.constants.pinItems; i++) {
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
    }, errorHandler);
  };

  window.map = {
    map,
    activateMap,
    // similarObjects
  };
})();
