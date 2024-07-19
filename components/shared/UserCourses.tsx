"use client";
import React from "react";
import { useRouter } from "next/navigation";
import getUserCoursesHook from "@/hooks/userHooks/getUserCoursesHook";
import { UserProps } from "@/types/UserTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "@/components/shared/Loading";

interface Props {
  user: UserProps;
}

const UserCourses = ({ user }: Props) => {
  const navigate = useRouter();

  const { courses, loading } = getUserCoursesHook(user);

  if (loading) return <Loading />;
  return (
    <Card className="w-2/3 shadow-md">
      <CardHeader className="text-center border-b">
        <CardTitle>
          {user.role === "instructor" ? "Created Courses" : "Enrolled Courses"}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`grid grid-cols-1 p-5 gap-5 ${
          courses.length >= 2 && "md:grid-cols-2"
        } ${courses.length >= 3 && "lg:grid-cols-3"}`}
      >
        <span
          className={`text-center text-gray-500 ${
            courses.length === 0 ? "block" : "hidden "
          }`}
        >
          There are no courses!
        </span>
        {courses.map((course) => (
          <div key={course.id} className="w-full h-full">
            <Button
              variant="link"
              onClick={() => navigate.push(`/courses/${course.id}`)}
              className="w-full h-full"
            >
              {course.name}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserCourses;
