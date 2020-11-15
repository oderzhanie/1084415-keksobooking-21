'use strict';

const map = document.querySelector(`.map`);
const {renderSimilarObjects} = window.renderObjects;
const {filters, filtersForm, getFilteredObjects} = window.filter;

filters.forEach((child) => {
  child.setAttribute(`disabled`, ``);
});

const onObjectsReady = () => {
  const {similarObjects} = window.data;
  renderSimilarObjects(similarObjects);
  window.form.addressField.value = window.pin.getPinCoords();
};

const activateMap = () => {
  map.classList.remove(`map--faded`);
  map.classList.add(`map--active`);
  window.data.prepareSimilarObjects(onObjectsReady);

  filters.forEach((child) => {
    child.removeAttribute(`disabled`);
  });

  filtersForm.addEventListener(`change`, getFilteredObjects);

  const checkboxes = filtersForm.querySelectorAll(`input[type=checkbox]`);
  checkboxes.forEach((elem) => {
    elem.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        if (!elem.checked) {
          elem.setAttribute(`checked`, `checked`);
        } else {
          elem.removeAttribute(`checked`);
        }

        getFilteredObjects();
      }
    });
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
