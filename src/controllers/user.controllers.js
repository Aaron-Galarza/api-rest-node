import * as Model from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(402).json({error: "Email y Contraseña son obligatorios"})

    } else {
        const existsEmail = await Model.findUserByEmail(email)
        
        if (existsEmail){
            res.status(500).json({error:"Email ya registrado, por favor intenta con otro"})

        } else {
            const passwordHash = await bcrypt.hash(password, 10)
            const user = await Model.postUser(email, passwordHash)

            res.json({"message":"usuario creado correctamente",
                user
            })

        }
    } 
}

export const loginUser = async (req, res) =>{
    const {email, password} = req.body

    if (!email || !password) {
        res.status(422).json({error: "Email y Contraseña son obligatorios"})
    } else {
        const user = await Model.findUserByEmail(email)

        if(!user) {
            res.status(401).json({error: "Credenciales invalidas o usuario no registrado"})
        } else {
            const valid = await bcrypt.compare(password, user.passwordHash)
            if (!valid) {
                res.status(401).json({error: "Credenciales invalidas"})
            } else {
              const token = jwt.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
            );
            return res.json({"message":"Login Correcto",
                token
            })
            }
        }
    }
}