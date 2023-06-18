import { useState } from "react"
import {
  signInWithPopup,
  FacebookAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth"
import { auth } from "../../firebase/config"
import { Button, Stack, Typography } from "@mui/material"
import { addDocument } from "../../firebase/services"

export default function Login() {
  const handleFBLogin = () => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        if (!getAdditionalUserInfo(result)) {
          addDocument("users", {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            uid: result.user.uid,
            providerId: getAdditionalUserInfo(result).providerId,
            // keywords: generateKeywords(result.user.displayName?.toLowerCase()),
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="Login">
      <Stack gap={2} m={3}>
        <Typography align="center">Fun Chat</Typography>
        <Button variant="contained">Đăng nhập bằng Google</Button>
        <Button variant="contained" onClick={handleFBLogin}>
          Đăng nhập bằng Facebook
        </Button>
      </Stack>
    </div>
  )
}
