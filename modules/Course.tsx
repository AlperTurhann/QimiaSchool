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
  isManage?: boolean;
}

const CourseCard = ({ course, courseInstructor, isManage = false }: Props) => {
  const navigate = useRouter();
  const { user: instructor, loading } = courseInstructor
    ? { user: courseInstructor, loading: false }
    : useGetUserHook(course.instructor, true);

  if (!course || !instructor) return null;
  if (loading) return <Loading />;
  return (
    <Card className={`size-full overflow-hidden ${!course && "hidden"}`}>
      <Button
        variant="ghost"
        onClick={() => navigate.push(`/courses/${course.id}`)}
        className={`size-full flex flex-col items-start p-0 ${
          isManage && "marginTopUntilSm"
        }`}
      >
        <CardHeader className="w-full">
          <CardTitle className="truncateContent w-full">
            {course?.name}
          </CardTitle>
          <CardDescription className="truncateContent">
            <strong>Instructor: </strong>
            {instructor.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="truncateContent w-full">
          {course.description}
        </CardContent>
        <CardFooter className="w-full grid grid-cols-2 justify-between text-xs">
          <span className="w-full flex capitalize text-gray-600">
            <strong className="marginRight1">Access Level:</strong>
            {course?.accessLevel}
          </span>
          <span className="w-full flex justify-end">
            <strong className="marginRight1">Capacity:</strong>
            {course.enrolledStudents.length}/{course?.capacity}
          </span>
        </CardFooter>
      </Button>
    </Card>
  );
};

export default CourseCard;
