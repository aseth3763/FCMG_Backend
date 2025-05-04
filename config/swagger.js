const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FMCG App API",
      version: "1.0.0",
      description: "API documentation for the FMCG challenge project",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./docs/*.yaml"], // or wherever your YAML files are
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
