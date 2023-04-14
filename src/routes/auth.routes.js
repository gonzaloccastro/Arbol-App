import {Router} from "express";
import {AuthController} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", AuthController.signupLocal , AuthController.redirectProducts);

router.get("/failure-signup",AuthController.failureSignup);

router.post("/login", AuthController.loginLocal, AuthController.redirectProductsAfterLogin
);

router.get("/failure-login",AuthController.failureLogin);

//rutas estrategia github
router.get("/github", AuthController.signupGithub);

//Esta ruta DEBE COINCIDIR con la configurada como callback en la app de github, que ya github redirigirá a esta ruta con la información del usuario.

router.get("/githubcallback",AuthController.githubCallback,AuthController.redirectProductsAfterLogin);

router.post("/logout",AuthController.logout);

router.get("/current",AuthController.current);

export { router as authRouter};