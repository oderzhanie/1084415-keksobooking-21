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

const getRandomNumber = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getRandomIndex = (array) => {
  return getRandomNumber(0, array.length - 1);
};

const getRandomItem = (collection) => {
  return collection[getRandomIndex(collection)];
};

const getRandomArray = (arr) => {
  const result = [];
  const clonedArr = arr.slice();
  const randomArrayLength = getRandomNumber(1, arr.length);
  for (let i = 0; i < randomArrayLength; i++) {

    const randomEl = clonedArr.splice(getRandomIndex(clonedArr), 1)[0];
    result.push(randomEl);
  }
  return result;
};

const generateIndices = (number) => {
  const indices = [];
  for (let i = 0; i < number; i++) {
    indices[i] = `0` + (i + 1);
  }
  return indices;
};
const indices = generateIndices(pinItems);

const getUniqueEl = (arr) => {
  const randomEl = arr.splice(getRandomNumber(0, arr.length - 1), 1)[0];
  return randomEl;
};

const similarObjects = [];
const getSimilarObjects = (quantity) => {
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

for (let i = pinItems - 1; i >= 0; i--) {
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
  cardTitle.textContent = similarObjects[i].offer.title;
  cardAddress.textContent = similarObjects[i].offer.address;
  cardPrice.innerHTML = similarObjects[i].offer.price + `&#x20bd;<span>/ночь</span>`;
  cardType.textContent = OFFER_TYPES_TITLES[similarObjects[i].offer.type];

  cardCapacity.textContent = similarObjects[i].offer.rooms + ` комнаты для ` + similarObjects[i].offer.guests + ` гостей`;
  cardCheckTime.textContent = `Заезд после ` + similarObjects[i].offer.checkin + `, выезд до ` + similarObjects[i].offer.checkout;

  for (const feature of features) {
    if (!similarObjects[i].offer.features.includes(feature)) {
      const featureNode = cardFeatures.querySelector(`.popup__feature--` + feature);
      featureNode.classList.add(`visually-hidden`);
    }
  }

  cardDescription.textContent = similarObjects[i].offer.description;
  const photosLength = similarObjects[i].offer.photos.length;
  const firstPhoto = cardPhotos.querySelector(`.popup__photo`);
  firstPhoto.src = similarObjects[i].offer.photos[0];
  if (photosLength > 1) {
    for (let j = 1; j < photosLength; j++) {
      const clonedPhoto = firstPhoto.cloneNode(true);
      clonedPhoto.src = similarObjects[i].offer.photos[j];
      cardPhotos.appendChild(clonedPhoto);
    }
  }
  cardAvatar.src = similarObjects[i].author.avatar;
  cardFragment.appendChild(clonedCard);
}
const mapFilters = document.querySelector(`.map__filters-container`);
const parentSection = mapFilters.parentNode;
parentSection.insertBefore(cardFragment, mapFilters);
