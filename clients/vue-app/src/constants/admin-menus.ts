import type { Menu } from "@/lib/types";
import {
  CogIcon,
  KeyIcon,
  LayoutDashboard,
  Newspaper,
  Shield,
  SquareCheck,
  User,
  Users,
} from "lucide-vue-next";

export const adminMenus: Menu[] = [
  {
    name: "Menu",
    href: "/admin/dashboard",
    children: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
      },
      {
        name: "Roles",
        icon: Users,
        href: "/admin/roles",
      },
      {
        name: "Users",
        icon: User,
        href: "/admin/users",
      },
      {
        name: "Permission",
        icon: Shield,
        href: "/admin/permission",
      },
      {
        name: "Category",
        icon: SquareCheck,
        href: "/admin/category",
      },
      {
        name: "Post",
        icon: Newspaper,
        href: "/admin/posts",
      },
    ],
  },
  {
    name: "Setting",
    href: "/admin/setting",
    children: [
      {
        name: "Setting",
        icon: CogIcon,
        href: "/admin/settings",
      },
      {
        name: "Password",
        icon: KeyIcon,
        href: "/admin/change-password",
      },
    ],
  },
];
