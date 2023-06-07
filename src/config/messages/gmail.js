import {options} from "../options.js";
import nodemailer from "nodemailer";

//crear un transportador.
const transporter = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:options.gmail.adminGmail,
        pass:options.gmail.adminGmailPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export const sendRecoveryEmail = async(email,token)=>{
    const link = `http://localhost:8080/restart-password?token=${token}`;//enlace con token

    await transporter.sendMail({
        from:"Arbol-App",
        to:email,
        subject:"Recupera tu contraseña",
        html:`
            <h3>Hola,</h3>
            <p>Recibimos tu solicitud para recuperar la constraseña, da clic en el siguiente botón</p>
            <a href="${link}">
                <button>Restablecer contraseña</button>
            </a>
        `
    });


}

export const sendDeleteEmail = async(email)=>{
    await transporter.sendMail({
        from:"Arbol-App",
        to: email,
        subject:"Cuenta eliminada",
        html:`
            <h3>Hola,</h3>
            <p>Eliminamos tu cuenta por estar inactivo por más de 2 días</p>
        `
    })
};