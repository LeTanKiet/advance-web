import { Button, Form, Input, Radio } from "antd";
import { SignUpProps } from "../../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../routes/constants";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/authApi";
import { useAppDispatch } from "../../hooks/redux";

import { appActions } from "../../redux/app/slice";
import { Role } from "../../utils/enum";
import { useForm, useWatch } from "antd/es/form/Form";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = useForm();
  const role = useWatch("role", form);

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      dispatch(appActions.setUser(data));
      navigate(PUBLIC_ROUTES.pinConfirm);
    },
  });

  const onFinish = (values: SignUpProps) => {
    mutate(values);
  };

  return (
    <div className="py-8 px-10 rounded-[16px] shadow-2xl w-[560px] bg-white">
      <h2 className="text-center mb-10">Welcome</h2>

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
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item<SignUpProps>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item<SignUpProps>
          label="Confirm password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input your confirm password!" },
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[
            { required: true, message: "Please input your confirm password!" },
          ]}
        >
          <Radio.Group>
            <Radio value={Role.STUDENT}>Student</Radio>
            <Radio value={Role.TEACHER}>Teacher</Radio>
          </Radio.Group>
        </Form.Item>

        {role === Role.STUDENT && (
          <Form.Item<SignUpProps>
            label="Student ID"
            name="studentId"
            rules={[
              { required: true, message: "Please input your student id!" },
            ]}
          >
            <Input placeholder="Enter student id" />
          </Form.Item>
        )}

        {error && (
          <p className="text-red-500 mb-4">
            {(error as any).response.data.message}
          </p>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 rounded-3xl mt-2"
            loading={isPending}
          >
            Sign up
          </Button>
        </Form.Item>

        <div className="text-center">
          Have an account?
          <Link
            to={PUBLIC_ROUTES.signIn}
            className="text-blue-500 ml-2 font-semibold"
          >
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
