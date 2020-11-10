'use strict';

(() => {
  const map = document.querySelector(`.map`);

  const {renderSimilarObjects} = window.renderObjects;
  const filters = map.querySelectorAll(`.map__filter`);
  const filtersForm = map.querySelector(`.map__filters`);

  const getFilteredObjects = () => {
    const popup = window.map.map.querySelector(`.map__card`);
    if (window.map.map.contains(popup)) {
      popup.remove();
    }

    const prevPins = window.map.map.querySelectorAll(`.map__pin--object`);
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
          } else {
            filteredObjects = filteredObjects.filter((obj) => obj.offer.type);
          }
          break;

        case `housing-price`:
          if (selectedIndex) {
            filteredObjects = filteredObjects.filter((obj) => obj.offer.price);

            switch (selectedChoice) {
              case `low`:
                filteredObjects = filteredObjects.filter((obj) => obj.offer.price < 10000);
                break;

              case `middle`:
                filteredObjects = filteredObjects.filter((obj) => obj.offer.price > 10000 && obj.offer.price < 50000);
                break;

              case `high`:
                filteredObjects = filteredObjects.filter((obj) => obj.offer.price > 50000);
                break;
            }
          } else {
            filteredObjects = filteredObjects.filter((obj) => obj.offer.price);
          }
          break;

        case `housing-rooms`:
          if (selectedIndex) {
            filteredObjects = filteredObjects.filter((obj) => obj.offer.rooms === Number(selectedChoice));
          } else {
            filteredObjects = filteredObjects.filter((obj) => obj.offer.rooms);
          }
          break;

        case `housing-guests`:
          if (selectedIndex) {
            filteredObjects = filteredObjects.filter((obj) => obj.offer.guests === Number(selectedChoice));
          } else {
            filteredObjects = filteredObjects.filter((obj) => obj.offer.guests);
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

    window.debounce.debounce(renderSimilarObjects(filteredObjects));
  };

  window.filter = {
    filters,
    filtersForm,
    getFilteredObjects
  };
})();
