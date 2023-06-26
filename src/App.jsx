import { HashRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import ChatRoom from "./components/ChatRoom/ChatRoom"
import AuthProvider from "./components/ConText/AuthProvider"
import AppProvider from "./components/ConText/AppProvider"
import AddRoomModal from "./components/Modal/AddRoomModal"
import InviteMemberModal from "./components/Modal/InviteMemberModal"
import LeaveRoom from "./components/Modal/LeaveRoom"
import MembersModal from "./components/Modal/MembersModal"

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ChatRoom />} />
            </Routes>
            <AddRoomModal />
            <InviteMemberModal />
            <LeaveRoom />
            <MembersModal />
          </AppProvider>
        </AuthProvider>
      </HashRouter>
    </div>
  )
}

export default App
