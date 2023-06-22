import { Button, Stack, TextField, Typography, styled } from "@mui/material"
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import Message from "./Message"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { AppContext } from "../ConText/AppProvider"
import { Alert } from "antd"
import { addDocument } from "../../firebase/services"
import { AuthConText } from "../ConText/AuthProvider"
import useFirestore from "../../firebase/useFirestore"
import { format } from "date-fns"
import { auth } from "../../firebase/config"

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
  const { selectedRoom, members, setInviteMemberVisible } =
    useContext(AppContext)
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthConText)
  const [valueInput, setValueInput] = useState("")
  const inForRoomRef = useRef()
  const divRef = useRef()
  const windowRef = useRef()
  const formRef = useRef()
  const handleInputChang = (e) => {
    setValueInput(e.target.value)
  }
  const currentTime = new Date().getTime()

  const handleOnSubmit = () => {
    if (valueInput.trim() !== "") {
      addDocument("messages", {
        text: valueInput,
        uid,
        photoURL,
        roomId: selectedRoom.id,
        displayName,
        timeSend: format(new Date(), "PPPP"),
        createdAt: currentTime,
      })
      setValueInput("")
    }
  }
  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  )

  const messages = useFirestore("messages", condition)
  messages.sort((a, b) => a.createdAt - b.createdAt)

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "auto" })
    // divRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <Stack flex={4} bgcolor="#212121" overflow="hidden">
      {selectedRoom.id ? (
        <>
          <Stack
            ref={inForRoomRef}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #ffffff"
            color="#ffffff"
            p="10px 15px"
            position="sticky"
            top={0}
            zIndex={2}
            bgcolor="#212121"
          >
            <Typography fontSize="24px">{selectedRoom.nameRoom}</Typography>
            <Stack direction="row" gap={3}>
              <Button
                size="medium"
                variant="contained"
                startIcon={<PersonAddAltRoundedIcon />}
                onClick={() => setInviteMemberVisible(true)}
              >
                Add
              </Button>
              <AvatarGroup max={3}>
                {members.map((item) => (
                  <Avatar
                    key={item.uid}
                    alt={item.displayName}
                    src={item.photoURL}
                  />
                ))}
              </AvatarGroup>
            </Stack>
          </Stack>
          <Stack
            ref={windowRef}
            position="relative"
            height={
              inForRoomRef.current
                ? `calc(100vh - ${
                    inForRoomRef.current.offsetHeight +
                    formRef.current.offsetHeight
                  }px)`
                : "auto"
            }
            sx={{ overflowY: "auto", overflowX: "hidden" }}
          >
            {messages.map((mes) => (
              <Message
                key={mes.id}
                photoUrl={mes.photoURL}
                displayname={mes.displayName}
                timeSend={mes.timeSend}
                text={mes.text}
                uidSend={mes.uid}
              ></Message>
            ))}
            <div ref={divRef}></div>
          </Stack>
          <Stack
            ref={formRef}
            component="form"
            autoComplete="off"
            direction="row"
          >
            <CssTextField
              value={valueInput}
              fullWidth
              onChange={handleInputChang}
              onKeyDown={(e) => {
                e.key === "Enter" && handleOnSubmit()
              }}
              placeholder="Enter a message"
            />
            <Button variant="contained" onClick={handleOnSubmit} type="submit">
              Send
            </Button>
          </Stack>
        </>
      ) : (
        <Alert
          message="Please select a room"
          type="info"
          showIcon
          closable
          style={{ fontSize: "18px" }}
        ></Alert>
      )}
    </Stack>
  )
}
