interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps extends LoginProps {
  name: string;
  role: "student" | "instructor";
}

interface UserProps extends RegisterProps {
  id: string;
  courses: string[];
}

export type { LoginProps, RegisterProps, UserProps };
