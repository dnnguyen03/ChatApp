import {
  signInWithPopup,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
} from "firebase/auth"
import { auth } from "../../firebase/config"
import { Button, Stack, Typography } from "@mui/material"
import { addDocument, generateKeywords } from "../../firebase/services"

export default function Login() {
  function Signin(provider) {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (getAdditionalUserInfo(result).isNewUser) {
          addDocument("users", {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            uid: result.user.uid,
            providerId: result.providerId,
            createdAt: result.user.metadata.creationTime,
            keywords: generateKeywords(result.user.displayName),
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleFBLogin = () => {
    const facebookProvider = new FacebookAuthProvider()
    Signin(facebookProvider)
  }
  const handleGGLogin = () => {
    const googleProvider = new GoogleAuthProvider()
    Signin(googleProvider)
  }
  return (
    <div className="Login">
      <Stack gap={2} m={3}>
        <Typography align="center">Fun Chat</Typography>
        <Button variant="contained" onClick={handleGGLogin}>
          Đăng nhập bằng Google
        </Button>
        <Button variant="contained" onClick={handleFBLogin}>
          Đăng nhập bằng Facebook
        </Button>
      </Stack>
    </div>
  )
}
