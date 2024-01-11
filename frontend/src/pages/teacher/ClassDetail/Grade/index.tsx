import { useState } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import GradeHeader from "./GradeHeader";
import GradeBody from "./GradeBody";
import { MenuOutlined } from "@ant-design/icons";

const DragHandle = SortableHandle(() => (
  <MenuOutlined className="cursor-grab" />
));

const SortableItem = SortableElement(({ value }: any) => (
  <div className="flex gap-2 h-[40px]">
    <DragHandle />
    <GradeBody row={value} />
  </div>
));

const SortableContainerComp = SortableContainer(({ children }: any) => {
  return <ul>{children}</ul>;
});

const Grade = () => {
  const [items, setItems] = useState(
    Array(10)
      .fill(0)
      .map((_item, index) => ({
        name: "Name " + index,
        student_id: "Id " + index + 1,
        score: Math.ceil(Math.random() * 10),
      }))
  );
  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };
  return (
    <div>
      <GradeHeader />

      <SortableContainerComp onSortEnd={onSortEnd} useDragHandle>
        <div className="flex flex-col gap-2">
          {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value} />
          ))}
        </div>
      </SortableContainerComp>
    </div>
  );
};

export default Grade;
