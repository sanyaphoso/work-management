import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const PasswordChecklist = ({ password }) => {
    const conditions = [
        { label: "At least 6 characters", passed: password.length >= 6 },
        { label: "At least one lowercase letter", passed: /[a-z]/.test(password) },
        { label: "At least one uppercase letter", passed: /[A-Z]/.test(password) },
        { label: "At least one number", passed: /[0-9]/.test(password) },
        { label: "At least one special character", passed: /[\W_]/.test(password) },
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

export default function UpdatePassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleUpdatePassword = async (values) => {
    const { password } = values;
    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    setIsSubmitting(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  // optional: validate session (optional)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        Modal.warning({
          title: "Session expired",
          content: "Please go through the reset password process again.",
          onOk: () => navigate("/forgot-password"),
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-purple-50 rounded-b-[100%] z-0"></div>
      <Row justify="center" className="w-full z-10 px-4">
        <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
          <div className="bg-white p-8 pb-0 rounded-lg shadow-lg">
            <div className="text-center border-b border-gray-200 dark:border-white10">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Set New Password
              </h2>
            </div>
            <div className="px-13 pt-8 pb-6">
              <Form layout="vertical" onFinish={handleUpdatePassword} form={form}>
                <Form.Item
                  label={<span className="font-medium">New Password</span>}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter new password"
                    className="w-full h-12 text-base"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <PasswordChecklist password={password} />

                <Form.Item className="mt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700"
                  >
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
              {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

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
                    Update Password Successful!
                    </h2>

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
          </div>
        </Col>
      </Row>
    </div>
  );
}
