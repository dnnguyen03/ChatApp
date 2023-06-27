import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { AppContext } from "../ConText/AppProvider"
import { AuthConText } from "../ConText/AuthProvider"
import { addDocument } from "../../firebase/services"
import useFirestore from "../../firebase/useFirestore"
import Message from "./Message"

import { Button, Stack, TextField, Typography } from "@mui/material"
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import SendIcon from "@mui/icons-material/Send"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import GroupIcon from "@mui/icons-material/Group"
import LogoutIcon from "@mui/icons-material/Logout"
import EditIcon from "@mui/icons-material/Edit"

import { Alert, Dropdown, Space } from "antd"

import { format } from "date-fns"
import EditRoomName from "../Modal/EditRoomName"

export default function ChatWindow() {
  const {
    selectedRoom,
    members,
    setInviteMemberVisible,
    setModalLeave,
    setModalMembers,
  } = useContext(AppContext)
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthConText)
  const [editRoomNameModal, setEditRoomNameModal] = useState(false)
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
    } else {
      return false
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

  //data dropdown
  const items = [
    {
      label: (
        <Button
          fullWidth
          startIcon={<EditIcon />}
          variant="text"
          onClick={() => setEditRoomNameModal(true)}
        >
          edit room name
        </Button>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button
          fullWidth
          startIcon={<GroupIcon />}
          variant="text"
          onClick={() => setModalMembers(true)}
        >
          members
        </Button>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          variant="text"
          onClick={() => setModalLeave(true)}
        >
          leave
        </Button>
      ),
      key: "2",
    },
  ]

  return (
    <Stack flex={4} bgcolor="white" overflow="hidden">
      {selectedRoom.id ? (
        <>
          <Stack
            ref={inForRoomRef}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="0.5px solid rgba(0, 0, 0, 0.25)"
            color="#212121"
            p="10px 15px"
            position="sticky"
            top={0}
            zIndex={2}
          >
            <Typography
              fontSize="24px"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              maxWidth="35ch"
            >
              {selectedRoom.nameRoom}
            </Typography>
            <Stack
              direction="row"
              gap={3}
              justifyContent="center"
              alignItems="center"
            >
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
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Space>
                  <MoreHorizIcon />
                </Space>
              </Dropdown>
            </Stack>
          </Stack>
          <Stack
            ref={windowRef}
            position="relative"
            p={{ md: "0 15px", xs: "0 5px" }}
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
            <TextField
              type="text"
              value={valueInput}
              fullWidth
              onChange={handleInputChang}
              variant="filled"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleOnSubmit()
                }
              }}
              label="Enter a message"
            />

            <Button
              variant="contained"
              style={{ backgroundColor: "#ea4b4b" }}
              onClick={(e) => {
                e.preventDefault()
                handleOnSubmit()
              }}
              type="submit"
            >
              <SendIcon />
            </Button>
          </Stack>
          <EditRoomName
            editRoomNameModal={editRoomNameModal}
            setEditRoomNameModal={setEditRoomNameModal}
          />
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
