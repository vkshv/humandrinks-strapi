export default {
  routes: [
    {
      method: 'POST',
      path: '/utm/increment',
      handler: 'utm.incrementSource',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
