import Hapi from "@hapi/hapi";
import Mongoose from "mongoose";

const PORT = process.env.ECOMM_API_PORT || 3001;
const HOST = process.env.ECOMM_API_HOST || "0.0.0.0";
const MONGO_HOST = process.env.ECOMM_MONGO_HOST || "db";

const ProductSchema = new Mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const ProductModel = Mongoose.model("product", ProductSchema);

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

  server.route({
    method: ["GET", "POST", "DELETE"],
    path: "/products",
    handler: async (request, h) => {
      try {
        switch (request.method) {
          case "get":
            const products = await ProductModel.find();
            return h.response(products).code(201);
          case "post":
            const new_product = new ProductModel(request.payload);
            await new_product
              .save()
              .then((result: any) => {
                return h.response(result).code(201);
              })
              .catch((e: any) => {
                return h.response({ error: e }).code(500);
              });

          case "delete":
            return h.response("Deleting Product").code(201);
          default:
            return h.response("Unable to process request").code(401);
        }
      } catch (e) {
        return h.response({ error: e }).code(500);
      }
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

  await server
    .start()
    .then(() => console.log(`API Server running on port ${PORT}`))
    .catch(() => console.log("Unable to connect to server"));

  Mongoose.connect(`mongodb://${MONGO_HOST}:27017`)
    .then(() => console.log(`Connected to DB`))
    .catch(() => console.log("Unable to connect to DB"));
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
