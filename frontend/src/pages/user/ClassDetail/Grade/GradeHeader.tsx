const GradeHeader = ({ columns }: any) => {
  return (
    <div
      className="flex pl-6 bg-gray-100 py-3"
      style={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      {columns.map((column) => (
        <div
          style={{
            flexBasis: column.width,
            flexGrow: 1,
          }}
          className="font-medium text-[16px]"
        >
          {column.label}
        </div>
      ))}
    </div>
  );
};

export default GradeHeader;
