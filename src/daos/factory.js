import { options } from "../config/options.js";

let productDao;
let cartDao;
let userDao;


switch (options.server.persistence) {
    case "mongo":
        ///solamente cuando se use mongo conectamos la base de datos
        await import("../config/dbConnection.js");
        //importar los managers
        const {ProductManagerMongo} = await import("./managers/productManagerMongo.js");
        const {ProductModel} = await import("./models/product.model.js");    
        const {CartManagerMongo} = await import("./managers/cartManagerMongo.js");
        const {CartModel} = await import("./models/cart.model.js");
        const {UserManagerMongo} = await import("./managers/userManagerMongo.js");
        const {UserModel} = await import("./models/user.model.js");
        cartDao = new CartManagerMongo(CartModel);
        productDao = new ProductManagerMongo(ProductModel);
        userDao = new UserManagerMongo(UserModel);
        break;

    case "fileSystem":
        const {ProductManagerFile} = await import("./managers/productManagerFile.js");
        productDao = new ProductManagerFile(options.fileSystem.productsFileName);
        const {CartManagerFile} = await import("./managers/cartManagerFile.js");
        cartDao = new CartManagerFile(CartModel);
        break;
}

export {productDao, cartDao, userDao};