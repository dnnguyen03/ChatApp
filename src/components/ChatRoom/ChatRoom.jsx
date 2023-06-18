import SideBar from "./SideBar"
import ChatWindow from "./ChatWindow"
import { Stack } from "@mui/material"

export default function ChatRoom() {
  return (
    <Stack direction="row" minHeight="100vh" height="100%">
      <SideBar />
      <ChatWindow />
    </Stack>
  )
}
