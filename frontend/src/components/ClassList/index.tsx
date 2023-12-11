import { useQuery } from "@tanstack/react-query";
import classApi from "../../api/classApi";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { classActions } from "../../redux/class/slice";

const ClassList = () => {
  const dispatch = useAppDispatch();
  const classList = useAppSelector((state) => state.class.list);
  console.log("🚀 ~ file: index.tsx:12 ~ ClassList ~ classList:", classList);

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: classApi.getAll,
  });

  useEffect(() => {
    if (classes) {
      dispatch(classActions.setClassList(classes));
    }
  }, [classes, dispatch]);

  if (!classes || classList?.length === 0)
    return <p className="text-center mt-4">No class found</p>;

  return (
    <div className="mt-8 flex gap-4">
      {classList.map((c) => (
        <Link
          to={`classes/${c.id}`}
          className="hover:cursor-pointer hover:shadow-md w-fit"
        >
          <Card
            title={
              <div className="text-white py-2">
                <span>{c.title}</span>
                <p className="font-normal">{c.description}</p>
                <span></span>
              </div>
            }
            style={{ width: 300 }}
            headStyle={{
              backgroundImage:
                "url(https://www.gstatic.com/classroom/themes/img_read.jpg)",
              backgroundSize: "cover",
            }}
          >
            A super course
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ClassList;
