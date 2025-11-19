import { addDoc, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import { db } from "../config/firebase.js";

const userCollection = collection(db, "user")

export const findUserByEmail = async (email) => {
    try {
        const emailQuery =  query(userCollection, where("email", "==", email))
        const snapshot = await getDocs(emailQuery)
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return {id: doc.id, ...doc.data()}
        } else {
            return null
        }
    
    } catch (error) {
        console.error(error)
    }

}

export const postUser = async (email, passwordHash) => {
    try {
        const docRef = await addDoc(userCollection, {email, passwordHash})
        return {id: docRef.id, email}
    } catch (error) {
        console.error(error)
    }
}