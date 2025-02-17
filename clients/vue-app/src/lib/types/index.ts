import type { LucideIcon } from "lucide-vue-next";

export type Theme = "light" | "dark";
export type Menu = {
  name: string;
  icon?: string | LucideIcon;
  href: string;
  children?: Menu[];
};
export interface IPermission {
  permission_id: number;
  permission: string;
}

export interface Role {
  role_id: number;
  role_name: string;
}

export interface IUser {
  user_id: number;
  name: string;
  email: string;
  mobile: string;
  access_token: string;
  refresh_token: string;
  role_id: number;
  role: Role;
  permissions: IPermission[];
}
