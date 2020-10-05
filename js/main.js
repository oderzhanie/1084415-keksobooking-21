'use strict';

const INACTIVE_PIN_WIDTH_HALF = 20;
const INACTIVE_PIN_HEIGHT_HALF = 22;
const PIN_WIDTH_HALF = 20;
const PIN_HEIGHT = 40;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const CUSTOM_MESSAGES_ROOMS = {
  manyPeople: `Число людей не может быть больше количества комнат`,
  fewRooms: `Число комнат не может быть меньше количества людей`,
  nonResidentialRooms: `Вариант "100 комнат" можно выбрать только не для гостей`,
  nonResidentialGuests: `Не для гостей можно выбрать только вариант "100 комнат"`
};

// const OFFER_TYPES_TITLES = {
//   flat: `Квартира`,
//   bungalo: `Бунгало`,
//   house: `Дом`,
//   palace: `Дворец`
// };

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

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
      id: generateId(),
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
const mainPin = map.querySelector(`.map__pin--main`);

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = Array.from(adForm.children);

adFormFieldsets.forEach((child) => {
  child.setAttribute(`disabled`, ``);
});

const addressField = adForm.querySelector(`#address`);
addressField.setAttribute(`disabled`, ``);

let getPinCoords = () => {
  const posX = mainPin.offsetLeft;
  const posY = mainPin.offsetTop;

  const address = map.classList.contains(`map--faded`) ? `${posX + INACTIVE_PIN_WIDTH_HALF}, ${posY + INACTIVE_PIN_HEIGHT_HALF}`
    : `${posX + PIN_WIDTH_HALF}, ${posY + PIN_HEIGHT}`;

  return address;
};

addressField.value = getPinCoords();

const activatePage = () => {
  adForm.classList.remove(`ad-form--disabled`);

  adFormFieldsets.forEach((child) => {
    child.removeAttribute(`disabled`, ``);
  });

  map.classList.remove(`map--faded`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;

  const similarPinsFragment = document.createDocumentFragment();
  for (let i = 0; i < pinItems; i++) {
    const clonedPin = pinTemplate.cloneNode(true);
    const pinButton = clonedPin.querySelector(`button`);
    const pinImg = pinButton.querySelector(`img`);
    const clonedPinPositionX = similarObjects[i].location.x + PIN_WIDTH_HALF;
    const clonedPinPositionY = similarObjects[i].location.y + PIN_HEIGHT;
    pinButton.style = `left: ` + clonedPinPositionX + `px; top: ` + clonedPinPositionY + `px;`;
    pinButton.id = similarObjects[i].id;
    pinImg.src = similarObjects[i].author.avatar;
    pinImg.alt = similarObjects[i].offer.title;
    similarPinsFragment.appendChild(clonedPin);
  }

  mapPins.appendChild(similarPinsFragment);

  addressField.value = getPinCoords();
};

mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

mainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
});

// const createPopupTemplate = () => {
//   const cardTemplate = document.querySelector(`#card`).content;
//   const cardFragment = document.createDocumentFragment();

//   for (let i = pinItems - 1; i >= 0; i--) {
//     const clonedCard = cardTemplate.cloneNode(true);

//     const cardPopup = clonedCard.querySelector(`.map__card`);
//     const cardTitle = cardPopup.querySelector(`.popup__title`);
//     const cardAddress = cardPopup.querySelector(`.popup__text--address`);
//     const cardPrice = cardPopup.querySelector(`.popup__text--price`);
//     const cardType = cardPopup.querySelector(`.popup__type`);
//     const cardCapacity = cardPopup.querySelector(`.popup__text--capacity`);
//     const cardCheckTime = cardPopup.querySelector(`.popup__text--time`);
//     const cardFeatures = cardPopup.querySelector(`.popup__features`);
//     const cardDescription = cardPopup.querySelector(`.popup__description`);
//     const cardPhotos = cardPopup.querySelector(`.popup__photos`);
//     const cardAvatar = cardPopup.querySelector(`.popup__avatar`);
//     cardTitle.textContent = similarObjects[i].offer.title;
//     cardAddress.textContent = similarObjects[i].offer.address;
//     cardPrice.innerHTML = similarObjects[i].offer.price + `&#x20bd;<span>/ночь</span>`;
//     cardType.textContent = OFFER_TYPES_TITLES[similarObjects[i].offer.type];

//     cardCapacity.textContent = similarObjects[i].offer.rooms + ` комнаты для ` + similarObjects[i].offer.guests + ` гостей`;
//     cardCheckTime.textContent = `Заезд после ` + similarObjects[i].offer.checkin + `, выезд до ` + similarObjects[i].offer.checkout;

//     for (const feature of features) {
//       if (!similarObjects[i].offer.features.includes(feature)) {
//         const featureNode = cardFeatures.querySelector(`.popup__feature--` + feature);
//         featureNode.classList.add(`visually-hidden`);
//       }
//     }

