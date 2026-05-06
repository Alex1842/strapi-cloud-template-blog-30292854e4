'use strict';

const bootstrap = require("./bootstrap");

module.exports = {
  register({ strapi }) {
    strapi.customFields.register({
      name: "css-editor",
      type: "text",
    });
  },

  bootstrap,
};