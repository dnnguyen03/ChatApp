import { useContext, useState } from "react"
import { AppContext } from "../ConText/AppProvider"
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material"
import styled from "styled-components"
import CloseIcon from "@mui/icons-material/Close"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

import { Dropdown, List, Space } from "antd"
import KickMember from "./KickMember"
import MakeAdm from "./MakeAdm"
import { AuthConText } from "../ConText/AuthProvider"

const CssBoxModal = styled(Box)({
  maxHeight: "380px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  boxShadow: 24,
  outline: "none",
  padding: "20px",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 15,
  overflowY: "auto",
  overflowX: "hidden",

  "& .closeModal": {
    cursor: "pointer",
  },
})
export default function MembersModal() {
  const { setModalMembers, modalMembers, members, selectedRoom } =
    useContext(AppContext)
  const {
    user: { uid },
  } = useContext(AuthConText)
  const [kickModal, setKickModal] = useState(false)
  const [makeAdmModal, setMakeAdmModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const items = [
    {
      label: (
        <Typography
          display="flex"
          gap={1.5}
          onClick={() => setMakeAdmModal(true)}
        >
          <ManageAccountsIcon /> Make admin
        </Typography>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Typography
          display="flex"
          gap={1.5}
          color="#f92727"
          onClick={() => setKickModal(true)}
        >
          <DeleteForeverIcon />
          Kick
        </Typography>
      ),
      key: "1",
    },
  ]
  const handleUidUser = (uid, displayName) => {
    setSelectedUser({ uid, displayName })
  }

  return (
    <>
      <Modal open={modalMembers}>
        <CssBoxModal>
          <Stack
            position="absolute"
            top={8}
            right={8}
            onClick={() => setModalMembers(false)}
          >
            <CloseIcon className="closeModal" />
          </Stack>

          <Typography textAlign="center" variant="h5">
            Members
          </Typography>
          <List>
            {members?.map((item) => (
              <ListItem
                key={item.uid}
                alignItems="center"
                style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.25)" }}
              >
                <ListItemAvatar>
                  <Avatar src={item.photoURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.displayName}
                  style={{ marginRight: "20px" }}
                />
                {selectedRoom.admin !== item.uid &&
                  uid === selectedRoom.admin && (
                    <Dropdown
                      menu={{ items }}
                      trigger={["click"]}
                      zIndex={10000}
                    >
                      <Space>
                        <MoreHorizIcon
                          onClick={() =>
                            handleUidUser(item.uid, item.displayName)
                          }
                        />
                      </Space>
                    </Dropdown>
                  )}
              </ListItem>
            ))}
          </List>
        </CssBoxModal>
      </Modal>
      <KickMember
        selectedUser={selectedUser}
        setKickModal={setKickModal}
        kickModal={kickModal}
      ></KickMember>
      <MakeAdm
        makeAdmModal={makeAdmModal}
        setMakeAdmModal={setMakeAdmModal}
        selectedUser={selectedUser}
      ></MakeAdm>
    </>
  )
}
