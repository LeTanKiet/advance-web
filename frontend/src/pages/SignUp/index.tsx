import { Button, Form, Input } from "antd";
import { SignUpProps } from "../../types/auth";
import { Link } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../routes/constants";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/authApi";
import { useAppDispatch } from "../../hooks/redux";
import { appActions } from "../../redux/app/slice";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      dispatch(appActions.setUser(data));
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
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

        {error && (
          <p className="text-red-500 mb-4">{(error as any).response.data}</p>
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
