import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// ✅ ส่วนย่อย: แสดง checklist เงื่อนไข
const PasswordChecklist = ({ password }: { password: string }) => {
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

// ✅ ส่วนหลัก: Input + Checklist + Validation
const PasswordField = () => {
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState(false);

  return (
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
              : Promise.reject("Password does not meet all requirements.");
          },
        },
      ]}
    >
      <>
        <Input.Password
          placeholder="Password"
          className="w-full h-12 text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {(focused || password.length > 0) && (
          <PasswordChecklist password={password} />
        )}
      </>
    </Form.Item>
  );
};

export default PasswordField;