const { watch, src, dest } = require("gulp");
const concat = require("gulp-concat");
// const uglify = require("gulp-uglify");
// .pipe(uglify())

const defaultPath = "./src/js/modules/";

const concatAll = () => {
  return src([
    `${defaultPath}urlParams.js`,
    // `${defaultPath}variables.js`,
    // `${defaultPath}setDataLayer.js`,
    `${defaultPath}toggleButton.js`,
    `${defaultPath}handleProduct/domElements.js`,
    `${defaultPath}handleProduct/fetchProduct.js`,
    `${defaultPath}handleProduct/tshirtProduct.js`,
    `${defaultPath}handleProduct/stockFunctions.js`,
    `${defaultPath}handleProduct/normalProduct.js`,
    `${defaultPath}handleProduct/handleProduct.js`,
    `${defaultPath}postApi.js`,
    `${defaultPath}buy.js`,
    `${defaultPath}noThanks.js`,
    `${defaultPath}main.js`,
  ])
    .pipe(concat("scripts.js"))
    .pipe(dest("./src/js/"));
};

const watchAll = () => {
  watch([`${defaultPath}*.js`, `${defaultPath}handleProduct/*.js`], concatAll);
};

const defaultTask = (cb) => {
  watchAll();
};

exports.default = defaultTask;
