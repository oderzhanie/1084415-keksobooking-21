'use strict';

const map = document.querySelector(`.map`);

const {FILTER_PRICES} = window.constants;
const {renderSimilarObjects} = window.renderObjects;
const filters = map.querySelectorAll(`.map__filter`);
const filtersForm = map.querySelector(`.map__filters`);

const getFilteredObjects = () => {
  const popup = map.querySelector(`.map__card`);
  if (map.contains(popup)) {
    popup.remove();
  }

  const prevPins = map.querySelectorAll(`.map__pin--object`);
  prevPins.forEach((elem) => elem.remove());

  const {similarObjects} = window.data;
  let filteredObjects = similarObjects;


  for (let filter of filters) {
    const {selectedIndex} = filter;
    const selectedChoice = filter.options[selectedIndex].value;

    switch (filter.id) {
      case `housing-type`:
        if (selectedIndex) {
          filteredObjects = filteredObjects.filter((obj) => obj.offer.type === selectedChoice);
        }
        break;

      case `housing-price`:
        if (selectedIndex) {
          switch (selectedChoice) {
            case `low`:
              filteredObjects = filteredObjects.filter((obj) => obj.offer.price < FILTER_PRICES.LOW);
              break;

            case `middle`:
              filteredObjects = filteredObjects.filter((obj) => obj.offer.price > FILTER_PRICES.LOW && obj.offer.price < FILTER_PRICES.MIDDLE);
              break;

            case `high`:
              filteredObjects = filteredObjects.filter((obj) => obj.offer.price > FILTER_PRICES.MIDDLE);
              break;
          }
        }
        break;

      case `housing-rooms`:
        if (selectedIndex) {
          filteredObjects = filteredObjects.filter((obj) => obj.offer.rooms === Number(selectedChoice));
        }
        break;

      case `housing-guests`:
        if (selectedIndex) {
          filteredObjects = filteredObjects.filter((obj) => obj.offer.guests === Number(selectedChoice));
        }
        break;
    }
  }

  const housingFeatures = filtersForm.querySelectorAll(`.map__checkbox`);
  const housingFeaturesChecked = [];
  for (let feature of housingFeatures) {
    if (feature.checked) {
      housingFeaturesChecked.push(feature.value);
    }
  }

  if (housingFeaturesChecked.length > 0) {
    for (let i = 0; i < housingFeaturesChecked.length; i++) {
      filteredObjects = filteredObjects.filter((obj) => obj.offer.features.includes(housingFeaturesChecked[i]));
    }
  }

  window.debounce.debounce(renderSimilarObjects)(filteredObjects);
};

window.filter = {
  filters,
  filtersForm,
  getFilteredObjects
};
