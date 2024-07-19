interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps extends LoginProps {
  name: string;
  role: "student" | "instructor";
}

interface UserProps extends SignupProps {
  id: string;
  courses: string[];
}

export type { LoginProps, SignupProps, UserProps };
