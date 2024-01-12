import { Avatar, Tabs, TabsProps } from "antd";
import { useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../../api/userApi";
import { UserOutlined } from "@ant-design/icons";
import { Role } from "../../../utils/enum";
import Stream from "./Stream";
import People from "./People";
import Grade from "./Grade";

const ClassDetail = () => {
  const { id } = useParams();
  const classList = useAppSelector((state) => state.class.list);
  const currentClass = classList.find((c) => c.id === Number(id));

  const { data: users } = useQuery({
    queryKey: ["users", currentClass?.id],
    queryFn: () => userApi.getAll(currentClass?.id || 0),
  });
  const students = users?.filter((user) => user.role === Role.STUDENT);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Stream",
      children: <Stream currentClass={currentClass} />,
    },
    {
      key: "2",
      label: "People",
      children: (
        <People users={users} students={students} currentClass={currentClass} />
      ),
    },
    {
      key: "3",
      label: "Grade",
      children: <Grade />,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default ClassDetail;
