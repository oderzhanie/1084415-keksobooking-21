'use strict';

const imageUpload = (fileInput, preview) => {
  const FILE_TYPES = [`png`, `jpg`, `jpeg`];

  const file = fileInput.files[0];
  const fileType = file.type;

  const matches = FILE_TYPES.some((elem) => {
    return fileType.endsWith(elem);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

};

window.imageUpload = {
  imageUpload
};
