import { Router } from "express";
import {
    getAllProducts,
    getProductName,
    getProductId,
    createProduct,
    deleteProduct
} from "../controllers/product.controllers.js"; //Llamamos a sus respectivos controllers

const router = Router();
//GET
// -Mostrar Productos por Categorias (JQuery) - SI NO ENCUENTRA NADA, MUESTRA TODO
router.get('/products', getAllProducts )
// -Mostrar Productos por su Nombre
router.get('/products/search', getProductName)
// -Mostrar Productos por ID (req.params)
router.get('/products/:id', getProductId)

//POST
// -Crear un nuevo Producto
router.post('/products', createProduct)

//DELETE
// -Eliminar un Producto por su ID
router.delete('/products/:id', deleteProduct)

export default router;