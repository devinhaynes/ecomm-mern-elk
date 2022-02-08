import Hapi from "@hapi/hapi";
import { string } from "joi";
import Mongoose from "mongoose";

const PORT = process.env.ECOMM_API_PORT || 3001;
const HOST = process.env.ECOMM_API_HOST || "0.0.0.0";
const MONGO_HOST = process.env.ECOMM_MONGO_HOST || "db";

const ProductSchema = new Mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

interface ITemplateProductArgs {
  product_name: string;
  product_desc: string;
}

interface ITemplateProduct {
  name: string;
  description: string;
  price: number;
  purgable: boolean;
}

let templateProduct = ({
  product_name,
  product_desc,
}: ITemplateProductArgs): ITemplateProduct => {
  return {
    name: product_name,
    description: product_desc,
    price: parseFloat(
      (Math.floor(Math.random() * 1000) + Math.random()).toFixed(2)
    ),
    purgable: true,
  };
};

const ProductModel = Mongoose.model("product", ProductSchema);

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
    routes: {
      cors: true,
    },
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

  server.route({
    method: "PUT",
    path: "/generate-products",
    handler: async (request, h) => {
      try {
        const test_products = [];
        for (let i = 1; i <= 10; i++) {
          test_products.push(
            templateProduct({
              product_name: `Test Product ${i}`,
              product_desc: `Product number ${i}`,
            })
          );
        }
        const result = await ProductModel.insertMany(test_products);
        return h.response(result).code(201);
      } catch (e) {
        return h.response({ error: e }).code(500);
      }
    },
  });

  server.route({
    method: "DELETE",
    path: "/test-products",
    handler: async (request, h) => {
      try {
        const test_products = await ProductModel.deleteMany({ purgable: true });
        return h.response(test_products).code(201);
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
