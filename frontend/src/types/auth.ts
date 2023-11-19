import { Role } from "../utils/enum";

export type TUser = {
  id: number;
  username: string;
  password: string;
  role: Role;
};

export type LoginProps = {
  username: string;
  password: string;
};

export type SignUpProps = {
  username: string;
  password: string;
  confirmPassword: string;
};
