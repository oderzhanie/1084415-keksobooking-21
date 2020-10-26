'use strict';

(() => {
  const deactivatePage = () => {
    window.map.deactivateMap();
    window.form.clearForm();
    window.form.deactivateForm();
  };

  const uploadSuccessHandler = () => {
    const createSuccessMessageTemplate = () => {
      const successMessageTemplate = document.querySelector(`#success`).content;
      const successMessageFragment = document.createDocumentFragment();

      const clonedSuccessMessage = successMessageTemplate.cloneNode(true);
      successMessageFragment.appendChild(clonedSuccessMessage);

      return successMessageFragment;
    };

    const successMessageTemplate = createSuccessMessageTemplate();
    const mainSection = document.querySelector(`main`);
    mainSection.insertBefore(successMessageTemplate, window.map.map);
    deactivatePage();

    const successMessage = document.querySelector(`.success__message`);
    const successMessageContainer = document.querySelector(`.success`);

    const successCloseHandler = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        successMessageContainer.remove();
        document.removeEventListener(`keydown`, successCloseHandler);
      }
    };

    successMessageContainer.addEventListener(`click`, (evt) => {
      if (evt.target === successMessage) {
        return;
      }
      successMessageContainer.remove();
    });

    document.addEventListener(`keydown`, successCloseHandler);
  };

  window.success = {
    uploadSuccessHandler
  };
})();
