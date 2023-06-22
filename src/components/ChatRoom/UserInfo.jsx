import { Avatar, Button, Stack, Typography } from "@mui/material"
import { auth } from "../../firebase/config"
import { useContext } from "react"
import { AuthConText } from "../ConText/AuthProvider"

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = useContext(AuthConText)
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack>
        <Avatar src={photoURL} alt={displayName} />
        <Typography>{displayName}</Typography>
      </Stack>
      <Stack>
        <Button variant="contained" onClick={() => auth.signOut()}>
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  )
}
