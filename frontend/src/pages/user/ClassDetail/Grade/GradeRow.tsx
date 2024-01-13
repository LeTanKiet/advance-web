import { Dropdown } from "antd";
import { COLUMNS } from "../../../../utils/constants";
import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import gradeApi from "../../../../api/gradeApi";
import { useContext } from "react";
import { NotificationContext } from "../../../../contexts/notification";

const GradeRow = ({ row, columns }: any) => {
  const apiNotification = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: gradeApi.requestReview,
    onSuccess: () => {
      apiNotification.success({
        message: "Your request sent to your teacher",
      });
      queryClient.invalidateQueries({ queryKey: ["grades"] });
    },
  });

  const items = [
    {
      label: (
        <span
          onClick={() => mutate(row.studentId)}
          className={`${
            row.needReview ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          Request a review
        </span>
      ),
      key: "2",
    },
  ];

  const renderRow = (column: any) => {
    switch (column.value) {
      case "actions": {
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <MoreOutlined className="cursor-pointer p-2 hover:bg-gray-200 rounded-md" />
          </Dropdown>
        );
      }
      default: {
        return <span>{row[column.value]}</span>;
      }
    }
  };

  return (
    <div className="flex-1 flex items-center">
      {columns.map((column) => (
        <div
          style={{
            flexBasis: column.width,
            flexGrow: 1,
          }}
        >
          {renderRow(column)}
        </div>
      ))}
    </div>
  );
};

export default GradeRow;
