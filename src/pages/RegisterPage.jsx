import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
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

import AgreementModalContent from "../components/AgreementModalContent";
// import PasswordField from "../components/PasswordField";

export default function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  // const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);
  const password = Form.useWatch("password", form) || "";

  const handleRegister = async () => {
    try {
      const values = await form.validateFields(); // ✅ ดึงข้อมูลจาก Form โดยตรง
      const { name, email, password } = values;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setIsSuccessModalOpen(true); // ✅ แสดง modal แทน alert
      }
    } catch {
      // ไม่ต้องทำอะไร – AntD แสดง error เอง
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + '/home', // แนะนำสำหรับ OAuth
      }
    });
    if (error) {
      alert('Google Login failed: ' + error.message)
    }
  };

  const PasswordChecklist = ({ password }) => {
    const conditions = [
      { label: "At least 6 characters", passed: password.length >= 6 },
      {
        label: "At least one lowercase letter",
        passed: /[a-z]/.test(password),
      },
      {
        label: "At least one uppercase letter",
        passed: /[A-Z]/.test(password),
      },
      { label: "At least one number", passed: /[0-9]/.test(password) },
      {
        label: "At least one special character",
        passed: /[\W_]/.test(password),
      },
    ];

    return (
      <ul className="mt-2 text-sm space-y-1">
        {conditions.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.passed ? (
              <CheckOutlined className="text-green-500" />
            ) : (
              <CloseOutlined className="text-red-500" />
            )}
            <span className={item.passed ? "text-green-600" : "text-red-600"}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-purple-50 rounded-b-[100%] z-0"></div>

      <Row justify="center" className="w-full z-10 px-4">
        <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
          {/* <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none"> */}
          <div className="bg-white p-8 pb-0 rounded-lg shadow-lg">
            <div className="text-center border-b border-gray-200 dark:border-white10">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Sign Up
              </h2>
            </div>
            <div className="px-10 pt-8 pb-6">
              <Form form={form} layout="vertical" onFinish={handleRegister}>
                <Form.Item
                  label={<span className="font-medium">Name</span>}
                  name="name"
                  rules={[
                    { required: true, message: "Please input your Full name!" },
                  ]}
                >
                  <Input
                    placeholder="Full name"
                    className="w-full h-12 text-base"
                  />
                </Form.Item>

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
                    { required: true, message: "Please input your Password!" },
                    {
                      validator: (_, value) => {
                        const val = value || "";
                        const isValid =
                          val.length >= 6 &&
                          /[a-z]/.test(val) &&
                          /[A-Z]/.test(val) &&
                          /[0-9]/.test(val) &&
                          /[\W_]/.test(val);

                        return isValid
                          ? Promise.resolve()
                          : Promise.reject(
                              "Password does not meet all requirements."
                            );
                      },
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    className="w-full h-12 text-base"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                </Form.Item>

                {/* แสดง PasswordChecklist แยกนอก Form.Item เพื่อไม่รบกวนการ binding */}
                {(focused || password.length > 0) && (
                  <PasswordChecklist password={password} />
                )}

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "You must accept the Terms and Privacy Policy"
                              )
                            ),
                    },
                  ]}
                >
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Checkbox />
                    <span>
                      Creating an account means you’re okay with our{" "}
                      <a
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Terms of Service and Privacy Policy
                      </a>
                    </span>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700"
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

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
                Already have an account?{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </p>
            </div>

            {/* Modal แสดง Terms & Privacy */}
            <Modal
              title="Terms & Privacy Policy"
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              width={700}
            >
              <AgreementModalContent />
            </Modal>

            <Modal
              open={isSuccessModalOpen}
              footer={null}
              closable={false}
              centered
              onCancel={() => {
                setIsSuccessModalOpen(false);
                navigate("/");
              }}
            >
              <div className="text-center p-6">
                <h2 className="text-2xl font-semibold mb-4 text-green-600">
                  Registration Successful!
                </h2>
                <p className="text-gray-700">
                  Please check your email to confirm your account before logging
                  in.
                </p>

                <Button
                  type="primary"
                  className="mt-6 w-full"
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate("/");
                  }}
                >
                  Back to Login
                </Button>
              </div>
            </Modal>
            
          </div>
        </Col>
      </Row>
    </div>
  );
}
