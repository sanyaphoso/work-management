import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  Typography,
} from "antd";

export default function AuthPage() {
  const navigate = useNavigate()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/home"); // 👉 ไปหน้าหลักทันที
      }
    });
  }, []);
      
  const handleEmailLogin = async (values) => {
    const email = values.email;
    const password = values.password;

    // ✅ บันทึกการเลือก "Keep me logged in"
    localStorage.setItem("rememberMe", keepLoggedIn ? "true" : "false");

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      alert('Login failed: ' + error.message)
    } else {
      navigate('/home')
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/home', // แนะนำสำหรับ OAuth
      }
    })

    if (error) {
      alert('Google Login failed: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-purple-50 rounded-b-[100%] z-0"></div>
      <Row justify="center" className="w-full z-10 px-4">
        <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
          <div className="bg-white p-8 pb-0 rounded-lg shadow-lg">
            <div className="text-center border-b border-gray-200 dark:border-white10">
              <h2 className="text-2xl font-semibold text-center mb-6">
                🔐 Login
              </h2>
            </div>
            <div className="px-10 pt-8 pb-6">
              <Form layout="vertical" onFinish={handleEmailLogin}>
                <Form.Item
                  label={<span className="font-medium">Email address</span>}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    placeholder="name@example.com"
                    className="w-full h-12 text-base"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="font-medium">Password</span>}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="w-full h-12 text-base"
                  />
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-between items-center">
                    <Checkbox 
                      className="text-sm"
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    >
                      Keep me logged in
                    </Checkbox>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700"
                  >
                    Login
                  </Button>
                </Form.Item>

              </Form>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-sm text-gray-500">
                  Or continue with
                </span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 border border-gray-300 p-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="h-5 w-5"
                  />
                  Google
                </button>
              </div>

              <p className="text-sm text-center text-gray-500 mt-6">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register here
                </Link>
              </p>

            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
