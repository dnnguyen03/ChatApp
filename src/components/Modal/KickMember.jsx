import { Modal, Typography } from "antd"
import { Stack } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useContext } from "react"
import { AppContext } from "../ConText/AppProvider"

export default function KickMember(props) {
  const { selectedRoomId, members } = useContext(AppContext)
  const { kickModal, setKickModal, selectedUser } = props
  const handleOk = () => {
    const roomRef = doc(collection(db, "rooms"), selectedRoomId)
    updateDoc(roomRef, {
      members: [
        ...members
          .map((item) => item.uid)
          .filter((id) => id !== selectedUser.uid),
      ],
    })
    setKickModal(false)
  }

  return (
    <>
      <Modal
        open={kickModal}
        onOk={handleOk}
        onCancel={() => setKickModal(false)}
        zIndex={10000}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={3}
          color="#f92727"
          gap={1}
        >
          <Typography fontSize="24px">
            You want to kick <b>{selectedUser.displayName}</b>
          </Typography>
          <ErrorOutlineIcon />
        </Stack>
      </Modal>
    </>
  )
}
