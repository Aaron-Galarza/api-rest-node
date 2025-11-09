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

//uso middleware global; Validacion de rutas siempre va al final
app.use(myStatus)

// inicializamos el servidor - lo prendemos xd
app.listen(PORT, () => console.log(`Servidor corriendo en: http://localhost:${PORT}`))