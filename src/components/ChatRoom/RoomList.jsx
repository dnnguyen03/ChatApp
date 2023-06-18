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

export default function RoomList() {
  return (
    <div className="RoomList">
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <GroupsIcon />
          <Typography ml={2}> Group </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Room 1</Typography>
          <Typography>Room 2</Typography>
          <Typography>Room 3</Typography>
          <Button variant="text" startIcon={<AddBoxOutlinedIcon />}>
            Thêm phòng
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
