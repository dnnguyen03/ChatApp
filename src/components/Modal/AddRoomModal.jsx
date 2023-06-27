import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material"
import { useContext } from "react"
import { AppContext } from "../ConText/AppProvider"
import CloseIcon from "@mui/icons-material/Close"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { AuthConText } from "../ConText/AuthProvider"
import { addDocument } from "../../firebase/services"

export default function AddRoomModal() {
  const { addRoomVisible, setAddRoomVisible } = useContext(AppContext)
  const {
    user: { uid },
  } = useContext(AuthConText)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  })

  const CssBoxModal = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: 24,
    outline: "none",
    padding: "20px 45px",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 15,

    "& .closeModal": {
      cursor: "pointer",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 15,
    },
  })
  const currentTime = new Date().getTime()
  const onSubmit = (data) => {
    addDocument("rooms", {
      ...data,
      members: [uid],
      createdAt: currentTime,
      admin: uid,
    })
    setAddRoomVisible(false)
    reset()
  }

  return (
    <Modal open={addRoomVisible}>
      <CssBoxModal width={{ md: "auto", xs: "60%" }}>
        <Stack
          position="absolute"
          top={8}
          right={8}
          onClick={() => setAddRoomVisible(false)}
        >
          <CloseIcon className="closeModal" />
        </Stack>

        <Typography textAlign="center" variant="h5">
          Add new room
        </Typography>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%" }}
        >
          <TextField
            fullWidth
            label="Room name"
            type="text"
            required
            {...register("nameRoom")}
            // error={errors.nameRoom}
            // helperText={errors.nameRoom?.message}
          />

          <Button
            sx={{ width: "fit-content", ml: "auto" }}
            variant="contained"
            type="submit"
          >
            Add
          </Button>
        </form>
      </CssBoxModal>
    </Modal>
  )
}
