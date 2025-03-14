import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "How Do I Look API",
      version: "1.0.0",
      description: "Curating API 문서",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "개발 서버",
      },
    ],
  },

  apis: ["./src/routes/*.js", "./src/swagger/*.yaml"],
};

const specs = swaggerJsdoc(options);

export default specs;
