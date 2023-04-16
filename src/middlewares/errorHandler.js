import { EError } from "../enums/EError.js";

export const errorHandler = (error, req,res,next)=>{
    console.log(error.code);
    switch (error.code) {
        case EError.INVALID_TYPES:
            res.json({status:"error", error:error.cause, code:error.code});
            break;
        case EError.INVALID_PARAM:
            res.json({status:"error", error:error.cause});
            break;
        default:
            res.json({status:"error", error:"error desconocido"});
            break;
    }
} 