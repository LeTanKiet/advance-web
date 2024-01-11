import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

interface PeopleProps {
  users: any;
  students: any;
  currentClass: any;
}

const People = ({ users, students, currentClass }: PeopleProps) => {
  return (
    <div>
      <div>
        <h2 className="font-semibold border-0 leading-[60px] border-b border-b-black border-solid">
          Teachers
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          {users
            ?.filter((user) => currentClass && user.id === currentClass.owner)
            .map((user) => (
              <div className="flex items-center gap-4">
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
  );
};

export default People;
