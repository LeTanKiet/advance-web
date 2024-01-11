import { COLUMNS } from "../../../../utils/constants";

const GradeHeader = () => {
  return (
    <div className="flex ml-5">
      {COLUMNS.map((column) => (
        <div
          style={{
            flexBasis: column.width,
          }}
        >
          {column.label}
        </div>
      ))}
    </div>
  );
};

export default GradeHeader;
