import UserInfo from "./UserInfo"
import RoomList from "./RoomList"
import { Stack } from "@mui/material"

export default function SideBar() {
  return (
    <Stack
      className="SideBar"
      bgcolor="#e0e7eb"
      flex={1.3}
      p="10px 20px"
      borderRight="1px solid #ffffff"
    >
      <UserInfo />
      <RoomList />
    </Stack>
  )
}
