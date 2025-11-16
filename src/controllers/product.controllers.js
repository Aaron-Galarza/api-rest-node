//Llamamos al modelo de productos para trabajarlo en controllers
import * as Model from "../models/Products.js";

//GET - Mostrar Productos por Categorias (JQuery) - SI NO ENCUENTRA NADA, MUESTRA TODO
export const getAllProducts = async (req, res) => {
	const products = await Model.getProducts();

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
export const getProductName = async (req, res) => {
	const products = await Model.getProducts();

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
	const products = await Model.getProducts();
	
	const idProduct = req.params.id
	const productFiltered = products.find(item => item.id === idProduct)

	if (productFiltered) {
		res.json(productFiltered)

	} else {
		res.status(400).json({error: "ID no existe"})
		
	}
}

export const createProduct = async (req, res) => {
	const {name, price, categories} = req.body

	const product = await Model.postProducts({name, price, categories})
	res.json(product)
}

export const deleteProduct = async (req, res) => {
	const { id } = req.params

	const deleted = await Model.deleteProduct(id)

	if (!deleted) {
		return res.status(404).json({"message":"Producto no encontrado"})
	}

	res.status(201).json({"message":"Producto borrado correctamnte"})
}