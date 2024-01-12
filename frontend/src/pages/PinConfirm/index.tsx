import { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { USER_ROUTES } from "../../routes/constants";
import { NotificationContext } from "../../contexts/notification";

const PinConfirm = () => {
  const user = useAppSelector((state) => state.app.user);
  console.log("🚀 ~ PinConfirm ~ user:", user);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const apiNotification = useContext(NotificationContext);

  const [form] = useForm();

  const onFinish = (values: any) => {
    if (values.pin === user?.pin) {
      navigate(USER_ROUTES.home);
      apiNotification.success({
        message: "Sign up successfully",
      });
    } else {
      setError("Your pin is not correct");
    }
  };

  return (
    <div className="py-8 px-10 rounded-[16px] shadow-2xl w-[560px] bg-white">
      <h2 className="text-center mb-10">Confirm your account</h2>

      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Your pin"
          name="pin"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Enter pin" />
        </Form.Item>

        {error && (
          <span className="text-red-500 mb-4 inline-block">{error}</span>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 rounded-3xl mt-2"
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PinConfirm;
