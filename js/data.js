'use strict';

(() => {
  const clientWidth = document.querySelector(`.map__pins`).clientWidth;
  const pinItems = 8;
  const indices = window.utils.generateIndices(pinItems);

  const similarObjects = [];
  const getSimilarObjects = () => {
    for (let i = 0; i < pinItems; i++) {
      const ObjectLocation = {
        x: window.utils.getRandomNumber(0, clientWidth),
        y: window.utils.getRandomNumber(130, 630)
      };
      similarObjects.push({
        id: window.utils.generateId(),
        author: {
          avatar: `img/avatars/user` + window.utils.getUniqueEl(indices) + `.png`
        },
        offer: {
          title: `Заголовок предложения`,
          address: ObjectLocation.x + `, ` + ObjectLocation.y,
          price: window.utils.getRandomNumber(100, 1000),
          type: window.utils.getRandomItem(window.consts.types),
          rooms: window.utils.getRandomNumber(1, 5),
          guests: window.utils.getRandomNumber(1, 10),
          checkin: window.utils.getRandomItem(window.consts.checkTimes),
          checkout: window.utils.getRandomItem(window.consts.checkTimes),
          features: window.utils.getRandomArray(window.consts.features),
          description: `Описание жилья`,
          photos: window.utils.getRandomArray(window.consts.photos)
        },
        location: ObjectLocation
      });
    }
  };

  window.data = {
    getSimilarObjects,
    similarObjects,
    pinItems
  };
})();
