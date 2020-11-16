'use strict';

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = Array.from(adForm.children);
const addressField = adForm.querySelector(`#address`);
const {imageUpload} = window.imageUpload;
const avatarInput = adForm.querySelector(`.ad-form-header__input`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const objectInput = adForm.querySelector(`.ad-form__upload input[type=file]`);
const objectPreview = adForm.querySelector(`.ad-form__photo`);
const objectPreviewImg = document.createElement(`img`);
const titleInput = adForm.querySelector(`#title`);
const roomsNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);
const price = adForm.querySelector(`#price`);
const accomodationType = adForm.querySelector(`#type`);
const checkInTime = adForm.querySelector(`#timein`);
const checkOutTime = adForm.querySelector(`#timeout`);
const avatarField = adForm.querySelector(`#avatar`);
const imagesField = adForm.querySelector(`#images`);
const clearButton = adForm.querySelector(`.ad-form__reset`);
const {deactivatePage} = window.success;
const {ROOMS_NUMBER, GUESTS_NUMBER} = window.constants;

const deactivateForm = () => {
  adFormFieldsets.forEach((child) => {
    child.setAttribute(`disabled`, ``);
  });

  if (!adForm.classList.contains(`ad-form--disabled`)) {
    adForm.classList.add(`ad-form--disabled`);
  }
};
deactivateForm();

addressField.setAttribute(`readonly`, ``);
addressField.value = window.pin.getPinCoords();

const activateForm = () => {
  adForm.classList.remove(`ad-form--disabled`);

  adFormFieldsets.forEach((child) => {
    child.removeAttribute(`disabled`);
  });

  const accType = accomodationType.value;
  price.placeholder = window.constants.MIN_PRICES[accType];
};

avatarInput.addEventListener(`change`, () => {
  imageUpload(avatarInput, avatarPreview);
});

objectInput.addEventListener(`change`, () => {
  objectPreviewImg.setAttribute(`style`, `width: 70px; height: 70px;`);
  objectPreview.appendChild(objectPreviewImg);
  imageUpload(objectInput, objectPreviewImg);
});

titleInput.addEventListener(`invalid`, () => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity(`Обязательное поле`);
  }
});

