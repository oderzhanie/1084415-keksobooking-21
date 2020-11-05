'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const filters = map.querySelectorAll(`.map__filter`);

  filters.forEach((child) => {
    child.setAttribute(`disabled`, ``);
  });

  const housingFilter = document.querySelector(`#housing-type`);

  const renderSimilarObjects = (objects) => {
    const objectPins = map.querySelectorAll(`.map__pin--object`);
    if (objectPins) {
      objectPins.forEach((object) => object.remove());
    }


    const mapPins = document.querySelector(`.map__pins`);
    const pinTemplate = document.querySelector(`#pin`).content;
    const similarPinsFragment = document.createDocumentFragment();

    for (let i = 0; i <= window.constants.PIN_ITEMS; i++) {
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

    mapPins.appendChild(similarPinsFragment);

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

  const onObjectsReady = () => {
    const similarObjects = window.data.similarObjects;
    renderSimilarObjects(similarObjects);
    window.form.addressField.value = window.pin.getPinCoords();
  };


  const getFilteredObjects = () => {
    const popup = window.map.map.querySelector(`.map__card`);
    if (window.map.map.contains(popup)) {
      popup.remove();
    }

    const prevPins = window.map.map.querySelectorAll(`.map__pin--object`);
    prevPins.forEach((elem) => {
      elem.remove();
    });

    const similarObjects = window.data.similarObjects;

    const indexSelectedChoice = housingFilter.selectedIndex;
    const selectedChoice = housingFilter.options[indexSelectedChoice].value;

    if (indexSelectedChoice === 0) {
      window.data.prepareSimilarObjects(onObjectsReady);
    }

    const filteredObjects = similarObjects.filter((obj) => {
      return obj.offer.type === selectedChoice;
    });
    // После этой фильтрации в filteredObjects объекты добавляются дважды, с дубликатом.
    renderSimilarObjects(filteredObjects);
  };

  const activateMap = () => {
    map.classList.remove(`map--faded`);
    map.classList.add(`map--active`);
    window.data.prepareSimilarObjects(onObjectsReady);

    filters.forEach((child) => {
      child.removeAttribute(`disabled`, ``);
    });

    housingFilter.addEventListener(`change`, () => {
      window.data.prepareSimilarObjects(getFilteredObjects);
    });
  };

  const deactivateMap = () => {
    map.classList.remove(`map--active`);
    map.classList.add(`map--faded`);
    filters.forEach((child) => {
      child.setAttribute(`disabled`, ``);
    });

    const objectPins = map.querySelectorAll(`.map__pin--object`);
    objectPins.forEach((object) => object.remove());

    window.pin.restorePinCoords();
  };

  window.map = {
    map,
    activateMap,
    deactivateMap
  };
})();
