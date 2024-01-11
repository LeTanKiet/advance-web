import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import UploadExcel from "./UploadExcel";

interface StreamProps {
  currentClass: any;
}

const Stream = ({ currentClass }: StreamProps) => {
  return (
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
          <p className="font-normal text-2xl">{currentClass?.description}</p>
        </div>
      </div>

      <div className="flex gap-4 items-center px-5 py-3 shadow-main rounded-lg">
        <Avatar size="large" icon={<UserOutlined />} />
        <span>Announce something to your class</span>
      </div>

      <UploadExcel />
    </div>
  );
};

export default Stream;
