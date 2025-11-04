import express from 'express'; //importamos express
import myStatus from './src/middlewares/not-found.js';

const app = express(); //iniciamlizamos una const con las funciones de express

const PORT = 5000; //declaramos el puerto

//middleware de ejemplo
const myMetho = function(req, res, next) {
    console.log(req.method)
    next()
}

//uso del middleware
app.use(myMetho);

//primera ruta (endpoint - get)
app.get("/",(req, res)=>{
    res.send("Hola mundo, primera api-rest en node con express")
});

//uso del segundo middleware; Validacion de rutas siempre va al final
app.use(myStatus)

//iniciamos el servidor
app.listen(PORT, console.log(`API funcionando en http://localhost:${PORT}`))