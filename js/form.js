'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = Array.from(adForm.children);

  const deactivateForm = () => {
    adFormFieldsets.forEach((child) => {
      child.setAttribute(`disabled`, ``);
    });

    if (!adForm.classList.contains(`ad-form--disabled`)) {
      adForm.classList.add(`ad-form--disabled`);
    }
  };

  deactivateForm();

  const addressField = adForm.querySelector(`#address`);
  addressField.setAttribute(`readonly`, ``);
  addressField.value = window.pin.getPinCoords();

  const activateForm = () => {
    adForm.classList.remove(`ad-form--disabled`);

    adFormFieldsets.forEach((child) => {
      child.removeAttribute(`disabled`, ``);
    });

    const accType = accomodationType.value;
    price.placeholder = window.constants.MIN_PRICES[accType];
  };

  const titleInput = adForm.querySelector(`#title`);
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
          roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
        } else if (selectedCapacity > 1) {
          roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.fewRooms);
        } else {
          roomsNumber.setCustomValidity(``);
        }
        break;

      case 2:
        if (selectedCapacity === 0) {
          roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
        } else if (selectedCapacity > 2) {
          roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.fewRooms);
        } else {
          roomsNumber.setCustomValidity(``);
        }
        break;

      case 3:
        if (selectedCapacity === 0) {
          roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
        } else {
          roomsNumber.setCustomValidity(``);
        }
        break;

      case 100:
        if (selectedCapacity > 0) {
          roomsNumber.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
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
          capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
        } else {
          capacity.setCustomValidity(``);
        }
        break;

      case 2:
        if (selectedRooms === 100) {
          capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
        } else if (selectedRooms < 2) {
          capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.manyPeople);
        } else {
          capacity.setCustomValidity(``);
        }
        break;

      case 3:
        if (selectedRooms === 100) {
          capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialRooms);
        } else if (selectedRooms < 3) {
          capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.manyPeople);
        } else {
          capacity.setCustomValidity(``);
        }
        break;

      case 0:
        if (selectedRooms !== 100) {
          capacity.setCustomValidity(window.constants.CUSTOM_MESSAGES_ROOMS.nonResidentialGuests);
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

  const price = adForm.querySelector(`#price`);
  const accomodationType = adForm.querySelector(`#type`);

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

  const checkInTime = adForm.querySelector(`#timein`);
  const checkOutTime = adForm.querySelector(`#timeout`);

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

  const avatarField = adForm.querySelector(`#avatar`);
  avatarField.addEventListener(`input`, () => {
    checkImages(avatarField);
  });

  const imagesField = adForm.querySelector(`#images`);
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
    addressField.setAttribute(`value`, window.pin.getPinCoords());

    const accType = accomodationType.value;
    price.placeholder = window.constants.MIN_PRICES[accType];
  };

  const clearButton = adForm.querySelector(`.ad-form__reset`);
  clearButton.addEventListener(`click`, () => {
    clearForm();
  });

  window.form = {
    activateForm,
    deactivateForm,
    clearForm,
    addressField
  };
})();
