import type { LucideIcon } from 'lucide-vue-next';

import type { VueElement } from 'vue';

export type Size =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | '10xl';

export type Theme = 'light' | 'dark';
export type Menu = {
  name: string;
  icon?: string | LucideIcon;
  href: string;
  children?: Menu[];
};
export type Permission = {
  permission_id?: number;
  permission: string;
  action?: string;
};

export interface Role {
  role_id?: number;
  role_name: string;
  created_at?: string;
  updated_at?: string;
  active?: boolean;
  permissions?: Permission[];
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
  permissions: Permission[];
}

export interface TableData<T, K extends keyof T> {
  rows: T[];
  columns: TableColumns<T, K>[];
}

export interface TableColumns<T, K extends keyof T> {
  field: K;
  fieldName: string;
  sortable?: boolean;
  formatter?: (value: T[K]) => string;
  render?: (item: T, column: K) => VueElement;
}
export interface QueryParams {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}
