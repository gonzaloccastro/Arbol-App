import {Router} from "express";
import {ProductManagerMongo} from "../daos/managers/productManagerMongo.js";
import {ProductModel} from "../daos/models/product.model.js";
import { CartManagerMongo } from "../daos/managers/cartManagerMongo.js";
import { CartModel } from "../daos/models/cart.model.js";
import {isUserRole} from "../middlewares/auth.js"

const router = Router();

const productManager = new ProductManagerMongo(ProductModel);
const cartManager = new CartManagerMongo(CartModel);

import { WebController } from "../controllers/web.controller.js";


router.get("/",WebController.renderChat);

router.get("/products",WebController.renderAllProducts);

router.get("/products/:pid",WebController.renderOneProduct);

router.get("/cart/:cid",WebController.renderCartDetail);

router.get("/signup",WebController.renderSignup);

router.get("/login",WebController.renderLogin);

export {router as webRouter}