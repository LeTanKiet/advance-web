import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useEffect } from "react";
import authApi from "../../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { appActions } from "../../../redux/app/slice";
import { Role } from "../../../utils/enum";
import { NotificationContext } from "../../../contexts/notification";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.app.user);
  const [form] = useForm();
  const apiNotification = useContext(NotificationContext);

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      dispatch(appActions.setUser(data));
      apiNotification.success({
        message: "Update profile successfully",
      });
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  return (
    <div className="py-8 px-10 rounded-[16px]">
      <h2 className="mb-10">Update profile</h2>

      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        {user?.role === Role.STUDENT && (
          <Form.Item
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
            className="h-10 mt-2"
            loading={isPending}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProfile;
