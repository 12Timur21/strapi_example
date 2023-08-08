'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    if (strapi.plugin('documentation')) {
      const override = {
        // Only run this override for version 1.0.0
        info: { version: '1.0.0' },
        paths: {
          "/example": {
            get: {
              responses: {
                200: {
                  "description": "OK",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "array", 
                        "$ref": "#/components/schemas/Cake"
                      }
                    }
                  }
                  
                  //Лучше генерировать content-type через yarn strapi generate и использовать его как $ref, т.к. тогда мы во Flutter _api.get будем получать объект с полями, а не просто dynamic
                  // "content": {
                  //   "application/json": {
                  //     "schema": {
                  //       "attributes": {
                  //         "title": {
                  //           "type": "string"
                  //         },
                  //         "description": {
                  //           "type": "string"
                  //         },
                  //         "test": {
                  //           "isActive": "boolean"
                  //         }
                  //       }
                  //     }
                  //   }
                  // }
                },
                400: {
                  "description": "Bad Request",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                401: {
                  "description": "Unauthorized",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                403: {
                  "description": "Forbidden",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                404: {
                  "description": "Not Found",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                500: {
                  "description": "Internal Server Error",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                }
              },
              "tags": [
                "Example"
              ],
              //Тут я указываю какие данные нужно передавать в parameters для успешного запроса в controllers > example ( const { cakeName } = ctx.request.query;)
              "parameters": [
              {
                "in": "query",
                "name": "cakeName",
                "required": true,
                "description": "Search by cakeName",
                "example": "AppleCake",
                "schema": {
                    "type": "string",
                }
              },
              // {
              //   "in": "query",
              //   "name": "cakeDescription",
              //   "required": true,
              //   "description": "Search by cakeDescription",
              //   "example": "Cake with apples",
              //   "schema": {
              //       "type": "string",
              //   }
              // },
              // ...
            ],
            "operationId": "get/example"
            },
            delete: {
              responses: {
                200: {
                  "description": "Success",
                  "content": {
                    "application/json": {
                      "schema": {
                        "attributes": {
                          "isSuccess": {
                            "type": "boolean"
                          },                         
                        }
                      }
                    }
                  }
                },
                400: {
                  "description": "Bad Request",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                401: {
                  "description": "Unauthorized",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                403: {
                  "description": "Forbidden",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                404: {
                  "description": "Not Found",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                },
                500: {
                  "description": "Internal Server Error",
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/components/schemas/Error"
                      }
                    }
                  }
                }
              },
              "tags": [
                "Example"
              ],
              "parameters": [
              {
                "in": "query",
                "name": "cakeName",
                "required": true,
                "description": "Delete cake data by cakeName",
                "example": "AppleCake",
                "schema": {
                    "type": "string",
                },
              },
            ],
              "operationId": "delete/example"
            },
            post: {
                responses: {
                  200: {
                    "description": "Success",
                    "content": {
                      "application/json": {
                        "schema": {
                          "attributes": {
                            "isSuccess": {
                              "type": "boolean"
                            },                         
                          }
                        }
                      }
                    }
                  },
                  400: {
                    "description": "Bad Request",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Error"
                        }
                      }
                    }
                  },
                  401: {
                    "description": "Unauthorized",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Error"
                        }
                      }
                    }
                  },
                  403: {
                    "description": "Forbidden",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Error"
                        }
                      }
                    }
                  },
                  404: {
                    "description": "Not Found",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Error"
                        }
                      }
                    }
                  },
                  500: {
                    "description": "Internal Server Error",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/Error"
                        }
                      }
                    }
                  }
                },
                "tags": [
                  "Example"
                ],
                "parameters": [],
                "operationId": "post/example",
                //Тут я указываю какие данные нужно передавать в body для успешного запроса в controllers > example (const cake = ctx.request.body;)
                "requestBody": {
                  "required": true,
                  "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "cakeName": {
                                    "type": "string"
                                },
                                "cakeDescription": {
                                    "type": "string"
                                }                           
                            }
                        }
                    }
                  }
                }
            }
          }
        }
      }

      strapi
        .plugin('documentation')
        .service('override')
        .registerOverride(override, {
          // Specify the origin in case the user does not want this plugin documented
          // pluginOrigin: 'upload',
          // The override provides everything don't generate anything
          // excludeFromGeneration: ['upload'],
        });
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
   
   
  },
};
