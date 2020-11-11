const path = require("path");

module.exports = {
  entry: [
    "./js/constants.js",
    "./js/utils.js",
    "./js/load.js",
    "./js/error.js",
    "./js/success.js",
    "./js/data.js",
    "./js/debounce.js",
    "./js/render-objects.js",
    "./js/filter.js",
    "./js/map.js",
    "./js/pin.js",
    "./js/move.js",
    "./js/popup.js",
    "./js/image-upload.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
