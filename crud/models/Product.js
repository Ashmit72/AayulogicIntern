import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
title:{type:String,trim:true,required:true},
description:{type:String,trim:true,required:true},
image:{type:Object,url:String,name:String},
},
{timestamps:true})

const Product=mongoose.model('Product',productSchema);
export default Product;
