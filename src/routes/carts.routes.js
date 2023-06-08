import {Router} from "express";
import {CartsController} from "../controllers/carts.controller.js";
import {AdminRole,UsuarioRole, PremiumRole} from "../constants/api.js";
import { checkRoles } from "../middlewares/auth.js";

//servicio
// const cartManager = new CartManagerFile("carts.json");
// const productManager = new ProductManagerFile("products.json");

const router = Router();

//levantar carritos
router.get("/",CartsController.getCarts);

//agregar carrito
router.post("/", checkRoles([PremiumRole,UsuarioRole]), CartsController.createCart);

//ruta para listar todos los productos de un carrito
router.get("/:cid",CartsController.getOneCartById);

//ruta para agregar un producto al carrito
router.post("/:cid/product/:pid", checkRoles([PremiumRole,UsuarioRole]), CartsController.addOneProductToCart);

//ruta para eliminar un producto del carrito
router.delete("/:cid/product/:pid",CartsController.deleteOneProductToOneCart);

//ruta para actualizar todos los productos de un carrito.
router.put("/:cid",CartsController.updateOneCart);

//ruta para actualizar cantidad de un producto en el carrito
router.put("/:cid",checkRoles([AdminRole,UsuarioRole]), CartsController.updateQuantityToOneCart);

//ruta para actualizar la cantidad de un producto en el carrito
router.put("/:cid/product/:pid",CartsController.updateProductQuantityToOneCart);

//ruta para eliminar todos los productos del carrito
router.delete("/empty/:cid",CartsController.deleteAllProductsFromCart);

//ruta para eliminar el carrito
router.delete("/:cid",CartsController.deleteCart);

//ruta para finalizar el proceso de compra
router.put("/:cid/purchase",CartsController.purchase);

export {router as cartsRouter};