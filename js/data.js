'use strict';

(() => {
  const similarObjects = [];

  const prepareSimilarObjects = () => {
    window.load.download((objects) => {
      const objectsShort = objects.slice(0, window.constants.PIN_ITEMS);

      objectsShort.forEach((elem) => {
        elem.id = `${elem.location.x}${elem.location.y}`;
        similarObjects.push(elem);
      });
    });
  };

  window.data = {
    prepareSimilarObjects,
    similarObjects
  };
})();
