import { createContext, useContext, useMemo, useState } from "react"
import useFirestore from "../../firebase/useFirestore"
import { AuthConText } from "./AuthProvider"

export const AppContext = createContext()

export default function AppProvider({ children }) {
  const [addRoomVisible, setAddRoomVisible] = useState(false)

  const [inviteMemberVisible, setInviteMemberVisible] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState("")

  const {
    user: { uid },
  } = useContext(AuthConText)

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    }
  }, [uid])

  const rooms = useFirestore("rooms", roomsCondition)

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  )

  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    }
  }, [selectedRoom.members])

  const members = useFirestore("users", usersCondition)

  const clearState = () => {
    setSelectedRoomId("")
    setAddRoomVisible(false)
    setInviteMemberVisible(false)
  }

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        addRoomVisible,
        setAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        inviteMemberVisible,
        setInviteMemberVisible,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
