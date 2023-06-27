import { useContext } from "react"
import { AuthConText } from "../ConText/AuthProvider"

import { Avatar, Stack, Typography } from "@mui/material"

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
    >
      <Stack width="100%">
        <Stack
          direction={`${userSend ? "row" : "row-reverse"}`}
          gap={2}
          m={`${userSend ? "0 0 0 auto" : "0 auto 0 0"}`}
        >
          <Typography
            variant="h6"
            fontSize={{ md: 14, xs: 12 }}
            color="#828282"
            letterSpacing="-.5px"
          >
            {timeSend}
          </Typography>
          <Typography color="#2b2d3a">{displayname}</Typography>
        </Stack>
        <Stack
          width="fit-content"
          m={`${userSend ? "0 0 0 auto" : "0 auto 0 0"}`}
        >
          <Typography
            maxWidth={{ md: "350px", xs: "200px" }}
            bgcolor={`${userSend ? "#ea4b4b" : "#e0e7eb"} `}
            color={`${userSend ? "white" : "#2b2d3a"}`}
            p="4px 8px"
            borderRadius="12px"
            boxShadow={`${
              userSend
                ? "0px 0px 2px 1px rgba(234, 75, 75, 0.8)"
                : "0px 0px 15px 1px rgba(224, 231, 235, 0.8)"
            }`}
            style={{ overflowWrap: "break-word" }}
            fontSize={{ md: "1rem", xs: "13px" }}
          >
            {text}
          </Typography>
        </Stack>
      </Stack>
      <Avatar src={photoUrl} />
    </Stack>
  )
}
