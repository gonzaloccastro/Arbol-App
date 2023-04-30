import path from "path";
import {fileURLToPath} from 'url';
import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import jwt from "jsonwebtoken";
import {options} from "./config/options.js";


export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};


export const isValidPassword=(user, password)=>{
    return bcrypt.compareSync(password, user.password);
};


const { commerce,database,random,image, name, internet } = faker;

faker.locale = "es";

export const generateProduct = ()=>{
    return {
        id:database.mongodbObjectId(),
        title:commerce.productName(),
        description:commerce.productName(),
        price:commerce.price(),
        stock:random.numeric(1),
        image:image.image(),
    }
}

export const generateProducts = ()=>{
  let products=[];
  const numberOfProducts = 100;
  for(let i=0;i<numberOfProducts;i++){
      const newProduct = generateProduct();
      products.push(newProduct);
  }

  return products
}

export const generateEmailToken = (email, expireTime)=>{
    const token = jwt.sign({email}, options.server.tokenKey, {expiresIn:expireTime});
    return token;
};

export const verifyEmailToken=(token)=>{
    try {
        const info = jwt.verify(token, options.server.tokenKey);
        return info.email;
    } catch (error) {
        return null;
    }
};