/**
 * drink controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::drink.drink', ({ strapi }) => ({
  async create(ctx) {
    const maxSortWeightEntry = await strapi.db.query('api::drink.drink').findMany({
      select: ['sort_weight'],
      orderBy: { sort_weight: 'desc' },
      limit: 1,
    });

    const maxSortWeight = maxSortWeightEntry.length > 0 ? maxSortWeightEntry[0].sort_weight : 0;

    ctx.request.body.data.sort_weight = +maxSortWeight + 1;

    const response = await super.create(ctx);
    return response;
  },

  async swapSortWeight(ctx) {
    const { items } = ctx.request.body; // [{ id: 1, sort_weight: 1 }, { id: 2, sort_weight: 2 }]
    
    try {
      const updatePromises = items.map((item) =>
        strapi.db.query('api::drink.drink').update({
          where: { id: item.id },
          data: { sort_weight: item.sort_weight },
        })
      );
      await Promise.all(updatePromises);

      return ctx.send({ message: 'OK' });
    } catch (err) {
      ctx.throw(500, 'Failed');
    }
  },

  async promoteSortWeight(ctx) {
    const { id } = ctx.params;
    if (!id) {
      ctx.throw(400, 'Invalid ID');
    }
  
    const model = 'api::drink.drink';
  
    // Получаем текущий элемент
    const item = await strapi.db.query(model).findOne({
      where: { id: Number(id) }, // Приведение к числу на случай строки
      select: ['sort_weight'],
    });
  
    if (!item) {
      ctx.throw(404, 'Item not found');
    }
  
    // Получаем максимальный sort_weight
    const maxItem = await strapi.db.query(model).findMany({
      orderBy: { sort_weight: 'desc' },
      limit: 1,
      select: ['sort_weight'],
    });
    const maxSortWeight = maxItem[0]?.sort_weight || 0;
  
    // Обновляем выбранный элемент
    await strapi.db.query(model).update({
      where: { id: Number(id) },
      data: { sort_weight: +maxSortWeight + 1 },
    });
  
    // Сдвигаем остальные вниз
    await strapi.db.connection.raw(
      `UPDATE drinks SET sort_weight = sort_weight - 1 WHERE sort_weight > ?`,
      [item.sort_weight]
    );
  
    return ctx.send({ message: 'OK' });
  }
}));
