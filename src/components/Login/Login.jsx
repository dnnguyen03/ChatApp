import { useState } from "react"
import { Button, Col, Row, Typography } from "antd"
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth"
import { auth } from "../../firebase/config"
const { Title } = Typography

export default function Login() {
  const [user, setUser] = useState(null)

  const handleFBLogin = () => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // Xử lý thông tin người dùng
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        // Xử lý lỗi
        console.log(error)
      })
  }

  return (
    <div className="Login">
      <Row justify="center" style={{ height: "800px" }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }}>Fun Chat</Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFBLogin}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  )
}
