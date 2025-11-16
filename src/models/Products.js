import { db } from "../config/firebase.js"
import { collection, getDocs, getDoc, addDoc } from "firebase/firestore"

const productsCollection = collection(db, "products")

//mostrar datos
export const getProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection)
        return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error(error)
    }
}

export const postProducts = async (data) => {
    try {
        const docRef = await addDoc(productsCollection, data)
        return {id: docRef.id, ...data}
    } catch (error) {
        console.error(error)
    }
}