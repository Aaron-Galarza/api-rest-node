import { Router } from "express";
import * as varCheck from "../middlewares/varCheck.js";

const router = Router();

//importamos las cositas de /middlewares/varCheck.js
const middleCheck = varCheck.middleCheck;
const variable = varCheck.variable;

//segunda ruta (endpoint para variable = 1)
router.use('/acumulador', (req, res) => {
    res.json({"message":"se añade 1 a variable"})
    variable.val = 1
})

//tercera ruta (prueba del middleware especifico)
router.get('/acumuladorCheck', middleCheck, (req, res) => {
    res.json({
        "message":"acceso permitido",
        "valor_actual": req.variable,
        "detalles": "El valor fue establecido en '1' al acceder a la ruta http://localhost:5000/acumVar.",
    })
})

export default router;