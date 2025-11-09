//src\middlewares\var-one.js
//middleware para segunda ruta, ejemplo de middleware especifico

//exportamos como objeto para ser mutable
export let variable = {
    val: 0
}

//middleware de validacion
export const middleCheck = function (req, res, next) {
    if (variable.val === 1) {
        next();
    } else {
        res.json({"message":"error: variable no inicializada. Dirijase a http://localhost:5000/acumVar para tener acceso a esta ruta"})
    }
}

