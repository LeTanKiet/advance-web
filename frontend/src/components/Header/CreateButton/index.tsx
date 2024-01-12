import { CopyOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Dropdown, Form, Input, MenuProps, Modal, Tooltip } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import classApi from "../../../api/classApi";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { classActions } from "../../../redux/class/slice";
import { TClass } from "../../../types/class";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CreateButtonProps {
  hasCreate?: boolean;
  hasInvitation?: boolean;
  hasJoin?: boolean;
}

const CreateButton = ({
  hasCreate,
  hasInvitation,
  hasJoin,
}: CreateButtonProps) => {
  const [form] = useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isInvitationLinkOpen, setIsInvitationLinkOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const dispatch = useAppDispatch();
  const classList = useAppSelector((state) => state.class.list);

  const createClassMutation = useMutation({
    mutationFn: classApi.create,
    onSuccess: (data) => {
      setIsCreateModalOpen(false);
      dispatch(classActions.setClassList([...classList, data]));
    },
  });

  const joinClassMutation = useMutation({
    mutationFn: classApi.joinClass,
    onSuccess: (data) => {
      setIsJoinModalOpen(false);
      dispatch(classActions.setClassList([...classList, data]));
    },
  });

  const items: MenuProps["items"] = [];

  if (hasCreate) {
    items.push({
      key: "1",
      label: (
        <span onClick={() => setIsCreateModalOpen(true)}>Create class</span>
      ),
    });
  }

  if (hasInvitation) {
    items.push({
      key: "2",
      label: (
        <span onClick={() => setIsInvitationLinkOpen(true)}>
          Create invitation link
        </span>
      ),
    });
  }
  if (hasJoin) {
    items.push({
      key: "3",
      label: <span onClick={() => setIsJoinModalOpen(true)}>Join class</span>,
    });
  }

  const onFinishCreate = (values: TClass) => {
    createClassMutation.mutate(values);
  };

  const onFinishJoin = (values: any) => {
    joinClassMutation.mutate(values);
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
        destroyOnClose
      >
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinishCreate}
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
            <Input placeholder="Enter class name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input placeholder="Enter description" />
          </Form.Item>

          <div className="flex gap-4 justify-end">
            <Form.Item>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={createClassMutation.isPending}
              >
                Create
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Join class"
        open={isJoinModalOpen}
        onOk={() => setIsJoinModalOpen(false)}
        onCancel={() => setIsJoinModalOpen(false)}
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
            label="Link"
            name="link"
            rules={[{ required: true, message: "Please input link!" }]}
          >
            <Input placeholder="Enter class link" />
          </Form.Item>

          <div className="flex gap-4 justify-end">
            <Form.Item>
              <Button onClick={() => setIsJoinModalOpen(false)}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={joinClassMutation.isPending}
                className="text-white"
              >
                Join
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Invitation link"
        open={isInvitationLinkOpen}
        onOk={() => setIsInvitationLinkOpen(false)}
        onCancel={() => setIsInvitationLinkOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div
          className="flex gap-4 items-center h-[32px] mt-4"
          onBlur={() => setIsCopied(false)}
        >
          <span className="border border-solid border-slate-400 rounded-md px-4 py-1">
            {window.location.href}
          </span>
          <Tooltip
            title={isCopied ? "Copied" : "Copy to clipboard"}
            placement="bottom"
          >
            <CopyToClipboard
              text={window.location.href}
              onCopy={() => setIsCopied(true)}
            >
              <CopyOutlined size={2} />
            </CopyToClipboard>
          </Tooltip>
        </div>
      </Modal>
    </div>
  );
};

export default CreateButton;
