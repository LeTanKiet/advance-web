import { Button, Form, Input } from "antd";
import { LoginProps } from "../../types/auth";
import { Link } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../routes/constants";
import { useAppDispatch } from "../../hooks/redux";
import authApi from "../../api/authApi";
import { appActions } from "../../redux/app/slice";
import { useMutation } from "@tanstack/react-query";

const SignIn = () => {
  const dispatch = useAppDispatch();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data: any) => {
      dispatch(appActions.setUser(data));
      localStorage.setItem("token", data.refreshToken);
    },
  });
  console.log("🚀 ~ file: index.tsx:20 ~ SignIn ~ error:", error);

  const onFinish = (values: LoginProps) => {
    mutate(values);
  };

  return (
    <div className="py-8 px-10 rounded-[16px] shadow-2xl w-[560px] bg-white">
      <h2 className="text-center mb-10">Welcome back</h2>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<LoginProps>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginProps>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
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
            Login
          </Button>
        </Form.Item>

        <div className="text-center">
          Didn't have an account?
          <Link
            to={PUBLIC_ROUTES.signUp}
            className="text-blue-500 ml-2 font-semibold"
          >
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
