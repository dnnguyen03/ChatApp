import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<ChatRoom />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