//     cardDescription.textContent = similarObjects[i].offer.description;
//     const photosLength = similarObjects[i].offer.photos.length;
//     const firstPhoto = cardPhotos.querySelector(`.popup__photo`);
//     firstPhoto.src = similarObjects[i].offer.photos[0];
//     if (photosLength > 1) {
//       for (let j = 1; j < photosLength; j++) {
//         const clonedPhoto = firstPhoto.cloneNode(true);
//         clonedPhoto.src = similarObjects[i].offer.photos[j];
//         cardPhotos.appendChild(clonedPhoto);
//       }
//     }
//     cardAvatar.src = similarObjects[i].author.avatar;
//     cardFragment.appendChild(clonedCard);
//   }

//   return cardFragment;
// };

// Сначала создаем код для отрисовки темплейта (одна функция для одного темплейта)
// Затем создаем функцию для создания массива этих элементов в памяти (вторая функция)
// Затем создаем функцию рендеринга того элемента из массива, по которому кликнули

// const renderPopup = (pinItem) => {
//   const popup = createPopupTemplate(pinItem);

//   const mapFilters = document.querySelector(`.map__filters-container`);
//   const parentSection = mapFilters.parentNode;
//   parentSection.insertBefore(popup, mapFilters);

//   // Добавить обработчик для закрытия попапа
// };

// const mapPins = map.querySelectorAll(`.map__pin`);
// for (const pin of mapPins) {
//   pin.addEventListener(`click`, () => {
//     // Определить, какому объекту в базе соответствует этот пин и передать объект в функцию отрисовщика
//     renderPopup();
//   });
// }

const titleInput = adForm.querySelector(`#title`);

titleInput.addEventListener(`invalid`, () => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity(`Обязательное поле`);
  }
});

titleInput.addEventListener(`input`, () => {
  let valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength === MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Заголовок должен быть не более 100 символов`);
  } else {
    titleInput.setCustomValidity(``);
  }

  titleInput.reportValidity();
});

const roomsNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

const roomsChangeHandler = () => {
  const indexSelectedRooms = roomsNumber.selectedIndex;
  const indexSelectedCapacity = capacity.selectedIndex;

  const selectedRooms = Number(roomsNumber.options[indexSelectedRooms].value);
  const selectedCapacity = Number(capacity.options[indexSelectedCapacity].value);

  switch (selectedRooms) {
    case 1:
      if (selectedCapacity === 0) {
        roomsNumber.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      } else if (selectedCapacity > 1) {
        roomsNumber.setCustomValidity(CUSTOM_MESSAGES_ROOMS.fewRooms);
      } else {
        roomsNumber.setCustomValidity(``);
      }
      break;

    case 2:
      if (selectedCapacity === 0) {
        roomsNumber.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      } else if (selectedCapacity > 2) {
        roomsNumber.setCustomValidity(CUSTOM_MESSAGES_ROOMS.fewRooms);
      } else {
        roomsNumber.setCustomValidity(``);
      }
      break;

    case 3:
      if (selectedCapacity === 0) {
        roomsNumber.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      } else {
        roomsNumber.setCustomValidity(``);
      }
      break;

    case 100:
      if (selectedCapacity > 0) {
        roomsNumber.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
      } else {
        roomsNumber.setCustomValidity(``);
      }
      break;
  }

  roomsNumber.reportValidity();
};

roomsNumber.addEventListener(`change`, () => {
  roomsChangeHandler();
});

const capacityChangeHandler = () => {
  const indexSelectedRooms = roomsNumber.selectedIndex;
  const indexSelectedCapacity = capacity.selectedIndex;

  const selectedRooms = Number(roomsNumber.options[indexSelectedRooms].value);
  const selectedCapacity = Number(capacity.options[indexSelectedCapacity].value);

  switch (selectedCapacity) {
    case 1:
      if (selectedRooms === 100) {
        capacity.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
      } else {
        capacity.setCustomValidity(``);
      }
      break;

    case 2:
      if (selectedRooms === 100) {
        capacity.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
      } else if (selectedRooms < 2) {
        capacity.setCustomValidity(CUSTOM_MESSAGES_ROOMS.manyPeople);
      } else {
        capacity.setCustomValidity(``);
      }
      break;

    case 3:
      if (selectedRooms === 100) {
        capacity.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
      } else if (selectedRooms < 3) {
        capacity.setCustomValidity(CUSTOM_MESSAGES_ROOMS.manyPeople);
      } else {
        capacity.setCustomValidity(``);
      }
      break;

    case 0:
      if (selectedRooms !== 100) {
        capacity.setCustomValidity(CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      } else {
        capacity.setCustomValidity(``);
      }
      break;
  }

  capacity.reportValidity();
};

capacity.addEventListener(`change`, () => {
  capacityChangeHandler();
});
