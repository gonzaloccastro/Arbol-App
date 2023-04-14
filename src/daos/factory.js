import { options } from "../config/options.js";

let productDao;
let cartDao;

switch (options.server.persistence) {
    case "mongo":
        ///solamente cuando se use mongo conectamos la base de datos
        await import("../config/dbConnection.js");
        //importar los managers
        const {ProductManagerMongo} = await import("./managers/productManagerMongo.js");
        const {ProductModel} = await import("./models/product.model.js");
        productDao = new ProductManagerMongo(ProductModel);
        const {CartManagerMongo} = await import("./managers/cartManagerMongo.js");
        const {CartModel} = await import("./models/cart.model.js");
        cartDao = new CartManagerMongo(CartModel);
        break;

    case "fileSystem":
        const {ProductManagerFile} = await import("./managers/productManagerFile.js");
        productDao = new ProductManagerFile(options.fileSystem.productsFileName);
        const {CartManagerFile} = await import("./managers/cartManagerFile.js");
        cartDao = new CartManagerFile(CartModel);
        break;
}

export {productDao, cartDao};