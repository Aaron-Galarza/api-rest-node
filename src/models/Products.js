//Coleccion de datos - Firestore proximamente
const products = [
    {
        id: 1,
        name: "Silencio nos escuchan",
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

import { db } from "./firebase.js";

import {collection, doc, getDoc, getDocs} from "firebase/firestore";

const productsCollection = collection(db, "products");

//Los exportamos como funcion
export const getProducts = async () =>{
    try {
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error(error)
    }
};