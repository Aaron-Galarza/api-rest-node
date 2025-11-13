import express from "express"; //importamos express
import myStatus from "./src/middlewares/not-found.js";
import * as varCheck from "./src/middlewares/varCheck.js";

const app = express(); //declaramos una variable con los metodos de express
const PORT = 5000; //declaramos el puerto

//importamos las cositas de /middlewares/varCheck.js
const middleCheck = varCheck.middleCheck;
const variable = varCheck.variable;

// middleware de ejemplo - global
app.use((req, res, next) => {
    console.log(req.method)
    next();
})

//primera ruta (endpoint)
app.get('/', (req, res) => {
    res.json({"message": "Hola mundo, primara api con Node y Firebase"})
})

//segunda ruta (endpoint para variable = 1)
app.use('/acumVar', (req, res) => {
    res.json({"message":"se añade 1 a variable"})
    variable.val = 1
})

//tercera ruta (prueba del middleware especifico)
app.get('/middleCheck', middleCheck, (req, res) => {
    res.json({
        "message":"acceso permitido",
        "valor_actual": req.variable,
        "detalles": "El valor fue establecido en '1' al acceder a la ruta http://localhost:5000/acumVar.",
    })
})

const products = [
    {
        id: 1,
        name: "Botella Termica",
        price: 220,
        categories: ["hogar","accesorios"]
    },
    {
        id: 2,
        name: "Camiseta Deportiva",
        price: 150,
        categories: ["ropa","deportes"]
    },
    {
        id: 3,
        name: "Mochila Escolar",
        price: 350,
        categories: ["mochilas","escolar"]
    },
    {
        id: 4,
        name: "Auriculares Bluetooth",
        price: 800,
        categories: ["tecnologia","audio"]
    },
    {
        id: 5,
        name: "PC Gamer",
        price: 1000,
        categories: ["hogar","accesorios", "tecnologia"]
    },
];

//GET - Mostrar Productos por Categorias (JQuery) - SI NO ENCUENTRA NADA, MUESTRA TODO
app.get('/products', (res, req) => {
	const {category} = req.query
	
	//si se ingresa una categoria para buscarla, se hace el filtrado
	if (category) {
		const productFiltered = products.filter(item => 
		item.categories.includes(category)
		);
		
		//si el filtrado tiene valores se muestran
		if (productFiltered.length > 0){
			res.json(productFiltered)
			
			//sino, se devuelve la lista vacia
		} else {
			res.status(404).json({error: "No existe categoria"})
			
		}
		
		//si NO se ingresa una categoria para buscarla, se muestra toda la coleccion
	} else {
		res.json(products)
	}
})

//GET - Mostrar Productos por su Nombre
app.get('/products/search', (req, res) => {
    const {name} = req.query;

    if (!name) {
        res.status(400).json({error: "El nombre es requerido"})
    } else {
        const productFiltered = products.filter(item =>
            item.name.toLowerCase().includes(name.toLowerCase())
        );

        if (productFiltered.length > 0) {
            res.json(productFiltered)

        } else {
            res.status(404).json({error: "No existe producto con ese Nombre"})

        }
    }
})

//Metodo GET HTTP - Mostrar TODOS los Produtos
//app.get('/products', (req, res) => {
//    res.json({products})
//})

//GET - Mostrar Productos por ID (req.params)
app.get('/products/:id', (req, res) => {

    const idProduct = parseInt(req.params.id);
    const product = products.find(item => item.id === idProduct)

    if (!product) {
        res.status(404).json({error: "No existe producto con ese ID"})
    } else {
        res.json({product})
    }
})
 


//uso middleware global; Validacion de rutas siempre va al final
app.use(myStatus)

// inicializamos el servidor - lo prendemos xd
app.listen(PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`))