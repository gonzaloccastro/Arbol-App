import mongoose from "mongoose";
import {options} from "../src/config/options.js";
import { ProductModel } from "../src/daos/models/product.model.js";

await mongoose.connect(options.mongoDB.url);

const updateWithOwnerProducts = async()=>{
    const adminId ="644db7f4052bca2f121dfd26";
    const result = await ProductModel.updateMany({},{$set:{owner:adminId}});
    console.log("result", result);
}
updateWithOwnerProducts();