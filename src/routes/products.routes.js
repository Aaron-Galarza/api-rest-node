import { Router } from "express";
import {
    getAllProducts,
    getProductName,
    getProductId
} from "../controllers/product.controllers.js"; //Llamamos a sus respectivos controllers

const router = Router();

//GET - Mostrar Productos por Categorias (JQuery) - SI NO ENCUENTRA NADA, MUESTRA TODO
router.get('/products', getAllProducts )

//GET - Mostrar Productos por su Nombre
router.get('/products/search', getProductName)

//GET - Mostrar Productos por ID (req.params)
router.get('/products/:id', getProductId)

export default router;