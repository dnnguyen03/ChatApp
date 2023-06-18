import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import firebase, { db } from "./config"

export const addDocument = async (collectionName, data) => {
  const dbRef = collection(db, collectionName)
  //   const newData = {
  //     ...data,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //   }
  addDoc(dbRef, data)
    .then((docRef) => {
      console.log(docRef)
      console.log("Document has been added successfully")
    })
    .catch((error) => {
      console.log(error)
    })
}
