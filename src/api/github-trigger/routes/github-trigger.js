export default {
  routes: [
    {
      method: 'POST',
      path: '/github-trigger',
      handler: 'github-trigger.trigger',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
