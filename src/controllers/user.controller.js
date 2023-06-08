import {userService} from "../daos/repository/index.js";
import {UsuarioRole, PremiumRole} from "../constants/api.js";
import {sendDeleteEmail} from "../config/messages/gmail.js"

class UserController{

    static async getAdminPanel(req,res){
        try {
            const users = await userService.getUsersForAdmin();
            // res.json({status:"success", message:`aquí están los usuarios`, users});
            res.render("adminPanel", { users: users });
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
    };


    static async getAllUsers(req,res){
        try {
            const users = await userService.getUsers();
            // res.json({status:"success", message:`aquí están los usuarios`, users});
            res.render("users", { users: users });
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
    };

    static async deleteOldUsers(req, res) {
        try {
          const twoDaysAgo = new Date();
          twoDaysAgo.setDate(thirtyDaysAgo.getDate() - 2);
          
          const users = await userService.find();
          
          // Filtramos los usuarios que no se hayan conectado en los últimos 2 días
          const recentUsers = users.filter(user => user.last_connection >= twoDaysAgo);
          
          // Eliminamos los usuarios que no se hayan conectado en los últimos 30 días
          await userService.deleteMany({ last_connection: { $lt: twoDaysAgo } });
      
          res.render("users", { users: recentUsers });
        } catch (error) {
          res.status(400).json({ status: "error", message: error.message });
        }
    };


    static async modifyUser(req,res){
        try {
            const userId = req.params.uid;
            //Verificamos si el usuario existe en la db
            const user = await userService.getUserById(userId);
            //obtenemos el actual rol del usuario
            const userRole = user.rol;
            //validamos el rol actual y cambiamos el rol del usuario
            if(userRole === UsuarioRole){
                user.rol = PremiumRole;
            } else if(userRole === PremiumRole) {
                user.rol = UsuarioRole;
            } else {
                return res.json({status:"error", message:"No es posible cambiar el rol de un administrador"});
            }
            await userService.updateUser(userId,user);
            res.json({status:"success", message:`nuevo rol del usuario: ${user.rol}`});
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
    };

    static async deleteUser(req, res) {
        try {
            const userId = req.params.uid;
            const user = await userService.getUserById(userId);
            const userEmail = user.email;
            await userService.deleteUserById(userId);
            await sendDeleteEmail(userEmail);
            await fetch(`/api/users/adminPanel`);
            console.log("prueba");
        } catch (error) {
          res.status(400).json({ status: "error", message: error.message });
        }
      }
}

export {UserController}