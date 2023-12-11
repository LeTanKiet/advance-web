import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Dropdown, Form, Input, MenuProps, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import classApi from "../../api/classApi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { classActions } from "../../redux/class/slice";

const CreateButton = () => {
  const [form] = useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const classList = useAppSelector((state) => state.class.list);

  const createClassMutation = useMutation({
    mutationFn: classApi.create,
    onSuccess: (data) => {
      setIsCreateModalOpen(false);
      dispatch(classActions.setClassList([...classList, data]));
    },
  });

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span onClick={() => setIsCreateModalOpen(true)}>Create class</span>
      ),
    },
    {
      key: "2",
      label: <span>Join class</span>,
    },
  ];

  const onFinish = (values: any) => {
    console.log("Success:", values);
    createClassMutation.mutate(values);
  };

  return (
    <div>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <div className="w-[36px] h-[36px] flex items-center justify-center rounded-[50%] hover:bg-slate-200 cursor-pointer">
          <PlusOutlined />
        </div>
      </Dropdown>

      <Modal
        title="Create class"
        open={isCreateModalOpen}
        onOk={() => setIsCreateModalOpen(false)}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
      >
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Class name"
            name="title"
            rules={[
              { required: true, message: "Please input your class name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <div className="flex gap-4 justify-end">
            <Form.Item>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateButton;
