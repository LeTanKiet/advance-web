import { Dropdown } from "antd";
import { COLUMNS } from "../../../../utils/constants";
import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import gradeApi from "../../../../api/gradeApi";
import { useParams } from "react-router-dom";
import { useContext, useMemo } from "react";
import { NotificationContext } from "../../../../contexts/notification";

const GradeHeader = ({
  columns,
  setIsEditGradeOpen,
  editingGrade,
  setEditingGrade,
  localData,
}: any) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const apiNotification = useContext(NotificationContext);

  const isDisabledFinalize = useMemo(() => {
    if (!localData || !editingGrade) return false;
    return localData.find((d) => d.gradeName === editingGrade.value)?.isMarked;
  }, [localData, editingGrade]);

  const { mutate } = useMutation({
    mutationFn: (gradeName: string) => gradeApi.delete(NaN, gradeName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grades"] });
      apiNotification.success({
        message: "Delete grade successfully",
      });
    },
  });

  const { mutate: finalizeMutation } = useMutation({
    mutationFn: (gradeName: string) => gradeApi.finalize(Number(id), gradeName),
    onSuccess: () => {
      apiNotification.success({
        message: "Finalize grade successfully",
      });
    },
  });

  const items = [
    {
      label: <span onClick={() => setIsEditGradeOpen(true)}>Edit</span>,
      key: "1",
    },
    {
      label: (
        <span
          onClick={() => finalizeMutation(editingGrade.value)}
          className={isDisabledFinalize ? "opacity-50 pointer-events-none" : ""}
        >
          Finalize
        </span>
      ),
      key: "2",
    },
    {
      label: (
        <span
          onClick={() => mutate(editingGrade.value)}
          className="text-red-500"
        >
          Delete
        </span>
      ),
      key: "3",
    },
  ];

  return (
    <div
      className="flex pl-6 bg-gray-100 py-3"
      style={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      {columns.map((column: any) => (
        <div
          style={{
            flexBasis: column.width,
            flexGrow: 1,
          }}
          className="font-medium text-[16px]"
        >
          {column.label}
          {!COLUMNS.find((c) => c.value === column.value) && (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <MoreOutlined
                className="cursor-pointer p-2 rounded-md"
                onClick={() => setEditingGrade(column)}
              />
            </Dropdown>
          )}
        </div>
      ))}
    </div>
  );
};

export default GradeHeader;
