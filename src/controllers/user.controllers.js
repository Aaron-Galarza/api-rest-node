import * as Model from "../models/User.js"
import bycrpt from "bcrypt"

export const registerUser = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(402).json({error: "Email y Contraseña son obligatorios"})

    } else {
        const existsEmail = await Model.findUserByEmail(email)
        
        if (existsEmail){
            res.status(500).json({error:"Email ya registrado, por favor intenta con otro"})

        } else {
            const passwordHash = await bycrpt.hash(password, 10)
            const user = await Model.postUser(email, passwordHash)

            res.json({"message":"usuario creado correctamente",
                user
            })

        }
    } 
}