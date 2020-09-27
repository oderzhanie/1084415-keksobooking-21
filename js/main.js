'use strict';

const PIN_WIDTH_HALF = 20;
const PIN_HEIGHT = 40;
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

    const randomEl = clonedArr.splice(getRandomNumber(0, clonedArr.length - 1), 1)[0];
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
