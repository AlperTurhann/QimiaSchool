"use client";
import { useRouter } from "next/navigation";
import useGetUserHook from "@/hooks/userHooks/getUserHook";
import { CourseProps } from "@/types/CourseTypes";
import { UserProps } from "@/types/UserTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/components/shared/Loading";

interface Props {
  course: CourseProps;
  courseInstructor?: UserProps | null;
}

const CourseCard = ({ course, courseInstructor }: Props) => {
  const navigate = useRouter();
  const { user: instructor, loading } = courseInstructor
    ? { user: courseInstructor, loading: false }
    : useGetUserHook(course.instructor, true);

  if (!course) return null;
  else if (!instructor) return null;
  else if (loading) return <Loading />;
  return (
    <Card
      key={course.id}
      className={`w-full h-full overflow-hidden ${!course && "hidden"}`}
    >
      <Button
        variant="ghost"
        onClick={() => navigate.push(`/courses/${course.id}`)}
        className="w-full h-full flex flex-col items-start p-0"
      >
        <CardHeader className="w-full" style={{ textAlign: "start" }}>
          <CardTitle
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="w-full"
          >
            {course?.name}
          </CardTitle>
          <CardDescription>
            <strong>Instructor: </strong>
            {instructor.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="truncateContent w-full">
          {course.description}
        </CardContent>
        <CardFooter className="w-full" style={{ textAlign: "end" }}>
          <span className="w-full">
            <strong>Capacity: </strong>
            {course.enrolledStudents.length}/{course?.capacity}
          </span>
        </CardFooter>
      </Button>
    </Card>
  );
};

export default CourseCard;
