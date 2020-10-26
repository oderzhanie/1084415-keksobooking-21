'use strict';

(() => {
  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const uploadErrorHandler = () => {
    const createErrorMessageTemplate = () => {
      const errorMessageTemplate = document.querySelector(`#error`).content;
      const errorMessageFragment = document.createDocumentFragment();

      const clonedErrorMessage = errorMessageTemplate.cloneNode(true);
      errorMessageFragment.appendChild(clonedErrorMessage);

      return errorMessageFragment;
    };

    const errorMessageTemplate = createErrorMessageTemplate();
    const mainSection = document.querySelector(`main`);
    mainSection.insertBefore(errorMessageTemplate, window.map.map);

    const errorMessageContainer = mainSection.querySelector(`.error`);
    const errorMessage = errorMessageContainer.querySelector(`.error__message`);
    const closeErrorButton = errorMessage.querySelector(`.error__button`);

    const errorCloseHandler = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();

        errorMessageContainer.remove();
        document.removeEventListener(`keydown`, errorCloseHandler);
      }
    };

    document.addEventListener(`keydown`, errorCloseHandler);

    errorMessageContainer.addEventListener(`click`, (evt) => {
      if (evt.target === errorMessage) {
        return;
      }
      errorMessageContainer.remove();
    });

    closeErrorButton.addEventListener(`click`, () => {
      errorMessageContainer.remove();
    });
  };

  window.error = {
    errorHandler,
    uploadErrorHandler
  };
})();
