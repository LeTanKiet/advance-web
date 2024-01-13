import { MoreOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dropdown, Input, InputNumber } from "antd";
import _ from "lodash";
import gradeApi from "../../../../api/gradeApi";

const GradeRow = ({ row, columns, localData }: any) => {
  const { mutate } = useMutation({
    mutationFn: (body: any) => gradeApi.updateScore(row.studentId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grades"] });
    },
  });
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: gradeApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grades"] });
    },
  });

  const handleChange = _.debounce((value, column) => {
    const body = localData.find(
      (d) => d.gradeName === column.value && d.studentId === row.studentId
    );
    mutate({
      ...body,
      gradeName: column.value,
      [column.value]: value,
    });
  }, 400);

  const items = [
    {
      label: (
        <span
          onClick={() => deleteMutation(row.studentId)}
          className="text-red-500"
        >
          Delete
        </span>
      ),
      key: "2",
    },
  ];

  const renderInput = (column: any) => {
    switch (column.value) {
      case "studentId":
      case "fullname": {
        return (
          <Input
            defaultValue={row[column.value]}
            onChange={(e) => handleChange(e.target.value, column)}
            className={`
   w-[120px] text-textColor max-w-full bg-transparent rounded-lg border-none hover:!bg-bgNeutral focus:border focus:border-solid focus:!border-gray-500 focus:!shadow-none`}
          />
        );
      }
      case "average": {
        return <span>{row[column.value]}</span>;
      }
      case "actions": {
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <MoreOutlined className="cursor-pointer p-2 hover:bg-gray-200 rounded-md" />
          </Dropdown>
        );
      }
      default: {
        return (
          <InputNumber
            min={0}
            max={10}
            defaultValue={Number(row[column.value])}
            onChange={(value) => handleChange(value, column)}
            className={`
        w-[120px] text-textColor max-w-full bg-transparent rounded-lg border-none hover:!bg-bgNeutral focus:border focus:border-solid focus:!border-gray-500 focus:!shadow-none`}
          />
        );
      }
    }
  };

  return (
    <div className="flex-1 flex items-center">
      {columns.map((column: any) => (
        <div
          style={{
            flexBasis: column.width,
            flexGrow: 1,
          }}
        >
          {renderInput(column)}
        </div>
      ))}
    </div>
  );
};

export default GradeRow;
