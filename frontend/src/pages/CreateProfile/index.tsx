import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { SignUpProps } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { USER_ROUTES } from "../../routes/constants";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { appActions } from "../../redux/app/slice";
import { useForm } from "antd/es/form/Form";

const CreateProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.app.user);
  const navigate = useNavigate();

  const [form] = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      dispatch(appActions.setUser(data));
      navigate(USER_ROUTES.home);
    },
  });

  const onFinish = (values: SignUpProps) => {
    mutate(values);
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  return (
    <div className="py-8 px-10 rounded-[16px] shadow-2xl w-[560px] bg-white">
      <h2 className="text-center mb-10">Create a new account</h2>

      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item<SignUpProps>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpProps>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<SignUpProps>
          label="Confirm password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input your confirm password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 rounded-3xl mt-2"
            loading={isPending}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProfile;
