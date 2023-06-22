import { Avatar, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { AuthConText } from "../ConText/AuthProvider"

export default function Message(props) {
  const { photoUrl, displayname, timeSend, text, uidSend } = props
  const {
    user: { uid },
  } = useContext(AuthConText)
  const userSend = uid === uidSend
  return (
    <Stack
      color="white"
      direction={`${userSend ? "row" : "row-reverse"}`}
      gap={1}
      width="100%"
      m={`${userSend ? "8px 0 20px auto" : "8px 0 20px"}`}
      // m="0 8px 20px"
    >
      <Stack width="100%">
        <Stack
          direction={`${userSend ? "row" : "row-reverse"}`}
          gap={2}
          m={`${userSend ? "0 0 0 auto" : "0 auto 0 0"}`}
        >
          <Typography
            variant="h6"
            fontSize={14}
            color="#828282"
            letterSpacing="-.5px"
          >
            {timeSend}
          </Typography>
          <Typography>{displayname}</Typography>
        </Stack>
        <Stack
          width="fit-content"
          m={`${userSend ? "0 0 0 auto" : "0 auto 0 0"}`}
        >
          <Typography
            maxWidth="350px"
            bgcolor="#1976d2"
            color="white"
            p="4px 8px"
            borderRadius="10px"
            style={{ overflowWrap: "break-word" }}
          >
            {text}
          </Typography>
        </Stack>
      </Stack>
      <Avatar src={photoUrl} />
    </Stack>
  )
}
