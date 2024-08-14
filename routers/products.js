const express = require('express');
const router = express.Router();
const Products = require ('../models/products')
const cors = require('cors');
const products = require('../models/products');

const app = express();

app.use(express.json());
app.use(cors()); // Usar cors

//Resgistrar un nuevo producto (Admin)
router.post('/', async (req, res) => {
    try {
        const newProduct= new Products({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json( {message: error.message} );
    }
    
});

//Traer todos los productos (cliente)
router.get('/', async (req, res) =>{
    try{
        const productos= await products.find();
        res.json(productos)
    } catch (error) {
        res.status(500).json({message: error.message })
    }
});

//Traer producto por id (cliente)
router.get('/:id', async (req, res) =>{
    try{
        const productos= await products.findById(req.params.id);
        if(!productos) 
            return res.status(400).json({message: 'Producto no encontrado'});
        res.json(productos)
    } catch (error) {
        res.status(500).json({message: error.message })
    }
});

//Actualizar producto  (Admin)
router.put('/:id', async (req, res) =>{
    try{
        const updateProducts= await products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateProducts)
    } catch (error) {
        console.error('Error en PUT /api/products/:id:', error);
        res.status(500).json({message: error.message })
    }
});

//Eliminar producto  (Admin)
router.delete('/:id', async (req, res) =>{
    try{
        await products.findByIdAndDelete(req.params.id);
        res.json({message: 'Producto Eliminado'})
    } catch (error) {
        res.status(500).json({message: error.message })
    }
});


module.exports = router;