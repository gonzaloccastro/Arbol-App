import {Router} from "express";
import {AuthController} from "../controllers/auth.controller.js";
//envio correos
import { generateEmailToken, verifyEmailToken, isValidPassword, createHash } from "../utils.js";
import { sendRecoveryEmail, sendDeleteEmail } from "../config/messages/gmail.js";
//remplazar con repository, controller y factory
import { UserManagerMongo } from "../daos/managers/userManagerMongo.js";
import { UserModel } from "../daos/models/user.model.js";
const userService = new UserManagerMongo(UserModel);


const router = Router();

router.post("/signup", AuthController.signupLocal, AuthController.redirectProducts);

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


//ruta para enviar el correo de recupercion de contrasena
router.post("/forgot-password",async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await userService.getUserByEmail(email);
        if(!user){
            return res.send(`<p>el usuario no existe, <a href="/signup">Crea una cuenta</a></p>`)
        }
        const token = generateEmailToken(user.email,60);
        console.log(token)
        await sendRecoveryEmail(email,token);
        res.send("<p>Fue enviado el correo con las instrucciones para restablecer la contraseña</p>")
    } catch (error) {
        res.send({status:"error", error: error.message});
    }
});

//ruta para enviar el correo de eliminación de cuenta
router.post("/deleted-account/:email",async(req,res)=>{
    try {
        const userEmail = req.params.email;
        sendDeleteEmail(userEmail);
        const data = await userService.getUsers();
        res.render("adminPanel", data);
    } catch (error) {
        res.send({status:"error", error: error.message});
    }
});


//ruta para restablecer la contraseña
router.post("/reset-password",async(req,res)=>{
    try {
        const token = req.query.token;
        const {email, newPassword} = req.body;
        //validar que el token sea valido.
        const validEmail = verifyEmailToken(token);
        console.log(validEmail);
        if(!validEmail){
            return res.send(`El enlace caduco o no es valido, <a href="/forgot-password">intentar de nuevo</a>`)
        }
        //validamos que el usuario exista en la db
        const user = await userService.getUserByEmail(email);
        if(!user){
            return res.send(`<p>el usuario no existe, <a href="/signup">Crea una cuenta</a></p>`)
        }
        if(isValidPassword(user,newPassword)){
            //si las contrasenas son iguales
            return res.render("resetPassword",{error:"no puedes usar la misma contraseña",token})
        }
        //actualizamos la contrasena del usuario en la db
        const newUser = {
            ...user,
            password: createHash(newPassword)
        }
        await userService.updateUser(user._id,newUser);
        res.redirect("/login");
    } catch (error) {
        res.send({status:"error", error: error.message});
    }
})


export { router as authRouter};