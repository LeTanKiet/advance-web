import { COLUMNS } from "../../../../utils/constants";

const GradeBody = ({ row }: any) => {
  return (
    <div className="flex-1 flex items-center">
      {COLUMNS.map((column) => (
        <div
          style={{
            flexBasis: column.width,
          }}
        >
          {row[column.value]}
        </div>
      ))}
    </div>
  );
};

export default GradeBody;
