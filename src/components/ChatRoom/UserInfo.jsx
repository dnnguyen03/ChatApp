import { Avatar, Button, Stack, Typography } from "@mui/material"
import { auth } from "../../firebase/config"

export default function UserInfo() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack>
        <Avatar /> <Typography>abc</Typography>
      </Stack>
      <Stack>
        <Button variant="contained" onClick={() => auth.signOut()}>
          Đăng xuất
        </Button>
      </Stack>
    </Stack>
  )
}
