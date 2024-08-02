"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import useGetInviteableCoursesHook from "@/hooks/invitationHooks/getInviteableCoursesHook";
import useInviteCourseHook from "@/hooks/invitationHooks/inviteCourseHook";
import { UserProps } from "@/types/UserTypes";
import Loading from "@/components/shared/Loading";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  user: UserProps;
  onClose: () => void;
}

const InviteableCoursesList = ({ user, onClose }: Props) => {
  const { inviteableCourses, setInviteableCourses, loading } =
    useGetInviteableCoursesHook(user);
  const { handleInviteCourse } = useInviteCourseHook();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const t = useTranslations("components.inviteCoursePanel");

  const handleInvite = async () => {
    if (selectedCourse) {
      const isInvited = await handleInviteCourse(user.id, selectedCourse);
      if (isInvited) {
        onClose();
        setInviteableCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== selectedCourse)
        );
        setSelectedCourse(null);
      }
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <CardContent>
        {inviteableCourses.length > 0 ? (
          <ul className="max-h-60 overflow-y-auto">
            {inviteableCourses.map((course) => (
              <li key={course.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="course"
                    value={course.id}
                    checked={selectedCourse === course.id}
                    onChange={() => setSelectedCourse(course.id)}
                    className="mr-2"
                  />
                  {course.name}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t("noFound")}</p>
        )}
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button onClick={onClose} variant="outline">
          {t("cancel")}
        </Button>
        <Button onClick={handleInvite} disabled={!selectedCourse}>
          {t("invite")}
        </Button>
      </CardFooter>
    </>
  );
};

export default InviteableCoursesList;
