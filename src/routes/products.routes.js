import {Router} from "express";
import {ProductController} from "../controllers/products.controller.js";
// import { checkValidProductFields } from "../middlewares/validations.js";
import { isAdminRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", ProductController.getPaginateProductsController);

router.get("/new", ProductController.newProduct);

router.get("/:pid",ProductController.getProductById);

//ruta para agregar un producto
router.post("/", ProductController.createProduct);

//ruta para actualizar un producto
router.put("/:pid",ProductController.updateProduct);

//ruta para eliminar el producto
router.delete("/:pid",isAdminRole,ProductController.deleteProduct);

export {router as productsRouter};