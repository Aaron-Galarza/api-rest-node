import { db } from "../config/firebase.js"
import { collection, getDocs, getDoc, addDoc, doc, deleteDoc } from "firebase/firestore"

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

export const deleteProduct = async (id) => {
    try {
        const productRef = doc(productsCollection, id)
        const snapshot = await getDoc(productRef)

        if (!snapshot.exists()) {
            return false;
        }

        await deleteDoc(productRef);
        return true;
    } catch (error) {
        console.error(error)
    }
}