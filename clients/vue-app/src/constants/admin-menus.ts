import type { Menu } from "@/lib/types";
import {
  BookDashed,
  CogIcon,
  Home,
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
        name: "Role",
        icon: Users,
        href: "/admin/role",
      },
      {
        name: "User",
        icon: User,
        href: "/admin/user",
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
        href: "/admin/setting",
      },
      {
        name: "Password",
        icon: KeyIcon,
        href: "/admin/change-password",
      },
    ],
  },
];
