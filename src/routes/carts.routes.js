import {Router} from "express";
import { isUserRole } from "../middlewares/auth.js";
import {CartsController} from "../controllers/carts.controller.js";

//servicio
// const cartManager = new CartManagerFile("carts.json");
// const productManager = new ProductManagerFile("products.json");

const router = Router();

//agregar carrito
router.post("/",isUserRole,CartsController.createCart);

//ruta para listar todos los productos de un carrito
router.get("/:cid",CartsController.getOneCartById);

//ruta para agregar un producto al carrito
router.post("/:cid/product/:pid",CartsController.addOneProductToOneCart);

//ruta para eliminar un producto del carrito
router.delete("/:cid/product/:pid",CartsController.deleteOneProductToOneCart);

//ruta para actualizar todos los productos de un carrito.
router.put("/:cid",CartsController.updateOneCart);


//ruta para actualizar cantidad de un producto en el carrito
router.put("/:cid",CartsController.updateQuantityToOneCart);

//ruta para actualizar la cantidad de un producto en el carrito
router.put("/:cid/product/:pid",CartsController.updateProductQuantityToOneCart);

//ruta para eliminar todos los productos del carrito
router.delete("/:cid",CartsController.deleteAllProductsFromCart);

export {router as cartsRouter};