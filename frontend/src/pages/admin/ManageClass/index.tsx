import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dropdown, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import classApi from "../../../api/classApi";
import userApi from "../../../api/userApi";
import CreateButton from "../../../components/Header/CreateButton";
import { NotificationContext } from "../../../contexts/notification";
import { useAppDispatch } from "../../../hooks/redux";
import { classActions } from "../../../redux/class/slice";
import { TClass } from "../../../types/class";
import Search from "antd/es/input/Search";
import _ from "lodash";

const ManageClass = () => {
  const dispatch = useAppDispatch();
  const [currentClass, setCurrentClass] = useState<TClass>();
  const apiNotification = useContext(NotificationContext);
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: classes, refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: classApi.getAll,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.getAll(),
  });

  const { mutate: updateClassMutation } = useMutation({
    mutationFn: (body: any) =>
      classApi.updateClass(currentClass?.id?.toString() || "", body),
    onSuccess: (data: any) => {
      apiNotification.success({
        message: `${data.isActive ? "Active" : "Inactive"} class successfully`,
      });
      refetch();
    },
  });

  const { mutate: deleteClassMutation } = useMutation({
    mutationFn: classApi.deleteClass,
    onSuccess: () => {
      apiNotification.success({
        message: `Delete class successfully`,
      });
      refetch();
    },
  });

  const onSearch = _.debounce((value: any) => {
    setSearchValue(value.target.value);
  }, 400);

  useEffect(() => {
    if (classes) {
      dispatch(classActions.setClassList(classes));
    }
  }, [classes, dispatch]);

  const items = [
    {
      label: <span>Edit</span>,
      key: "0",
    },
    {
      label: (
        <span
          onClick={() => {
            updateClassMutation({
              ...currentClass,
              isActive: !currentClass?.isActive,
            });
          }}
        >
          {currentClass?.isActive ? "Inactive" : "Active"}
        </span>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <span
          onClick={() =>
            deleteClassMutation(currentClass?.id?.toString() || "")
          }
          className="text-red-500"
        >
          Delete
        </span>
      ),
      key: "2",
    },
  ];

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
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: { title: string }, b: { title: string }) => {
        return a.title.localeCompare(b.title);
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a: { description: string }, b: { description: string }) => {
        console.log(a, b);
        return a.description.localeCompare(b.description);
      },
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      sorter: (a: { owner: string }, b: { owner: string }) => {
        return a.owner.localeCompare(b.owner);
      },
      render: (_: any, { owner }: any) => <span>{owner.name}</span>,
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
            onClick={() => setCurrentClass(classes?.[index])}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <div className="flex justify-between">
        <h2 className="mb-4">Classes</h2>

        <div className="flex gap-4">
          <Search placeholder="Search" enterButton onChange={onSearch} />
          <CreateButton />
        </div>
      </div>

      <Table
        className="w-full"
        columns={columns}
        dataSource={classes
          ?.map((c) => ({
            ...c,
            owner: users?.find((u) => u.id === c.owner),
          }))
          .filter((c) =>
            c.title.toLowerCase().includes(searchValue.toLowerCase())
          )}
        pagination={false}
      />
    </div>
  );
};

export default ManageClass;
