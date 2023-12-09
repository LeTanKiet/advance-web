import { Button, Form, Input, notification } from "antd";
import { LoginProps } from "../../types/auth";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import authApi from "../../api/authApi";
import { appActions } from "../../redux/app/slice";
import { useMutation } from "@tanstack/react-query";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.app.user);
  const [api, contextHolder] = notification.useNotification();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => authApi.updateProfile(data),

    onSuccess: (data) => {
      dispatch(appActions.setUser(data));
      api.success({
        message: "Profile updated",
      });
    },
  });

  const onFinish = (values: LoginProps) => {
    mutate({ ...user, ...values });
  };

  return (
    <div>
      <h2 className="mt-8 mb-4">Update your profile</h2>

      <Form
        name="basic"
        initialValues={{ ...user }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="max-w-[600px]"
      >
        {contextHolder}
        <Form.Item<LoginProps>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
