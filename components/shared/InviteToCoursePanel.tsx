import React, { useState } from "react";
import { X } from "lucide-react";
import useGetInviteableCoursesHook from "@/hooks/invitationHooks/getInviteableCoursesHook";
import useInviteCourseHook from "@/hooks/invitationHooks/inviteCourseHook";
import { UserProps } from "@/types/UserTypes";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MustLogin from "@/components/shared/MustLogin";
import OnlyInstructor from "@/components/shared/OnlyInstructor";
import Loading from "@/components/shared/Loading";

interface Props {
  user: UserProps;
  onClose: () => void;
}

const InviteToCoursePanel = ({ user, onClose }: Props) => {
  const { state } = useUserContext();
  const { inviteableCourses, setInviteableCourses, loading } =
    useGetInviteableCoursesHook(user);
  const { handleInviteCourse } = useInviteCourseHook();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

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

  if (!state.user) return <MustLogin />;
  if (state.user.role !== "instructor") return <OnlyInstructor />;
  if (loading) return <Loading />;
  return (
    <div className="z-50 inset-0 fixed flex items-center justify-center bg-opacity-50 bg-black">
      <Button
        onClick={onClose}
        variant="link"
        className="size-full inset-0 absolute cursor-default bg-opacity-50 bg-black"
        aria-label="Close invite panel"
      />
      <Card className="w-[95%] max-w-md relative rounded-lg shadow-xl bg-white">
        <CardHeader>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="top-2 right-2 absolute text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </Button>
          <CardTitle>Invite to Course</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${inviteableCourses.length !== 0 && "hidden"}`}>
            No available courses to invite
          </p>
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
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleInvite} disabled={!selectedCourse}>
            Invite
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InviteToCoursePanel;
