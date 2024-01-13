import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsProps } from "antd";
import { useParams } from "react-router-dom";
import userApi from "../../../api/userApi";
import { useAppSelector } from "../../../hooks/redux";
import { Role } from "../../../utils/enum";
import Grade from "./Grade";
import People from "./People";
import Stream from "./Stream";

const ClassDetail = () => {
  const { id } = useParams();
  const classList = useAppSelector((state) => state.class.list);
  const currentClass = classList.find((c) => c.id === Number(id));

  const { data: users } = useQuery({
    queryKey: ["users", currentClass?.id],
    queryFn: () => userApi.getAll(currentClass?.id || 0),
  });
  const students = users?.filter((user) => user.role === Role.STUDENT);

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
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default ClassDetail;
