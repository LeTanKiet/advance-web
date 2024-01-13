import { Dropdown } from "antd";
import { COLUMNS } from "../../../../utils/constants";
import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import gradeApi from "../../../../api/gradeApi";

const GradeHeader = ({
  columns,
  setIsEditGradeOpen,
  editingGrade,
  setEditingGrade,
}: any) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (gradeName: string) => gradeApi.delete(NaN, gradeName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grades"] });
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
          onClick={() => mutate(editingGrade.value)}
          className="text-red-500"
        >
          Delete
        </span>
      ),
      key: "2",
    },
  ];

  return (
    <div className="flex ml-5">
      {columns.map((column: any) => (
        <div
          style={{
            flexBasis: column.width,
            flexGrow: 1,
          }}
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
