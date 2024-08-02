interface CourseState {
  isInvited: boolean;
  isEnrolled: boolean;
  isApplied: boolean;
  isEnrollable: boolean;
}

interface CreateCourseProps {
  name: string;
  description: string;
  instructor: string;
  capacity: number;
  accessLevel: AccessLevelKeys;
}

interface CourseProps extends CreateCourseProps {
  id: string;
  enrolledStudents: string[];
  appliedStudents: string[];
}

export type { CourseState, CreateCourseProps, CourseProps };
