import { Role } from "../utils/enum";

export type TUser = {
  id: number;
  email: string;
  password: string;
  role: Role;
  name: string;
  pin?: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
};
