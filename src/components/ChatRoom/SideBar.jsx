import UserInfo from "./UserInfo"
import RoomList from "./RoomList"
import { Stack } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useEffect, useState } from "react"
import "./SideBar.css"

export default function SideBar() {
  const [toggle, setToggle] = useState(false)
  const toggleClick = () => {
    setToggle(!toggle)
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setToggle(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return (
    <Stack
      className="SideBar"
      bgcolor="#e0e7eb"
      flex={1.3}
      p="0 20px"
      borderRight="1px solid #ffffff"
      position="relative"
      minHeight="100%"
      maxWidth="500px"
      sx={{
        translate: `${toggle ? "-100% 0" : "0"}`,
      }}
    >
      <UserInfo />
      <RoomList />
      <Stack
        className="switch"
        bgcolor="#e0e7eb"
        position="absolute"
        p={1}
        top="50%"
        right="-28px"
        display="none"
        sx={{
          cursor: "pointer",
          borderTopRightRadius: "50%",
          borderBottomRightRadius: "50%",
        }}
        onClick={toggleClick}
      >
        {toggle ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
      </Stack>
    </Stack>
  )
}
