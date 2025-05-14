/**
 * utm controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::utm.utm', ({ strapi }) => ({
  async incrementSource(ctx) {
    const { source } = ctx.request.body;

    if (!source || typeof source !== 'string') {
      return ctx.badRequest('Missing or invalid "source" in request body.');
    }

    const utmEntry = await strapi.entityService.findOne('api::utm.utm', 1);

    if (!utmEntry) {
      return ctx.badRequest('UTM entry not found. Please create it in the admin panel.');
    }

    const statistics = utmEntry.Statistics || {};

    const currentValue = statistics[source] || 0;
    statistics[source] = currentValue + 1;

    const updatedEntry = await strapi.entityService.update('api::utm.utm', 1, {
      data: { Statistics: statistics },
    });

    return updatedEntry;
  },
}));