titleInput.addEventListener(`input`, () => {
  let valueLength = titleInput.value.length;

  if (valueLength < window.constants.MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Еще ${window.constants.MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength === window.constants.MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Заголовок должен быть не более 100 символов`);
  } else {
    titleInput.setCustomValidity(``);
  }

  titleInput.reportValidity();
});

const roomsChangeHandler = () => {
  const indexSelectedRooms = roomsNumber.selectedIndex;
  const indexSelectedCapacity = capacity.selectedIndex;

  const selectedRooms = Number(roomsNumber.options[indexSelectedRooms].value);
  const selectedCapacity = Number(capacity.options[indexSelectedCapacity].value);

  switch (selectedRooms) {
    case ROOMS_NUMBER.ONE_ROOM:
      if (selectedCapacity === GUESTS_NUMBER.NO_GUESTS) {
        roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      } else if (selectedCapacity > GUESTS_NUMBER.ONE_GUEST) {
        roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.fewRooms);
      } else {
        roomsNumber.setCustomValidity(``);
      }
      break;

    case ROOMS_NUMBER.TWO_ROOMS:
      if (selectedCapacity === GUESTS_NUMBER.NO_GUESTS) {
        roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      } else if (selectedCapacity > GUESTS_NUMBER.TWO_GUESTS) {
        roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.fewRooms);
      } else {
        roomsNumber.setCustomValidity(``);
      }
      break;

    case ROOMS_NUMBER.THREE_ROOMS:
      if (selectedCapacity === GUESTS_NUMBER.NO_GUESTS) {
        roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      } else {
        roomsNumber.setCustomValidity(``);
      }
      break;

    case ROOMS_NUMBER.NON_RESIDENTIAL:
      if (selectedCapacity === GUESTS_NUMBER.NO_GUESTS) {
        roomsNumber.setCustomValidity(``);
        capacity.setCustomValidity(``);
      } else {
        roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
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
    case GUESTS_NUMBER.ONE_GUEST:
      if (selectedRooms === ROOMS_NUMBER.NON_RESIDENTIAL) {
        capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
      } else {
        capacity.setCustomValidity(``);
      }
      break;

    case GUESTS_NUMBER.TWO_GUESTS:
      if (selectedRooms === ROOMS_NUMBER.NON_RESIDENTIAL) {
        capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
      } else if (selectedRooms < ROOMS_NUMBER.TWO_ROOMS) {
        capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.manyPeople);
      } else {
        capacity.setCustomValidity(``);
      }
      break;

    case GUESTS_NUMBER.THREE_GUESTS:
      if (selectedRooms === ROOMS_NUMBER.NON_RESIDENTIAL) {
        capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
      } else if (selectedRooms < ROOMS_NUMBER.THREE_ROOMS) {
        capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.manyPeople);
      } else {
        capacity.setCustomValidity(``);
      }
      break;

    case GUESTS_NUMBER.NO_GUESTS:
      if (selectedRooms === ROOMS_NUMBER.NON_RESIDENTIAL) {
        capacity.setCustomValidity(``);
        roomsNumber.setCustomValidity(``);
      } else {
        capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
      }
      break;
  }

  capacity.reportValidity();
};

capacity.addEventListener(`change`, () => {
  capacityChangeHandler();
});

const accomodationTypeChangeHandler = () => {
  const accType = accomodationType.value;
  const priceValue = price.value;

  price.placeholder = window.constants.MIN_PRICES[accType];

  if (priceValue < window.constants.MIN_PRICES[accType]) {
    price.setCustomValidity(`Минимальная стоимость для ${window.constants.OFFER_TYPES_TITLES_GENITIVE[accType]} - ${window.constants.MIN_PRICES[accType]} руб.`);
  } else {
    price.setCustomValidity(``);
  }
  price.reportValidity();
};

accomodationType.addEventListener(`change`, accomodationTypeChangeHandler);

price.addEventListener(`invalid`, () => {
  if (price.validity.valueMissing) {
    price.setCustomValidity(`Обязательное поле`);
  }
});

price.addEventListener(`input`, () => {
  const priceValue = price.value;
  const accType = accomodationType.value;

  if (priceValue > window.constants.MAX_PRICE) {
    price.setCustomValidity(`Максимально допустимая стоимость - ${window.constants.MAX_PRICE} руб.`);
  } else if (priceValue < window.constants.MIN_PRICES[accType]) {
    price.setCustomValidity(`Минимальная стоимость для ${window.constants.OFFER_TYPES_TITLES_GENITIVE[accType]} - ${window.constants.MIN_PRICES[accType]} руб.`);
  } else {
    price.setCustomValidity(``);
  }

  price.reportValidity();
});

checkInTime.addEventListener(`change`, () => {
  checkTimeChangeHandler(checkInTime);
});

checkOutTime.addEventListener(`change`, () => {
  checkTimeChangeHandler(checkOutTime);
});

const checkTimeChangeHandler = (activeInput) => {
  const indexSelectedCheckIn = checkInTime.selectedIndex;
  const indexSelectedCheckOut = checkOutTime.selectedIndex;

  let selectedCheckIn = checkInTime.options[indexSelectedCheckIn].value;
  let selectedCheckOut = checkOutTime.options[indexSelectedCheckOut].value;

  if (selectedCheckIn === selectedCheckOut) {
    return;
  }

  if (activeInput === checkOutTime) {
    checkInTime.selectedIndex = checkOutTime.selectedIndex;

    return;
  }

  checkOutTime.selectedIndex = checkInTime.selectedIndex;
};

const checkImages = (imgInput) => {
  if (imgInput.files[0].type.match(`image/png`) || imgInput.files[0].type.match(`image/jpeg`)) {
    imgInput.setCustomValidity(``);
  } else {
    imgInput.setCustomValidity(`Допустимы только изображения с расширениями png, jpeg`);
  }

  imgInput.reportValidity();
};

avatarField.addEventListener(`input`, () => {
  checkImages(avatarField);
});

imagesField.addEventListener(`input`, () => {
  checkImages(imagesField);
});

const submitHandler = (evt) => {
  evt.preventDefault();
  window.load.upload(new FormData(adForm), window.success.uploadSuccessHandler, window.error.uploadErrorHandler);
};
adForm.addEventListener(`submit`, submitHandler);

const clearForm = () => {
  adForm.reset();
  if (objectPreview.hasChildNodes()) {
    objectPreview.removeChild(objectPreviewImg);
  }
  avatarPreview.src = `img/muffin-grey.svg`;
  addressField.setAttribute(`value`, window.pin.getPinCoords());

  const accType = accomodationType.value;
  price.placeholder = window.constants.MIN_PRICES[accType];
};

clearButton.addEventListener(`click`, () => {
  deactivatePage();
});

window.form = {
  activateForm,
  deactivateForm,
  clearForm,
  addressField
};
