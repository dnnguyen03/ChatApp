import {
  signInWithPopup,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
} from "firebase/auth"
import { auth } from "../../firebase/config"
import { Stack, Typography } from "@mui/material"
import { addDocument, generateKeywords } from "../../firebase/services"
import bgLogin from "../../assets/image/bgLogin.svg"
import logoFb from "../../assets/image/facebook-logo.png"
import logoGg from "../../assets/image/google-logo.png"

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
    <Stack className="Login" direction="row" height="100vh">
      <Stack
        width={{ md: "70%", sm: "50%" }}
        display={{ sm: "flex", xs: "none" }}
        bgcolor="#9eadbb"
        padding="0 10px"
        zIndex={3}
        justifyContent="center"
      >
        <img style={{ height: "70%" }} src={bgLogin} alt="" />
      </Stack>
      <Stack
        className="Login"
        width={{ md: "30%", sm: "50%", xs: "100%" }}
        p="0 10px"
        gap={4}
      >
        <Typography
          align="center"
          color="black"
          fontSize="3rem"
          borderBottom="0.5px solid rgba(0, 0, 0, 0.25)"
          m="10px 0 150px"
          fontFamily="'Dancing Script', cursive"
        >
          Chat App
        </Typography>
        <Typography
          fontWeight="600"
          fontSize="28px"
          textAlign="center"
          color="#222"
        >
          Login to your account
        </Typography>
        <Stack
          p="10px 5px"
          height={40}
          direction="row"
          alignItems="center"
          border="2px solid rgba(0, 0, 0, 0.25)"
          borderRadius="6px"
          onClick={handleFBLogin}
        >
          <img src={logoFb} alt="" style={{ height: "100%" }} />
          <Typography
            fontSize="20px"
            letterSpacing="0.5px"
            width="100%"
            textAlign="center"
          >
            Login with Facebook
          </Typography>
        </Stack>
        <Stack
          p="10px 5px"
          height={40}
          direction="row"
          alignItems="center"
          border="2px solid rgba(0, 0, 0, 0.25)"
          borderRadius="6px"
          onClick={handleGGLogin}
        >
          <img src={logoGg} alt="" style={{ height: "100%" }} />{" "}
          <Typography
            fontSize="20px"
            letterSpacing="0.5px"
            width="100%"
            textAlign="center"
          >
            Login with Google
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
