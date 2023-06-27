import { useContext, useState } from "react"

import { Stack, TextField } from "@mui/material"
import { Modal } from "antd"
import { AppContext } from "../ConText/AppProvider"
import { db } from "../../firebase/config"
import { collection, doc, updateDoc } from "firebase/firestore"

export default function EditRoomName(props) {
  const { selectedRoom } = useContext(AppContext)
  const { editRoomNameModal, setEditRoomNameModal } = props
  const [valueInput, setValueInput] = useState("")
  const onChangeInput = (e) => {
    setValueInput(e.target.value)
  }

  const handleOk = () => {
    const roomRef = doc(collection(db, "rooms"), selectedRoom.id)
    updateDoc(roomRef, {
      nameRoom: valueInput,
    })
    setValueInput("")
    setEditRoomNameModal(false)
  }
  return (
    <>
      <Modal
        title="Edit room name"
        open={editRoomNameModal}
        onOk={handleOk}
        onCancel={() => setEditRoomNameModal(false)}
      >
        <form onSubmit={handleOk} style={{ width: "100%" }}>
          <TextField
            required
            type="text"
            value={valueInput}
            fullWidth
            label="New name"
            onChange={onChangeInput}
          />
        </form>
      </Modal>
    </>
  )
}
