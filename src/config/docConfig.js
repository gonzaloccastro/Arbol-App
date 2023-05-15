import {__dirname} from "../utils.js";
import swaggerJsDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentacion api de Arbol",
            version:"1.0.0",
            description:"Definicion de endpoints para la API de Arbol"
        }
    },
    apis:[`${path.join(__dirname,"../docs/**/*.yaml")}`]
};

//crear una variable que interpreta las opciones para trabajar con swagger
export const swaggerSpecs =swaggerJsDoc(swaggerOptions);