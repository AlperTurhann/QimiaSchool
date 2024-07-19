interface CreateCourseProps {
  name: string;
  description: string;
  instructor: string;
  capacity: number;
}

interface CourseProps extends CreateCourseProps {
  id: string;
  enrolledStudents: string[];
}

export type { CreateCourseProps, CourseProps };
