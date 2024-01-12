import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { arrayMoveImmutable } from "array-move";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import gradeApi from "../../../../api/gradeApi";
import GradeHeader from "./GradeHeader";
import GradeRow from "./GradeRow";

const DragHandle = SortableHandle(() => (
  <MenuOutlined className="cursor-grab" />
));

const SortableItem = SortableElement(({ value }: any) => (
  <div className="flex gap-2 h-[40px]">
    <DragHandle />
    <GradeRow row={value} />
  </div>
));

const SortableContainerComp = SortableContainer(({ children }: any) => {
  return <ul>{children}</ul>;
});

const Grade = () => {
  const { id } = useParams();

  const [sortedGrades, setSortedGrades] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["grades", id],
    queryFn: () => gradeApi.getAll(Number(id)),
  });

  const { mutate: createMutation, isPending } = useMutation({
    mutationFn: gradeApi.create,
  });

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setSortedGrades((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  const onFinishCreate = (value: any) => {
    createMutation(
      { ...value, classId: id },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false);
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (data) {
      setSortedGrades(data);
    }
  }, [data]);

  return (
    <div>
      <GradeHeader />

      <SortableContainerComp onSortEnd={onSortEnd} useDragHandle>
        <div className="flex flex-col gap-2">
          {sortedGrades.map((value, index) => (
            <SortableItem
              key={`item-${value.id}`}
              index={index}
              value={value}
            />
          ))}

          <div>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create grade
            </Button>
            <Modal
              title="Create grade"
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
              >
                <Form.Item
                  label="Fullname"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input new full name!",
                    },
                  ]}
                >
                  <Input placeholder="Fullname" />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input new student id",
                    },
                  ]}
                  label="StudentId"
                  name="studentId"
                >
                  <Input placeholder="Student id" />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input new score!",
                    },
                  ]}
                  label="Score"
                  name="score"
                >
                  <InputNumber
                    max={10}
                    min={10}
                    className="w-full"
                    placeholder="Score"
                  />
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
                      loading={isPending}
                    >
                      Create
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </SortableContainerComp>

      {/* <UploadExcel /> */}
    </div>
  );
};

export default Grade;
