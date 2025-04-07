export default {
  routes: [
    {
      method: 'POST',
      path: '/merchs/swap-sort-weight',
      handler: 'merch.swapSortWeight',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/merchs/:id/promote-sort-weight',
      handler: 'merch.promoteSortWeight',
      config: {
        policies: [],
      },
    },
  ],
};
