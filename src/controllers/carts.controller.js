// import { CartManagerFile } from "../daos/managers/cartManagerFile.js";
// import { ProductManagerFile } from "../daos/managers/productManagerFile.js";

import { cartDao } from "../daos/factory.js";
const cartManager = cartDao;

import {purchaseEmail} from "../config/messages/gmail.js"
import { TicketModel } from "../daos/models/ticket.model.js";
import {generateTicketCode, calculateTotalAmount} from "../utils.js"
import { productDao } from "../daos/factory.js";
import { ProductRepository } from "../daos/repository/product.repository.js";
import { ProductController } from "./products.controller.js";
const productManager = productDao;

import {PremiumRole,UsuarioRole} from "../constants/api.js";


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
            const userId = req.user._id;
            if (req.user.rol === PremiumRole && product.owner === userId) {
                // Usuario Premium y propietario del producto, no permitir la compra
                res.json({ status: "error", message: "No tienes permisos para agregar este producto" });
            } else {
                // Permitir agregar el producto al carrito
                const cartUpdated = await cartManager.addProductToCart(cartId, productId);
                res.json({ status: "success", result: cartUpdated, message: "product added" });
            }
        } catch (error) {
            res.status(400).json({ status: "error", error: error.message });
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
            console.log("id del carrito",cartId)
            console.log("carrito",carrito)

            const iteration = carrito.products.length;
            console.log(iteration)            

            for (let i = 0; i < iteration; i++) {
                const producto = carrito.products[i];
                const cantidad = producto.quantity;
                const itemId = producto.id._id;

                const productoEnDB = await productManager.updateProduct(
                    { _id: itemId },
                    { $inc: { stock: -cantidad } },
                    { returnOriginal: false }
                  );
                
                  if (!productoEnDB) {
                    hayStockDisponible = false;
                    res.json({ status: "error", message: `No hay suficiente stock para el producto ${producto.title}` });
                    break;
                  }
            }
            console.log("llegue hasta acá")
            if (hayStockDisponible) {
                const ticketData = {
                  code: generateTicketCode(),
                  amount: calculateTotalAmount(carrito.products),
                  purchaser: req.user._id,
                };
              
                const ticket = new TicketModel(ticketData);
                await ticket.save();
              
                console.log("Ticket creado:", ticket);
              
                const emailData = {
                  products: carrito.products,
                  amount: ticketData.amount,
                };
                await purchaseEmail(req.user.email, emailData);
                res.json({status:"success", message:"compra completada"});
            } else {
                res.json({ status: "No todos los productos tienen stock" });
              }
            } catch (error) {
            console.log(error);
            }
    }

    static generateTicketCode() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let code = "";
      
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
        return code;
    };
      
    static calculateTotalAmount(products) {
        let total = 0;
      
        for (const product of products) {
          const price = product.id.price;
          const quantity = product.quantity;
          total += price * quantity;
        }
      
        return total;
    };

}

export {CartsController};