import passport from "passport";
import { UserDTO } from "../daos/dtos/user.dto.js";

class AuthController{
    static signupLocal = passport.authenticate("signupStrategy",{
        failureRedirect:"/api/sessions/failure-signup"
    });

    static redirectProducts(req,res){
        res.redirect("/products");
    };

    static failureSignup(req,res){
        res.send(`<div>Error al registrar al usuario, <a href="/signup">Intente de nuevo</a></div>`);
    };

    static loginLocal = passport.authenticate("loginStrategy",{
        failureRedirect:"/api/sessions/failure-login"
    });

    static redirectProductsAfterLogin(req,res){
        req.session.user=req.user;
        res.redirect("/products");
    };

    static failureLogin(req,res){
        res.send(`<div>Error al loguear al usuario, <a href="/login">Intente de nuevo</a></div>`);
    }

    static signupGithub = passport.authenticate("githubSignup");

    static githubCallback = passport.authenticate("githubSignup",{
        failureRedirect:"/login"
    });

    static logout(req,res){
        req.session.destroy((err)=>{
            if(err) return res.json({status:"error", message:"no se pudo cerrar la sesión"});
            res.json({status:"success", message:"sesion finalizada"});
        });
    }

    static current(req,res){
        console.log("current",req.user)
        if(req.user){
            const resultDto = new UserDTO(req.user);
            res.send(resultDto);
        } else {
            res.send({status:"error", error:"User no loggued"});
        }
    }





}

export {AuthController}