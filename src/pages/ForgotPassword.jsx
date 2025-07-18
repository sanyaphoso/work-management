import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useState } from "react";
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

export default function ForgotPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleResetPassword = async (values) => {
    const { email } = values;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, // เส้นทางที่จะให้ผู้ใช้ไปรีเซ็ตรหัสผ่าน
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-purple-50 rounded-b-[100%] z-0"></div>
      <Row justify="center" className="w-full z-10 px-4">
        <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
          <div className="bg-white p-8 pb-0 rounded-lg shadow-lg">
            <div className="text-center border-b border-gray-200 dark:border-white10">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Forgot Password?
              </h2>
            </div>
            <div className="px-13 pt-8 pb-6">
              <p className="mb-4 dark:text-white60">
                Enter the email address you used when you joined and we’ll send
                you instructions to reset your password.
              </p>
              <Form
                layout="vertical"
                onFinish={handleResetPassword}
                form={form}
              >
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

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700"
                  >
                    Send Reset Instructions
                  </Button>
                </Form.Item>
              </Form>

              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

              <p className="text-sm text-center text-gray-500 mt-6">
                Return to{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>

            <Modal
              open={isSuccessModalOpen}
              footer={null}
              closable={false}
              centered
              onCancel={() => {
                setIsSuccessModalOpen(false);
                navigate("/forgot-password");
              }}
            >
              <div className="text-center p-6">
                <h2 className="text-2xl font-semibold mb-4 text-green-600">
                  Send Reset Instructions Successful!
                </h2>
                <p className="text-gray-700">
                  Please check your email to Reset your Password.
                </p>

                <Button
                  type="primary"
                  className="mt-6 w-full"
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate("/forgot-password");
                  }}
                >
                  Back to Forgot Password
                </Button>
              </div>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
}
