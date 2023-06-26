import { Button, Stack } from "@mui/material"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import { useContext, useLayoutEffect, useState } from "react"
import { AppContext } from "../ConText/AppProvider"
import Search from "antd/es/input/Search"

export default function RoomList() {
  const { rooms, setAddRoomVisible, setSelectedRoomId, selectedRoomId } =
    useContext(AppContext)
  const handleAddRoom = () => {
    setAddRoomVisible(true)
  }
  const [search, setSearch] = useState("")
  const [listRoom, setListRoom] = useState([])
  const onSearch = (e) => setSearch(e.target.value)
  rooms.sort((a, b) => b.createdAt - a.createdAt)
  useLayoutEffect(() => {
    let roomsRender = null
    if (search) {
      roomsRender = rooms.filter((room) =>
        room.nameRoom.toLowerCase().includes(search.toLowerCase())
      )
    } else {
      roomsRender = rooms
    }
    setListRoom(roomsRender)
  }, [rooms, search])
  return (
    <>
      <Stack className="action-room">
        <Search
          placeholder="Search room"
          onKeyUp={onSearch}
          style={{
            width: "100%",
          }}
        />
        <Button
          style={{ margin: "5px 0" }}
          variant="text"
          startIcon={<AddBoxOutlinedIcon />}
          onClick={handleAddRoom}
        >
          Add new room
        </Button>
      </Stack>
      <hr
        style={{
          height: "0.5px",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          margin: "0",
          border: "0",
        }}
      />
      <div className="RoomList">
        <Stack>
          {listRoom.map((room) => (
            <Stack
              key={room.id}
              borderBottom="1px solid rgba(0, 0, 0, 0.25)"
              borderLeft={`${
                selectedRoomId === room.id ? "5px solid #ea4b4b" : "none"
              }`}
              p="15px 8px"
              fontSize="18px"
              style={{
                cursor: "pointer",
                transition: "all 0.1s",
                backgroundImage: `${
                  selectedRoomId === room.id
                    ? "linear-gradient(to right, white, #e0e7eb)"
                    : "none"
                }`,
              }}
              onClick={() => {
                setSelectedRoomId(room.id)
              }}
            >
              {room.nameRoom}
            </Stack>
          ))}
        </Stack>
      </div>
    </>
  )
}
