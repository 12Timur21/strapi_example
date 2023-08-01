'use strict';

/**
 * A set of functions called "actions" for `example`
 */

module.exports = {
  findAllCakesWithName: async (ctx, next) => {
    const { cakeName } = ctx.request.query;

    try {
         const data = await strapi
           .service("api::example.example")
           .findAllCakesWithName(cakeName);

          console.log(data, "data");

          ctx.body = data;
        } catch (err) {
          ctx.badRequest("Post report controller error", { moreDetails: err });
        }
   },
   deleteCake: async (ctx, next) => {
    const { cakeName } = ctx.request.query;

    try {
         const data = await strapi
           .service("api::example.example")
           .deleteCake(cakeName);

          console.log(data, "data");

          ctx.body = {
            isSuccess: true,
          };
        } catch (err) {
          ctx.badRequest("Post report controller error", { moreDetails: err });
        }
   },
   insertCake: async (ctx, next) => {
    const cake = ctx.request.body;

    try {
         await strapi
           .service("api::example.example")
           .insertCake(cake);

          ctx.body = {
            isSuccess: true,
          };
        } catch (err) {
          ctx.badRequest("Post report controller error", { moreDetails: err });
        }
   },
};
