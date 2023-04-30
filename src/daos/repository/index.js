import {ProductRepository} from "./product.repository.js";
import {productDao,cartDao, userDao} from "../factory.js";
import {UserRepository} from"./user.respository.js"

import {CartsRepository} from "./carts.repository.js";
// import {UserManagerMongo} from "../managers/userManagerMongo.js"
// import {UserModel} from "../models/user.model.js"


//const userDao = new UserManagerMongo(UserModel)

export const cartService = new CartsRepository(cartDao);
export const productService = new ProductRepository(productDao);
export const userService = new UserRepository(userDao);