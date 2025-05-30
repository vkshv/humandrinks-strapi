export default {
  routes: [
    {
      method: 'GET',
      path: '/visitors/extended-data',
      handler: 'visitor.extendedData',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
