// import { CartManagerFile } from "../daos/managers/cartManagerFile.js";
// import { ProductManagerFile } from "../daos/managers/productManagerFile.js";

import { cartDao } from "../daos/factory.js";
const cartManager = cartDao;

import { productDao } from "../daos/factory.js";
import { ProductRepository } from "../daos/repository/product.repository.js";
import { ProductController } from "./products.controller.js";
const productManager = productDao;

import {AdminRole,UsuarioRole} from "../constants/api.js";


class CartsController{

    static async getCarts(req,res){
        try {
            const carts = await cartManager.getCarts();
            res.json({status:"success", result:carts, message:"carts"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }
    };

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
            const cart = await cartManager.getCartById(cartId)
            const data = {
                ...cart,
            }
            res.render("cartDetail", data);
                } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }

    };

    static async renderOneCartById(req,res){
        try {
            const cartId = req.params.cid;
            //obtenemos el carrito
            const cart = await cartManager.getCartById(cartId);
            const data = {
                products:cart.result.products,
            }
            res.json({status:"success", result:cart});
            res.render("cartDetails",data);
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }

    };




    static async addOneProductToCart(req,res){
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cart = await cartManager.getCartById(cartId);
            // console.log("cart: ", cart);
            const product = await productManager.getProductById(productId);
            // console.log("product: ", product);
            if(true){
                // lo dejamos que agregue el producto
                const cartUpdated = await cartManager.addProductToCart(cartId, productId);
                res.json({status:"success", result:cartUpdated, message:"product added"});
            } else {
                res.json({status:"error", message:"No tienes permisos para agregar este producto"});
            }
            
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


    static async deleteCart(req,res){
        try {
            const cartId = req.params.cid;
            const cart = await cartManager.getCartById(cartId);
            const response = await cartManager.deleteFullCart(cartId);
            res.json({status:"success", result: response, message:"carrito eliminado"});
        } catch (error) {
            res.status(400).json({status:"error", error:error.message});
        }

    };
    

    static async purchase(req,res) {
        try {
            const cartId = req.params.cid;
            const carrito = await cartManager.getCartById(cartId);

            let hayStockDisponible = true;

            console.log(carrito.products.length)            

            for (let i = 0; i < carrito.products.length; i++) {

                const producto = carrito[i];
                const cantidad = producto.stock;

                const productoEnDB = await productManager.updateProduct(
                { _id: producto.id, stock: { $gte: cantidad } },
                { $inc: { stock: -cantidad } },
                { returnOriginal: false }
                );
                
                if (!productoEnDB) {
                hayStockDisponible = false;
                alert(`No hay suficiente stock para el producto ${producto.title}`);
                break;
                }
            }
            
            if (hayStockDisponible) {
                console.log("Todos los productos tienen suficiente stock, continuar con el proceso de compra") 
                res.json({status:"success"});            
            } else {
                res.json({status:"No todos los productos tienen stock"});            
            }
            } catch (error) {
            console.log(error);
            }
    }

}

export {CartsController};