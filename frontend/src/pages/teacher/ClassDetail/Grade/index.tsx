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
import { COLUMNS } from "../../../../utils/constants";
import { useForm } from "antd/es/form/Form";

const DragHandle = SortableHandle(() => (
  <MenuOutlined className="cursor-grab" />
));

const SortableItem = SortableElement(({ value, columns, localData }: any) => (
  <div className="flex gap-2 h-[40px]">
    <DragHandle />
    <GradeRow row={value} columns={columns} localData={localData} />
  </div>
));

const SortableContainerComp = SortableContainer(({ children }: any) => {
  return <ul>{children}</ul>;
});

const Grade = () => {
  const { id } = useParams();

  const [localData, setLocalData] = useState([]);
  const [sortedGrades, setSortedGrades] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateGradeOpen, setIsCreateGradeOpen] = useState(false);
  const [isEditGradeOpen, setIsEditGradeOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState({});
  const [columns, setColumns] = useState([]);
  const [form] = useForm();

  const { data, refetch } = useQuery({
    queryKey: ["grades"],
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

  const onFinishCreateGrade = (value: any) => {
    createMutation(
      { ...value, classId: id },
      {
        onSuccess: () => {
          setIsCreateGradeOpen(false);
          refetch();
        },
      }
    );
  };

  const { mutate: updateMutation } = useMutation({
    mutationFn: (body: any) => gradeApi.update(Number(id), body),
    onSuccess: () => {
      setIsEditGradeOpen(false);
      refetch();
    },
  });

  const onFinishEditGrade = (value: any) => {
    updateMutation(value);
  };

  useEffect(() => {
    const grade = localData.find((d) => d.gradeName === editingGrade.value);
    if (grade) {
      form.setFieldsValue(grade);
    }
  }, [editingGrade, localData, form]);

  useEffect(() => {
    if (data) {
      const dataSet = [...new Set(data.map((g) => g.gradeName))];

      const mappedGrades = data
        .filter(
          (d, index) =>
            data.findIndex((dd) => dd.studentId === d.studentId) === index
        )
        .map((d) => {
          const res = dataSet.reduce((acc, curr) => {
            const dd = data.find(
              (ddd) => ddd.studentId === d.studentId && ddd.gradeName === curr
            );

            acc[curr] = dd?.score || 0;

            return acc;
          }, {});


          const average = data
            .filter((dd) => dd.studentId === d.studentId)
            .reduce((acc, curr) => acc + ((curr.score || 0) * (curr.scale || 0)) / 100, 0)
            .toFixed(2);

          return { ...d, ...res, average };
        });

      const mappedColumns = COLUMNS.slice(0, -2)
        .concat(
          dataSet.map((s) => {
            const scale = data.find((d) => d.gradeName === s)?.scale || 0;
            return {
              label: `${s} (${scale}%)`,
              value: s,
              width: 200,
            };
          })
        )
        .concat(COLUMNS.slice(-2));

      setSortedGrades(mappedGrades.filter((g) => g.studentId));
      setColumns(mappedColumns);
      setLocalData(data);
    }
  }, [data]);

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-end">
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsCreateGradeOpen(true)}
            type="primary"
          >
            Create grade
          </Button>
          <Modal
            title="Create a new grade"
            open={isCreateGradeOpen}
            onOk={() => setIsCreateGradeOpen(false)}
            onCancel={() => setIsCreateGradeOpen(false)}
            footer={null}
            destroyOnClose
          >
            <Form
              name="basic"
              style={{ maxWidth: 600 }}
              onFinish={onFinishCreateGrade}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Grade name"
                name="gradeName"
                rules={[
                  {
                    required: true,
                    message: "Please input new grade name!",
                  },
                ]}
              >
                <Input placeholder="Enter grade name" />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input new scale!",
                  },
                ]}
                label="Scale"
                name="scale"
              >
                <InputNumber
                  max={100}
                  min={0}
                  className="w-full"
                  placeholder="Scale"
                />
              </Form.Item>

              <div className="flex gap-4 justify-end">
                <Form.Item>
                  <Button onClick={() => setIsCreateGradeOpen(false)}>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isPending}>
                    Create
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>

          <Modal
            title="Edit grade"
            open={isEditGradeOpen}
            onOk={() => setIsEditGradeOpen(false)}
            onCancel={() => setIsEditGradeOpen(false)}
            footer={null}
            destroyOnClose
          >
            <Form
              name="basic"
              style={{ maxWidth: 600 }}
              onFinish={onFinishEditGrade}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
              <Form.Item
                label="Grade name"
                name="gradeName"
                rules={[
                  {
                    required: true,
                    message: "Please input new grade name!",
                  },
                ]}
              >
                <Input placeholder="Enter grade name" />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input new scale!",
                  },
                ]}
                label="Scale"
                name="scale"
              >
                <InputNumber
                  max={100}
                  min={0}
                  className="w-full"
                  placeholder="Scale"
                />
              </Form.Item>

              <div className="flex gap-4 justify-end">
                <Form.Item>
                  <Button onClick={() => setIsEditGradeOpen(false)}>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isPending}>
                    Edit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      </div>

      <GradeHeader
        columns={columns}
        setIsEditGradeOpen={setIsEditGradeOpen}
        editingGrade={editingGrade}
        setEditingGrade={setEditingGrade}
        localData={localData}
      />

      <SortableContainerComp onSortEnd={onSortEnd} useDragHandle>
        <div className="flex flex-col gap-2">
          {sortedGrades.map((value, index) => (
            <SortableItem
              key={`item-${value.id}`}
              index={index}
              value={value}
              columns={columns}
              localData={localData}
            />
          ))}

          <div>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
              type="primary"
              className="mt-4"
            >
              Add student
            </Button>
            <Modal
              title="Add a new student"
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
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Please input new full name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter fullname" />
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
                  <Input placeholder="Enter student id" />
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
