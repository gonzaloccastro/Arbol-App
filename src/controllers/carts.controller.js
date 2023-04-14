// import { CartManagerFile } from "../daos/managers/cartManagerFile.js";
// import { ProductManagerFile } from "../daos/managers/productManagerFile.js";

import { cartDao } from "../daos/factory.js";
const cartManager = cartDao;

import { productDao } from "../daos/factory.js";
const productManager = productDao;


class CartsController{


    static async createCart(req,res){
        try {
            const cartAdded = await cartManager.addCart();
            res.json({status:"success", result:cartAdded, message:"cart added"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }

    };

    static async getOneCartById(req,res){
        try {
            const cartId = req.params.cid;
            //obtenemos el carrito
            const cart = await cartManager.getCartById(cartId);
            res.json({status:"success", result:cart});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }

    };

    static async addOneProductToOneCart(req,res){
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cart = await cartManager.getCartById(cartId);
            // console.log("cart: ", cart);
            const product = await productManager.getProductById(productId);
            // console.log("product: ", product);
            const cartUpdated = await cartManager.addProductToCart(cartId, productId);
            res.json({status:"success", result:cartUpdated, message:"product added"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }
    };

    static async deleteOneProductToOneCart(req,res){

        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cart = await cartManager.getCartById(cartId);
            // console.log("cart: ", cart);
            const product = await productManager.getProductById(productId);
            // // console.log("product: ", product);
            const response = await cartManager.deleteProduct(cartId, productId);
            res.json({status:"success", result:response, message:"product deleted"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }

    };


    static async updateOneCart(req,res){
        try {
            const cartId = req.params.cid;
            const products = req.body.products;
            const cart = await cartManager.getCartById(cartId);
            cart.products = [...products];
            const response = await cartManager.updateCart(cartId, cart);
            res.json({status:"success", result:response, message:"cart updated"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }
    };


    static async updateQuantityToOneCart(req,res){
        try {
            const cartId = req.params.cid;
            const products = req.body.products;
            const cart = await cartManager.getCartById(cartId);
            cart.products = [...products];
            const response = await cartManager.updateCart(cartId, cart);
            res.json({status:"success", result:response, message:"cart updated"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }
    };

    static async updateProductQuantityToOneCart(req,res){
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const quantity = req.body.quantity;
            await cartManager.getCartById(cartId);
            await productManager.getProductById(productId);
            const response = await cartManager.updateQuantityInCart(cartId, productId, quantity);
            res.json({status:"success", result: response, message:"producto actualizado"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }
    };


    static async deleteAllProductsFromCart(req,res){

        try {
            const cartId = req.params.cid;
            const cart = await cartManager.getCartById(cartId);
            cart.products=[];
            const response = await cartManager.updateCart(cartId, cart);
            res.json({status:"success", result: response, message:"productos eliminados"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }

    };






}

export {CartsController};