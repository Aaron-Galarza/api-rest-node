import express from "express"; //importamos express
const app = express() //hacemos una constante

//primera ruta - callback
app.get("/", (req, res) => {
    res.send("Bienvenido a mi api rest node")
})

const PORT = 5000 //declaramos el puerto 

app.listen(PORT, () => console.log(`http://localhost:${PORT}`)) //iniciamos el servidor

