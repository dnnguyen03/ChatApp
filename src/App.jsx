import { HashRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"
import ChatRoom from "./components/ChatRoom/ChatRoom"
import AuthProvider from "./components/ConText/AuthProvider"

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
            {/* <Route path="/" element={<ChatRoom />} /> */}
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  )
}

export default App
