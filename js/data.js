'use strict';

(() => {
  const similarObjects = [];
  const errorHandler = window.error.errorHandler;

  const prepareSimilarObjects = (cb) => {
    window.load.download((objects) => {

      objects.map((elem) => {
        if (elem.offer) {
          elem.id = `${elem.location.x}${elem.location.y}`;
          similarObjects.push(elem);
        }
      });

      cb();
    }, errorHandler);
  };

  window.data = {
    prepareSimilarObjects,
    similarObjects
  };
})();
