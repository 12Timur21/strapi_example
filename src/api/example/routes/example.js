module.exports = {
  routes: [
     {
      method: 'GET',
      path: '/example',
      handler: 'example.findAllCakesWithName',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'DELETE',
      path: '/example',
      handler: 'example.deleteCake',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'POST',
      path: '/example',
      handler: 'example.insertCake',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
