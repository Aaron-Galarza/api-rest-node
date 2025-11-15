import "dotenv/config"
import express, { Router } from "express"; //importamos express

//importamos middleware
import myStatus from "./src/middlewares/not-found.js";

//importamos rutas
import productRouter from "./src/routes/products.routes.js";
import checkRouter from "./src/routes/check.routes.js"

const app = express(); //declaramos una variable con los metodos de express
const PORT = process.env.PORT; //declaramos el puerto

//uso middleware global; verificacion de metodos siempre va al principio
app.use((req, res, next) => {
    console.log(req.method)
    next();
})

//Mounting Routes - Modularizamos las rutas y las llamamos para usarlas
app.use('/api', productRouter)
app.use('/api', checkRouter)

//primera ruta - "Hola Mundo" (endpoint)
app.get('/', (req, res) => {
    res.json({"message": "Hola mundo, primara api con Node y Firebase"})
})

//uso middleware global; Validacion de rutas siempre va al final
app.use(myStatus)

// inicializamos el servidor - lo prendemos xd
app.listen(PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`))