export default {
  routes: [
    {
      method: 'POST',
      path: '/drinks/swap-sort-weight',
      handler: 'drink.swapSortWeight',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/drinks/:id/promote-sort-weight',
      handler: 'drink.promoteSortWeight',
      config: {
        policies: [],
      },
    },
  ],
};
