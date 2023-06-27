import { useContext } from "react"
import { auth } from "../../firebase/config"
import { AuthConText } from "../ConText/AuthProvider"

import { Avatar, Button, Stack, Typography } from "@mui/material"

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
        <Button
          variant="contained"
          sx={{
            fontSize: { sm: 14, xs: 12 },
            padding: { md: "5px 10px", xs: "3px" },
            marginLeft: "10px",
          }}
          onClick={() => auth.signOut()}
        >
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  )
}
