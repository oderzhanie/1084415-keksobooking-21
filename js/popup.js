'use strict';

const createPopupTemplate = (pin) => {
  const cardTemplate = document.querySelector(`#card`).content;
  const cardFragment = document.createDocumentFragment();
  const similarObjects = window.data.similarObjects;

  const pinIndex = similarObjects.findIndex((element) => element.id === pin.id);

  const clonedCard = cardTemplate.cloneNode(true);
  const cardPopup = clonedCard.querySelector(`.map__card`);
  const cardTitle = cardPopup.querySelector(`.popup__title`);
  const cardAddress = cardPopup.querySelector(`.popup__text--address`);
  const cardPrice = cardPopup.querySelector(`.popup__text--price`);
  const cardType = cardPopup.querySelector(`.popup__type`);
  const cardCapacity = cardPopup.querySelector(`.popup__text--capacity`);
  const cardCheckTime = cardPopup.querySelector(`.popup__text--time`);
  const cardFeatures = cardPopup.querySelector(`.popup__features`);
  const cardDescription = cardPopup.querySelector(`.popup__description`);
  const cardPhotos = cardPopup.querySelector(`.popup__photos`);
  const cardAvatar = cardPopup.querySelector(`.popup__avatar`);
  cardTitle.textContent = similarObjects[pinIndex].offer.title;
  cardAddress.textContent = similarObjects[pinIndex].offer.address;
  cardPrice.innerHTML = similarObjects[pinIndex].offer.price + `&#x20bd;<span>/ночь</span>`;
  cardType.textContent = window.constants.OFFER_TYPES_TITLES[similarObjects[pinIndex].offer.type];

  cardCapacity.textContent = similarObjects[pinIndex].offer.rooms + ` комнаты для ` + similarObjects[pinIndex].offer.guests + ` гостей`;
  cardCheckTime.textContent = `Заезд после ` + similarObjects[pinIndex].offer.checkin + `, выезд до ` + similarObjects[pinIndex].offer.checkout;

  for (const feature of window.constants.features) {
    if (!similarObjects[pinIndex].offer.features.includes(feature)) {
      const featureNode = cardFeatures.querySelector(`.popup__feature--` + feature);
      featureNode.classList.add(`visually-hidden`);
    }
  }

  cardDescription.textContent = similarObjects[pinIndex].offer.description;

  const photosLength = similarObjects[pinIndex].offer.photos.length;
  if (photosLength) {
    const firstPhoto = cardPhotos.querySelector(`.popup__photo`);
    firstPhoto.src = similarObjects[pinIndex].offer.photos[0];

    if (photosLength > 1) {
      for (let j = 1; j < photosLength; j++) {
        const clonedPhoto = firstPhoto.cloneNode(true);
        clonedPhoto.src = similarObjects[pinIndex].offer.photos[j];
        cardPhotos.appendChild(clonedPhoto);
      }
    }
  } else {
    cardPhotos.classList.add(`visually-hidden`);
  }

  cardAvatar.src = similarObjects[pinIndex].author.avatar;
  cardFragment.appendChild(clonedCard);

  return cardFragment;
};

const popupRenderHandler = (pin) => {
  const popup = window.map.map.querySelector(`.map__card`);
  if (window.map.map.contains(popup)) {
    popup.remove();
  }

  const popupTemplate = createPopupTemplate(pin);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const parentSection = mapFilters.parentNode;
  parentSection.insertBefore(popupTemplate, mapFilters);

  const closePopup = window.map.map.querySelector(`.popup__close`);

  closePopup.addEventListener(`click`, popupCloseHandler);
  document.addEventListener(`keydown`, popupCloseHandler);
};

const popupCloseHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
  }

  const popup = window.map.map.querySelector(`.map__card`);
  popup.remove();
  document.removeEventListener(`keydown`, popupCloseHandler);
};

window.popup = {
  popupRenderHandler,
  popupCloseHandler
};
