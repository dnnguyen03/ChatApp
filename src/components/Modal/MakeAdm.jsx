import { Modal, Typography } from "antd"
import { Stack } from "@mui/material"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useContext } from "react"
import { AppContext } from "../ConText/AppProvider"

export default function KickMember(props) {
  const { selectedRoomId } = useContext(AppContext)
  const { makeAdmModal, setMakeAdmModal, selectedUser } = props
  const handleOk = () => {
    const roomRef = doc(collection(db, "rooms"), selectedRoomId)
    updateDoc(roomRef, {
      admin: selectedUser.uid,
    })
    setMakeAdmModal(false)
  }

  return (
    <>
      <Modal
        open={makeAdmModal}
        onOk={handleOk}
        onCancel={() => setMakeAdmModal(false)}
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
            You want to change admin to <b>{selectedUser.displayName}</b>
          </Typography>
          <ErrorOutlineIcon />
        </Stack>
      </Modal>
    </>
  )
}
