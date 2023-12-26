import { Button, Form, Input } from "antd";
import { LoginProps } from "../../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES, USER_ROUTES } from "../../routes/constants";
import { useAppDispatch } from "../../hooks/redux";
import authApi from "../../api/authApi";
import { appActions } from "../../redux/app/slice";
import { useMutation } from "@tanstack/react-query";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      dispatch(appActions.setUser(data));
      navigate(USER_ROUTES.home);
    },
  });

  const onFinish = (values: LoginProps) => {
    mutate(values);
  };

  return (
    <div className="py-8 px-10 rounded-[16px] shadow-2xl w-[560px] bg-white">
      <h2 className="text-center mb-10">Welcome back</h2>

      <Form
        name="basic"
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
            Login
          </Button>
        </Form.Item>

        <div className="flex justify-center gap-8 my-4">
          <a
            href="http://localhost:5000/auth/login/google"
            className="w-[48px] h-[48px] border border-solid border-slate-500 p-2 rounded-md hover:cursor-pointer"
          >
            <img
              src="./google.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </a>

          <a
            href="http://localhost:5000/auth/login/facebook"
            className="w-[48px] h-[48px] border border-solid border-slate-500 p-2 rounded-md hover:cursor-pointer"
          >
            <img
              src="./facebook.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </a>
        </div>

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
