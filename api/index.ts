import Hapi from "@hapi/hapi";

const PORT = process.env.ECOMM_API_PORT || 3001;
const HOST = process.env.ECOMM_API_HOST || "localhost";

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello from Hapi";
    },
  });

  // 404 Handling
  server.route({
    method: "*",
    path: "/{any*}",
    handler: function (request, h) {
      return "404 Error! Page Not Found!";
    },
  });

  await server.start();
  console.log(`API Server running on port ${PORT}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
