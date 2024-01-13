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

  const { data: classes, isLoading } = useQuery({
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

  if (isLoading) return null;

  return (
    <div className="flex gap-4 mt-4">
      {classList.map((c, index) => (
        <Link
          key={index}
          to={`classes/${c.id}`}
          className="hover:cursor-pointer hover:shadow-md w-fit no-underline"
        >
          <Card
            title={
              <div className="text-white py-2">
                <span className="text-[24px]">{c.title}</span>
                <p className="font-light">{c.description}</p>
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
            <div>
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/051/481/original/schoolboy-learning-online-course-on-mobile-illustration-concept-flat-illustration-isolated-on-white-background-vector.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ClassList;
