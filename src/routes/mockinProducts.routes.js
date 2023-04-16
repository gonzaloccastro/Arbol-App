
import { Router } from "express";
import {generateProduct} from "../utils.js";

const router = Router();

router.get('/', (req,res)=>{
    let products=[];
  const numberOfProducts = 100;
  for(let i=0;i<numberOfProducts;i++){
      const newProduct = generateProduct();
      products.push(newProduct);
  }
  res.json({products})
})
  
export {router as mockinRouter}