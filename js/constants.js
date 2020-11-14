'use strict';

const INACTIVE_PIN_WIDTH_HALF = 20;
const INACTIVE_PIN_HEIGHT_HALF = 22;
const PIN_WIDTH_HALF = 32;
const PIN_HEIGHT = 40;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const PIN_ITEMS = 5;

const Accommodation = {
  PALACE: `palace`,
  FLAT: `flat`,
  HOUSE: `house`,
  BUNGALOW: `bungalow`
};

const MIN_PRICES = {
  [Accommodation.FLAT]: 1000,
  [Accommodation.BUNGALOW]: 0,
  [Accommodation.HOUSE]: 5000,
  [Accommodation.PALACE]: 10000
};

const OFFER_TYPES_TITLES = {
  [Accommodation.FLAT]: `Квартира`,
  [Accommodation.BUNGALOW]: `Бунгало`,
  [Accommodation.HOUSE]: `Дом`,
  [Accommodation.PALACE]: `Дворец`
};

const OFFER_TYPES_TITLES_GENITIVE = {
  [Accommodation.FLAT]: `квартиры`,
  [Accommodation.HOUSE]: `дома`,
  [Accommodation.PALACE]: `дворца`
};

const CUSTOM_MESSAGES_ROOMS = {
  manyPeople: `Число людей не может быть больше количества комнат`,
  fewRooms: `Число комнат не может быть меньше количества людей`,
  nonResidentialRooms: `Вариант "100 комнат" можно выбрать только не для гостей`,
  nonResidentialGuests: `Не для гостей можно выбрать только вариант "100 комнат"`
};

const FILTER_PRICES = {
  LOW: 10000,
  MIDDLE: 50000
};


window.constants = {
  INACTIVE_PIN_WIDTH_HALF,
  INACTIVE_PIN_HEIGHT_HALF,
  PIN_WIDTH_HALF,
  PIN_HEIGHT,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_PRICE,
  PIN_ITEMS,
  Accommodation,
  MIN_PRICES,
  OFFER_TYPES_TITLES,
  OFFER_TYPES_TITLES_GENITIVE,
  CUSTOM_MESSAGES_ROOMS,
  FILTER_PRICES
};

