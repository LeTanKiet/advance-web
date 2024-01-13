import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Form, Input, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import Search from "antd/es/input/Search";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { NotificationContext } from "../../../contexts/notification";
import { Role } from "../../../utils/enum";

const ManageStudent = () => {
  const [currentUser, setCurrentUser] = useState<any>();
  const apiNotification = useContext(NotificationContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.getAll(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      userApi.updateUser(currentUser?.id.toString(), data),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [isModalOpen, currentUser, form]);

  const items = [
    {
      label: (
        <span
          onClick={() => {
            mutate(
              { ...currentUser, isActive: !currentUser.isActive },
              {
                onSuccess: (data: any) => {
                  apiNotification.success({
                    message: `${
                      data.isActive ? "Unblock" : "Block"
                    } user successfully`,
                  });
                },
              }
            );
          }}
        >
          {currentUser?.isActive ? "Block" : "Unblock"}
        </span>
      ),
      key: "0",
    },
  ];

  if (currentUser?.role === Role.STUDENT) {
    items.push(
      {
        label: (
          <span
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Map student id
          </span>
        ),
        key: "1",
      },
      {
        label: (
          <span
            onClick={() => {
              mutate(
                { ...currentUser, studentId: "" },
                {
                  onSuccess: () => {
                    apiNotification.success({
                      message: `Unmap student id successfully`,
                    });
                  },
                }
              );
            }}
          >
            Unmap student id
          </span>
        ),
        key: "2",
      }
    );
  }

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_arg1: any, _arg2: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (_: any, { name }: any) => <span>{name}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (_arg1: any, _arg2: any, index: number) => (
        <Dropdown menu={{ items: items as any }} trigger={["click"]}>
          <MoreOutlined
            className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
            onClick={() => setCurrentUser(users?.[index])}
          />
        </Dropdown>
      ),
    },
  ];

  const onFinishJoin = (values: any) => {
    mutate(
      { ...currentUser, studentId: values.studentId },
      {
        onSuccess: () => {
          apiNotification.success({
            message: `Map student id successfully`,
          });
          setIsModalOpen(false);
        },
      }
    );
  };

  const onSearch = _.debounce((value: any) => {
    setSearchValue(value.target.value);
  }, 400);

  return (
    <div className="flex-1">
      <div className="flex justify-between">
        <h2 className="mb-4">Students</h2>

        <div>
          <Search placeholder="Search" enterButton onChange={onSearch} />
        </div>
      </div>

      <Table
        className="w-full"
        columns={columns}
        dataSource={users?.filter(
          (c) =>
            c.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchValue.toLowerCase())
        )}
        pagination={false}
      />

      <Modal
        title="Map student id"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinishJoin}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Student ID"
            name="studentId"
            rules={[{ required: true, message: "Please input student id!" }]}
          >
            <Input placeholder="Enter student id" />
          </Form.Item>

          <div className="flex gap-4 justify-end">
            <Form.Item>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Map
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageStudent;
