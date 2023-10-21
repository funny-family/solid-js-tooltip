import autoprefixer from 'autoprefixer';

/**
 * @typedef { import('postcss-load-config').Config } PostcssLoadConfig
 */

/** @type {PostcssLoadConfig} */
module.exports = {
  plugins: [autoprefixer()],
};
