const { mongo } = require("mongoose");

const mongosee = require ('mongoose');
const Schema= mongosee.Schema;

//Modelo de los productos de licuados 
const ProductsSchema= new Schema({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String, required: true},
    imageUrl:{type: String, required: true},
});
module.exports=mongosee.model('products',ProductsSchema)