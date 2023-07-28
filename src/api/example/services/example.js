'use strict';

/**
 * example service
 */

module.exports = () => ({
  //cakeName мы передали при вызове strapi.service("api::example.example").findAllCakesWithName(cakeName);
  findAllCakesWithName: async (cakeName) => {
      try {
        //Пример запроса для получения количества записей
        const cakeCount = await strapi.entityService.count("api::order.order"); // 2

        //Берём все записи, которые лежат в order таблице по фильтру
        const entries = await strapi.db.query("api::order.order").findMany(
          {
            //Фильтруем запрос по имени торта
            where: {
              title: {
                $eqi: cakeName
              },         
            },
          }
        );

        // Перебираем все варианты из ответа и формируем массив понятных нам моделей
        let entriesReduced;
        if (entries && Array.isArray(entries)) {
          entriesReduced = entries.reduce((acc, item) => {
            acc = acc || [];

            //Тут мы создаём модель {title, description}, которая будет приходить
            acc.push({
              title: item.title || "",
              description: item.description || "",
            });
            return acc;
          }, []);
        }

        return entriesReduced;
      } catch (err) {
        return err;
      }
    },

    deleteCake: async (cakeName) => {
      try {
       await strapi.db.connection.raw(
          `DELETE FROM ORDERS WHERE title = \'${cakeName}\'`
        );

      } catch (err) {
        return err;
      }
    },

    insertCake: async (cake) => {
      try {
        //Просто пример, но вы можете делать вставку другим способом
        await strapi.db.connection.raw(
          `INSERT INTO ORDERS (title, description) VALUES (
            \'${cake['title']}\', 
            \'${cake['description']}\'
          );`
        );      

  
      } catch (err) {
        return err;
      }
    },
 });
