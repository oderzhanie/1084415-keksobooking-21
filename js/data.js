'use strict';

(() => {
  const similarObjects = [];
  const errorHandler = window.error.errorHandler;

  const prepareSimilarObjects = () => {
    window.load.download((objects) => {

      objects.map((elem) => {
        elem.id = `${elem.location.x}${elem.location.y}`;
        similarObjects.push(elem);
      });

    }, errorHandler);
  };

  prepareSimilarObjects();

  window.data = {
    // prepareSimilarObjects,
    similarObjects
  };
})();
