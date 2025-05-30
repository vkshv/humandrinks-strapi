/**
 * visitor controller
 */

import { factories } from '@strapi/strapi';

interface ReferralProgram {
  activated: boolean;
  programSlug: string;
  referrerTelegramId: string;
}

interface Visitor {
  id: number;
  telegramId: string;
  referralProgram?: ReferralProgram | null;
}



export default factories.createCoreController('api::visitor.visitor', ({ strapi }) => ({
  async extendedData(ctx) {
    const { telegramId } = ctx.request.query;

    if (!telegramId || typeof telegramId !== 'string') {
      return ctx.badRequest('Missing or invalid telegramId');
    }

    const visitorsRaw = await strapi.entityService.findMany('api::visitor.visitor', {
      filters: { telegramId },
      limit: 1,
      populate: '*',
    });

    if (!visitorsRaw || visitorsRaw.length === 0) {
      return ctx.notFound('Visitor not found');
    }

    const visitor = visitorsRaw[0] as unknown as Visitor;

    const allVisitorsRaw = await strapi.entityService.findMany('api::visitor.visitor', {
      filters: {
        referralProgram: {
          $not: null,
        },
      },
      fields: ['telegramId', 'referralProgram'],
      populate: '*',
      limit: 1000,
    });

    const allVisitors = allVisitorsRaw as unknown as Visitor[];

    const referralsCount = allVisitors.filter((v) =>
      v.referralProgram?.referrerTelegramId === visitor.telegramId
    ).length;

    return {
      ...visitor,
      referralsCount,
    };
  },
}));
