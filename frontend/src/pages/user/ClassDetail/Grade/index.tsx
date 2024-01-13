import { MenuOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { arrayMoveImmutable } from "array-move";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import gradeApi from "../../../../api/gradeApi";
import { COLUMNS } from "../../../../utils/constants";
import GradeHeader from "./GradeHeader";
import GradeRow from "./GradeRow";

const DragHandle = SortableHandle(() => (
  <MenuOutlined className="cursor-grab" />
));

const SortableItem = SortableElement(({ value, columns, localData }: any) => (
  <div className="flex gap-3 h-[40px]">
    <DragHandle />
    <GradeRow row={value} columns={columns} localData={localData} />
  </div>
));

const SortableContainerComp = SortableContainer(({ children }: any) => {
  return <ul>{children}</ul>;
});

const Grade = () => {
  const { id } = useParams();

  const [localData, setLocalData] = useState([]);
  const [sortedGrades, setSortedGrades] = useState([]);
  const [columns, setColumns] = useState([]);

  const { data } = useQuery({
    queryKey: ["grades"],
    queryFn: () => gradeApi.getAll(Number(id)),
  });

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setSortedGrades((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  useEffect(() => {
    if (data) {
      const dataSet = [...new Set(data.map((g) => g.gradeName))];

      const mappedGrades = data
        .filter(
          (d, index) =>
            data.findIndex((dd) => dd.studentId === d.studentId) === index
        )
        .map((d) => {
          const res = dataSet.reduce((acc, curr) => {
            const dd = data.find(
              (ddd) => ddd.studentId === d.studentId && ddd.gradeName === curr
            );

            acc[curr] = dd?.score || 0;

            return acc;
          }, {});

          console.log(
            "DATA : ",
            data.filter((dd) => dd.studentId === d.studentId)
          );
          const average = data
            .filter((dd) => dd.studentId === d.studentId)
            .reduce((acc, curr) => acc + (curr.score * curr.scale) / 100, 0)
            .toFixed(2);

          console.log("DATA AVG: ", average);

          return { ...d, ...res, average };
        });

      const mappedColumns = COLUMNS.slice(0, -2)
        .concat(
          dataSet.map((s) => {
            const scale = data.find((d) => d.gradeName === s)?.scale || 0;
            return {
              label: `${s} (${scale}%)`,
              value: s,
              width: 200,
            };
          })
        )
        .concat(COLUMNS.slice(-2));

      setSortedGrades(mappedGrades.filter((g) => g.studentId));
      setColumns(mappedColumns);
      setLocalData(data);
    }
  }, [data]);

  return (
    <div>
      <GradeHeader columns={columns} />

      <SortableContainerComp onSortEnd={onSortEnd} useDragHandle>
        <div className="flex flex-col gap-2">
          {sortedGrades.map((value, index) => (
            <SortableItem
              key={`item-${value.id}`}
              index={index}
              value={value}
              columns={columns}
              localData={localData}
            />
          ))}
        </div>
      </SortableContainerComp>
    </div>
  );
};

export default Grade;
