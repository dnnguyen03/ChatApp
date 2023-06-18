import React, { useEffect, useState } from "react"

import { onIdTokenChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase/config"
import { Box, CircularProgress } from "@mui/material"

export const AuthConText = React.createContext()

export default function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubcribed = onIdTokenChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({ displayName, email, uid, photoURL })
        navigate("/")
        setLoading(false)
        return
      }
      setUser({})
      setLoading(false)
      navigate("/login")
    })
    //clear function
    return () => {
      unsubcribed()
    }
  }, [navigate])
  return (
    <AuthConText.Provider value={{ user }}>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthConText.Provider>
  )
}
