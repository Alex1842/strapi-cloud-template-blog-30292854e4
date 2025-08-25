'use strict';

/**
 * teszt service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::teszt.teszt');
