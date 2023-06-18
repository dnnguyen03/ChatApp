import { Avatar, Stack, Typography } from "@mui/material"

export default function Message(props) {
  const { photoUrl, displayname, timeSend, text } = props
  return (
    <Stack>
      <Stack color="white" direction="row" gap={1} alignItems="center">
        <Avatar src={photoUrl} />
        <Typography>{displayname}</Typography>
        <Typography>{timeSend}</Typography>
      </Stack>
      <Stack>
        <Typography color="white">{text}</Typography>
      </Stack>
    </Stack>
  )
}
