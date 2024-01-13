import { BellOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import notificationApi from "../../../api/notificationApi";
import { useAppSelector } from "../../../hooks/redux";

const NotificationIcon = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state.app.user);

  const { data, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationApi.getAll(Number(id), user?.studentId || ""),
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };


  const renderContent = () => {
    if (!data) return <span className="text-gray-500 italic">No notifications</span>;

    return data.length > 0 ? (
      <div className="flex flex-col">
        {data.map((noti) => (
          <span className="px-2 py-2 hover:bg-gray-100 hover:cursor-pointer">
            {noti.description}
          </span>
        ))}
      </div>
    ) : (
      <span className="text-gray-500 italic">No notifications</span>
    );
  };

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  return (
    <div>
      <Popover
        content={renderContent}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
      >
        <div className="relative hover:cursor-pointer">
          <BellOutlined
            style={{
              fontSize: 20,
            }}
          />
          <span className="absolute block top-[-4px] right-[-4px] bg-red-400 text-[12px] text-white w-[14px] text-center rounded-lg">
            {data?.length || 0}
          </span>
        </div>
      </Popover>
    </div>
  );
};

export default NotificationIcon;
