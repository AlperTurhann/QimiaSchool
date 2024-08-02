import { InvitationProps } from "@/types/InvitationTypes";

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps extends LoginProps {
  name: string;
  role: RoleKeys;
}

interface UserProps extends SignupProps {
  id: string;
  courses: string[];
  appliedCourses: string[];
  invitations: InvitationProps[];
}

export type { LoginProps, SignupProps, UserProps };
