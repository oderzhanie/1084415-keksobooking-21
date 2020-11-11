'use strict';

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

const getUniqueEl = (arr) => {
  const randomEl = arr.splice(getRandomNumber(0, arr.length - 1), 1)[0];
  return randomEl;
};

window.utils = {
  getRandomNumber,
  getRandomIndex,
  getRandomItem,
  getRandomArray,
  generateIndices,
  getUniqueEl
};
