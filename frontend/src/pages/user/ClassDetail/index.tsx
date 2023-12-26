import { Avatar, Tabs, TabsProps } from "antd";
import { useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../../api/userApi";
import { UserOutlined } from "@ant-design/icons";
import { Role } from "../../../utils/enum";

const ClassDetail = () => {
  const { id } = useParams();
  const classList = useAppSelector((state) => state.class.list);
  const currentClass = classList.find((c) => c.id === Number(id));

  const { data: users } = useQuery({
    queryKey: ["users", currentClass?.id],
    queryFn: () => userApi.getAll(currentClass?.id || 0),
  });
  const students = users?.filter(
    (user) => user.role === Role.STUDENT && user.id !== currentClass?.owner
  );

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Stream",
      children: (
        <div>
          <div
            style={{
              backgroundImage:
                "url(https://www.gstatic.com/classroom/themes/img_read.jpg)",
              backgroundSize: "cover",
            }}
            className="h-[240px] relative mb-6 rounded-lg"
          >
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-4xl font-semibold uppercase">
                {currentClass?.title}
              </h2>
              <p className="font-normal text-2xl">
                {currentClass?.description}
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center px-5 py-3 shadow-main rounded-lg">
            <Avatar size="large" icon={<UserOutlined />} />
            <span>Announce something to your class</span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "People",
      children: (
        <div>
          <div>
            <h2 className="font-semibold border-0 leading-[60px] border-b border-b-black border-solid">
              Teachers
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {users
                ?.filter(
                  (user) => currentClass && user.id === currentClass.owner
                )
                .map((user, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <span>{user.email}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold border-0 leading-[60px] border-b border-b-black border-solid">
              Students
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {students && students.length > 0 ? (
                students.map((user) => (
                  <div className="flex items-center gap-4">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <span>{user.email}</span>
                  </div>
                ))
              ) : (
                <span>No student in this class</span>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default ClassDetail;
