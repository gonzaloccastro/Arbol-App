import winston from "winston";
import * as dotenv from "dotenv";
dotenv.config();

const currentEnv = process.env.NODE_ENV || "development";

const customLevelOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    }
};

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        //sistemas de almacenamiento
        new winston.transports.Console({ level:"debug" })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        //sistemas de almacenamiento
        new winston.transports.Console({ level:"info" }),
        new winston.transports.File({filename:"./logs/error.log", level:"error"})
    ]
});

//middleware para agregarle el logger al objeto req
export const addLogger = (req,res,next)=>{
    if(currentEnv === "development"){
        req.logger=devLogger;
    } else {
        req.logger=prodLogger;
    }
    req.logger.debug(`${req.url}- ${req.method}`);
    next();
};