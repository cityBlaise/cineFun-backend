import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export default (host, app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "cineFun API",
        version: "1.0.0",
        description:
          "An API providing informations about moivies, series and TV-shows documented with Swagger",
        license: {
          name: "MIT LICENCE",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Blaise Nkwanhou Sitchi",
          email: "sitchinkwanhou@gmail.com",
        },
      },
      servers: [
        {
          url: `${host}`,
        },
      ],
    },
    apis: ["./routers/*.js","./swagger-documentation/*.description.js"],
  };

  const specs = swaggerJsdoc(options);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
};

// {
//     customCssUrl:
//       "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
//   }