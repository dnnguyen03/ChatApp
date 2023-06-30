import { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "./config"

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([])
  useEffect(() => {
    let collectionRef = collection(db, collectionName)

    if (condition) {
      if (condition.compareValue?.length) {
        collectionRef = query(
          collectionRef,
          where(condition.fieldName, condition.operator, condition.compareValue)
        )
      }
      if (condition.compareValue && !condition.compareValue?.length) {
        setDocuments([])
        return
      }
    }
    if (!condition.compareValue) {
      setDocuments([])
      return
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setDocuments(documents)
    })

    return unsubscribe
  }, [collectionName, condition])

  return documents
}

export default useFirestore
