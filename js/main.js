'use strict';

const PIN_WIDTH_HALF = 20;
const PIN_HEIGHT = 40;
const OFFER_TYPES_TITLES = {
  flat: `Квартира`,
  bungalo: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const types = [`palace`, `flat`, `house`, `boungalo`];
const checkTimes = [`12:00`, `13:00`, `14:00`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const photos = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const clientWidth = document.querySelector(`.map__pins`).clientWidth;
const pinItems = 8;

const getRandomNumber = function (min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getRandomIndex = function (array) {
  return getRandomNumber(0, array.length - 1);
};

const getRandomItem = function (collection) {
  return collection[getRandomIndex(collection)];
};

const getRandomArray = function (arr) {
  const result = [];
  const clonedArr = arr.slice();
  const randomArrayLength = getRandomNumber(1, arr.length);
  for (let i = 0; i < randomArrayLength; i++) {

    const randomEl = clonedArr.splice(getRandomIndex(clonedArr), 1)[0];
    result.push(randomEl);
  }
  return result;
};

const generateIndices = function (number) {
  const indices = [];
  for (let i = 0; i < number; i++) {
    indices[i] = `0` + (i + 1);
  }
  return indices;
};
const indices = generateIndices(pinItems);

const getUniqueEl = function (arr) {
  const randomEl = arr.splice(getRandomNumber(0, arr.length - 1), 1)[0];
  return randomEl;
};

const similarObjects = [];
const getSimilarObjects = function (quantity) {
  for (let i = 0; i < quantity; i++) {
    const ObjectLocation = {
      x: getRandomNumber(0, clientWidth),
      y: getRandomNumber(130, 630)
    };
    similarObjects.push({
      author: {
        avatar: `img/avatars/user` + getUniqueEl(indices) + `.png`
      },
      offer: {
        title: `Заголовок предложения`,
        address: ObjectLocation.x + `, ` + ObjectLocation.y,
        price: getRandomNumber(100, 1000),
        type: getRandomItem(types),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getRandomItem(checkTimes),
        checkout: getRandomItem(checkTimes),
        features: getRandomArray(features),
        description: `Описание жилья`,
        photos: getRandomArray(photos)
      },
      location: ObjectLocation
    });
  }
};

getSimilarObjects(pinItems);

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;
const fragment = document.createDocumentFragment();
for (let i = 0; i < pinItems; i++) {
  const clonedPin = pinTemplate.cloneNode(true);
  const pinButton = clonedPin.querySelector(`button`);
  const pinImg = pinButton.querySelector(`img`);
  const clonedPinPositionX = similarObjects[i].location.x + PIN_WIDTH_HALF;
  const clonedPinPositionY = similarObjects[i].location.y + PIN_HEIGHT;
  pinButton.style = `left: ` + clonedPinPositionX + `px; top: ` + clonedPinPositionY + `px;`;
  pinImg.src = similarObjects[i].author.avatar;
  pinImg.alt = similarObjects[i].offer.title;
  fragment.appendChild(clonedPin);
}

mapPins.appendChild(fragment);

const cardTemplate = document.querySelector(`#card`).content;

const cardFragment = document.createDocumentFragment();

for (let x = pinItems - 1; x >= 0; x--) {
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
  cardTitle.textContent = similarObjects[x].offer.title;
  cardAddress.textContent = similarObjects[x].offer.address;
  cardPrice.innerHTML = similarObjects[x].offer.price + `&#x20bd;<span>/ночь</span>`;
  cardType.textContent = OFFER_TYPES_TITLES[similarObjects[x].offer.type];

  cardCapacity.textContent = similarObjects[x].offer.rooms + ` комнаты для ` + similarObjects[x].offer.guests + ` гостей`;
  cardCheckTime.textContent = `Заезд после ` + similarObjects[x].offer.checkin + `, выезд до ` + similarObjects[x].offer.checkout;
  for (let f = 0; f < features.length; f++) {
    const feature = features[f];
    if (!similarObjects[x].offer.features.includes(feature)) {
      const featureNode = cardFeatures.querySelector(`.popup__feature--` + feature);
      featureNode.classList.add(`visually-hidden`);
    }
  }

  cardDescription.textContent = similarObjects[x].offer.description;
  const photosLength = similarObjects[x].offer.photos.length;
  const firstPhoto = cardPhotos.querySelector(`.popup__photo`);
  firstPhoto.src = similarObjects[x].offer.photos[0];
  if (photosLength > 1) {
    for (let j = 1; j < photosLength; j++) {
      const clonedPhoto = firstPhoto.cloneNode(true);
      clonedPhoto.src = similarObjects[x].offer.photos[j];
      cardPhotos.appendChild(clonedPhoto);
    }
  }
  cardAvatar.src = similarObjects[x].author.avatar;
  cardFragment.appendChild(clonedCard);
}
const mapFilters = document.querySelector(`.map__filters-container`);
const parentSection = mapFilters.parentNode;
parentSection.insertBefore(cardFragment, mapFilters);
