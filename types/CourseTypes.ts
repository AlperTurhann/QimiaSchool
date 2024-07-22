interface CreateCourseProps {
  name: string;
  description: string;
  instructor: string;
  capacity: number;
  accessLevel: "invited only" | "accepted only" | "everyone";
}

interface CourseProps extends CreateCourseProps {
  id: string;
  enrolledStudents: string[];
  appliedStudents: string[];
}

export type { CreateCourseProps, CourseProps };
