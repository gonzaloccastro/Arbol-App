import {Router} from "express";
import {ProductManagerMongo} from "../daos/managers/productManagerMongo.js";
import {ProductModel} from "../daos/models/product.model.js";
import { CartManagerMongo } from "../daos/managers/cartManagerMongo.js";
import { CartModel } from "../daos/models/cart.model.js";

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

router.get("/forgot-password",(req,res)=>{
    res.render("forgotPassword")
});

router.get("/restart-password",(req,res)=>{
    const token = req.query.token;
    res.render("resetPassword", {token});
});

export {router as webRouter}