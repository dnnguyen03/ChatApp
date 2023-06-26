import { Modal } from "antd"
import { useContext } from "react"
import { AppContext } from "../ConText/AppProvider"
import { Stack, Typography } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { AuthConText } from "../ConText/AuthProvider"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { deleteDocument, deleteRoomMessage } from "../../firebase/services"

export default function LeaveRoom() {
  const { modalLeave, setModalLeave, selectedRoomId, members, selectedRoom } =
    useContext(AppContext)
  const {
    user: { uid },
  } = useContext(AuthConText)

  const info = () => {
    Modal.info({
      title: "Can't leave the room",
      content: (
        <div>
          <p>You are the chat room owner you can't leave.</p>
          <p>
            If you want to leave, please transfer the admin to another member
          </p>
        </div>
      ),
      onOk() {},
    })
  }
  const handleOk = () => {
    if (selectedRoom.admin === uid) {
      if (members.length === 1) {
        deleteDocument("rooms", selectedRoomId)
        deleteRoomMessage("messages", selectedRoomId)
        setModalLeave(false)
        return
      } else {
        //
        info()
        setModalLeave(false)
        return
      }
    } else {
      const roomRef = doc(collection(db, "rooms"), selectedRoomId)
      updateDoc(roomRef, {
        members: [
          ...members.map((item) => item.uid).filter((id) => id !== uid),
        ],
      })
    }
    setModalLeave(false)
  }
  return (
    <>
      <Modal
        open={modalLeave}
        onOk={handleOk}
        onCancel={() => setModalLeave(false)}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={3}
          color="#f92727"
          gap={1}
        >
          <Typography fontSize="24px" textAlign="center">
            You want to leave
          </Typography>
          <ErrorOutlineIcon />
        </Stack>
      </Modal>
    </>
  )
}
