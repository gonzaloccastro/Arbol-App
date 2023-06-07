import passport from "passport";
import { UserDTO } from "../daos/dtos/user.dto.js";
import { userService } from "../daos/repository/index.js";

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

    static async logout(req,res){
         try {
            const user = {...req.user._doc};
            user.last_connection = new Date();
            await userService.updateUser(user._id, user);
            await req.session.destroy();
            res.json({status:"success", message:"sesion finalizada"});
        } catch (error) {
            console.log(error.message)
            res.json({status:"error", message:"no se pudo cerrar la sesión"});
        }
    }


    static async logoutUser(req,res){
        try {
            //obtenemos el usuario
            // console.log(req.user)
            const user = {...req.user._doc};
            user.last_connection = new Date();
            // console.log(user)
            await userService.updateUser(user._id, user);
            await req.session.destroy();
            res.json({status:"success", message:"sesion finalizada"});
        } catch (error) {
            console.log(error.message)
            res.json({status:"error", message:"no se pudo cerrar la sesión"});
        }
    }

    static current(req, res) {
        console.log("current", req.user);
        if (req.user) {
          const user = new UserDTO(req.user);
          console.log(user)
          res.render("currentUser", user);
        } else {
          res.send({ status: "error", error: "User not logged" });
        }
    };



    
}

export {AuthController}