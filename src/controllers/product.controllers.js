//Llamamos al modelo de productos para trabajarlo en controllers
import * as Model from "../models/Products.js";

//declaramos la constante con el metodo del Model
const products = await Model.getProducts();

//GET - Mostrar Productos por Categorias (JQuery) - SI NO ENCUENTRA NADA, MUESTRA TODO
export const getAllProducts = async (req, res) => {
	const {category} = req.query;
	
	if (!category) {
		res.json(products)
	} else {
		const productFiltered = products.filter(item => item.categories.includes(category))
		
		if (productFiltered.length > 0) {
            res.json(productFiltered)
		} else {
			res.status(400).json({error: "No existe tal categoria"})
		}
	}
}

//GET - Mostrar Productos por su Nombre
export const getProductName = (req, res) => {
	const {name} = req.query;
	
	if (!name) {
		res.status(404).json({error: "El nombre es requerido"})
	} else {
		const productFiltered = products.filter(item =>
            item.name.toLowerCase().includes(name.toLowerCase())
        );
		
		if (productFiltered.length > 0 ) {
			res.json(productFiltered)
				
		} else {
            res.status(404).json({error: "No existe ese nombre"})

		}
	}
}

//GET - Mostrar Productos por ID (req.params)
export const getProductId = async (req, res) => {
	const idProduct = req.params.id
	const productFiltered = products.find(item => item.id === idProduct)

	if (productFiltered) {
		res.json(productFiltered)

	} else {
		res.status(400).json({error: "ID no existe"})
		
	}
}