import { Button, Stack, TextField, Typography, styled } from "@mui/material"
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import Message from "./Message"

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& label": {
    color: "#ffffff",
  },
  "& input": {
    color: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
})

export default function ChatWindow() {
  return (
    <Stack flex={4} bgcolor="#212121">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #ffffff"
        color="#ffffff"
        p="10px 15px"
      >
        <Typography fontSize="24px">Room 1</Typography>
        <Stack direction="row" gap={3}>
          <Button
            size="medium"
            variant="contained"
            startIcon={<PersonAddAltRoundedIcon />}
          >
            Add
          </Button>
          <AvatarGroup max={3}>
            <Avatar alt="Remy Sharp" src="/" />
            <Avatar alt="Travis Howard" src="/" />
            <Avatar alt="Cindy Baker" src="/" />
            <Avatar alt="Agnes Walker" src="/" />
            <Avatar alt="Trevor Henderson" src="/" />
          </AvatarGroup>
        </Stack>
      </Stack>
      <Stack
        max-height="100%"
        height="100%"
        overflow="scroll"
        justifyContent="flex-end"
      >
        <Message
          photoUrl="null"
          displayname="Nguyen"
          timeSend="17/6/2023"
          text="hello"
        ></Message>
        <Stack component="form" autoComplete="off" direction="row">
          <CssTextField fullWidth label="Enter a message" />
          <Button variant="contained">Send</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
