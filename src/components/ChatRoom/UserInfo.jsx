import { Avatar, Button, Stack, Typography } from "@mui/material"
import { auth } from "../../firebase/config"
import { useContext } from "react"
import { AuthConText } from "../ConText/AuthProvider"

export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = useContext(AuthConText)
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      m="15px 0"
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar src={photoURL} alt={displayName} />
        <Typography color="#2b2d3a">{displayName}</Typography>
      </Stack>
      <Stack>
        <Button variant="contained" onClick={() => auth.signOut()}>
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  )
}
