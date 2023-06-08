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
    });
};

export const productDeletedEmail = async(email)=>{
    
    await transporter.sendMail({
        from:"Arbol-App",
        to: email,
        subject:"Producto eliminada",
        html:`
            <h3>Hola,</h3>
            <p>Como eres un usuario premium te comentamos que un producto tuyo ha sido eliminado.</p>
        `
    });
};

export const purchaseEmail = async (email, data) => {
    const { products, amount } = data;
  
    let productsHTML = "";
    for (const product of products) {
      productsHTML += `<li>${product.id.title}: ${product.quantity}</li>`;
    }
  
    await transporter.sendMail({
      from: "Arbol-App",
      to: email,
      subject: "Compra completada",
      html: `
        <h3>Hola,</h3>
        <p>¡Gracias por comprar en nuestra tienda!</p>
        <p>Detalles de tu compra:</p>
        <ul>
          ${productsHTML}
        </ul>
        <p>Monto total: $${amount}</p>
      `,
    });
  };