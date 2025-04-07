export default {
  routes: [
    {
      method: 'POST',
      path: '/foods/swap-sort-weight',
      handler: 'food.swapSortWeight',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/foods/:id/promote-sort-weight',
      handler: 'food.promoteSortWeight',
      config: {
        policies: [],
      },
    },
  ],
};
