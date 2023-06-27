import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "./config"

export const addDocument = (collectionName, data) => {
  const dbRef = collection(db, collectionName)

  addDoc(dbRef, data)
    .then((docRef) => {})
    .catch((error) => {
      console.log(error)
    })
}

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
  } catch (error) {
    console.error("Error removing document: ", error)
  }
}

export const deleteRoomMessage = async (collectionName, roomId) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), where("roomId", "==", roomId))
    )
    querySnapshot.forEach((doc) => {
      deleteDocument(collectionName, doc.id)
    })
  } catch (error) {
    console.error("Error removing documents: ", error)
  }
}
//setup keyword for search
export const generateKeywords = (displayName) => {
  const name = displayName
    .toLowerCase()
    .split(" ")
    .filter((word) => word)

  const length = name.length
  let flagArray = []
  let result = []
  let stringArray = []

  for (let i = 0; i < length; i++) {
    flagArray[i] = false
  }

  const createKeywords = (name) => {
    const arrName = []
    let curName = ""
    name.split("").forEach((letter) => {
      curName += letter
      arrName.push(curName)
    })
    return arrName
  }

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true
        result[k] = name[i]

        if (k === length - 1) {
          stringArray.push(result.join(" "))
        }

        findPermutation(k + 1)
        flagArray[i] = false
      }
    }
  }

  findPermutation(0)

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur)
    return [...acc, ...words]
  }, [])

  return keywords
}
