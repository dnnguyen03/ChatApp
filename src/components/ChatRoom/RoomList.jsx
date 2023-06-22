import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import GroupsIcon from "@mui/icons-material/Groups"
import { useContext } from "react"
import { AppContext } from "../ConText/AppProvider"

export default function RoomList() {
  const { rooms, setAddRoomVisible, setSelectedRoomId } = useContext(AppContext)
  const handleAddRoom = () => {
    setAddRoomVisible(true)
  }
  rooms.sort((a, b) => b.createdAt - a.createdAt)
  return (
    <div className="RoomList">
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <GroupsIcon />
          <Typography ml={2}> Group </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {rooms.map((room) => (
            <Typography
              sx={{ cursor: "pointer" }}
              pl="8px"
              mb="5px"
              key={room.id}
              onClick={() => {
                setSelectedRoomId(room.id)
              }}
            >
              {room.nameRoom}
            </Typography>
          ))}

          <Button
            variant="text"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={handleAddRoom}
          >
            Add new room
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
