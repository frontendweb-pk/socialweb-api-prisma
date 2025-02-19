import axiosInstance from '@/axios-instance';
import { toast } from 'vue3-toastify';

import { ref, watch } from 'vue';

import { defineStore } from 'pinia';

import { useRoute } from 'vue-router';

import { dev } from '@/utils/dev';
import { buildQueryString } from '@/utils/query-string';

import type { QueryParams } from '@/lib/types';

/**
 * Role interface
 */
export type Role = {
  role_id?: number;
  role_name: string;
  created_at?: string;
  updated_at?: string;
  active?: boolean;
  permissions?: string[];
  action?: string;
};

export const useRolesStore = defineStore('roles', () => {
  // states
  const loading = ref(false); // loading state
  const roles = ref<Role[]>([]); // roles
  const totalPages = ref(0); // total page
  const currentPage = ref(1); // current page

  // routes
  const route = useRoute();
  // const router = useRouter();

  // network requests
  const fetchRoles = async (query: QueryParams = {}) => {
    loading.value = true;

    try {
      const queryString = buildQueryString(query);
      const url = `/api/role/all${queryString ? `?${queryString}` : ''}`;
      const response = await axiosInstance.get(url);

      const data = response.data; // Store response data in a variable

      roles.value = data.roles || []; // Handle potential missing data;
      totalPages.value = data.totalPages || 0;
      currentPage.value = data.page || 1;
    } catch (error) {
      dev((error as Error).message);
      toast.error((error as Error).message);
    } finally {
      loading.value = false;
    }
  };

  const getRoleById = async (role_id: number) => {
    try {
      const response = await axiosInstance.get(`/api/role/${role_id}`);
      roles.value = response.data;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const createRole = async (role: Role) => {
    loading.value = true;
    try {
      const response = await axiosInstance.post('/api/role', role);
      roles.value.push(response.data);
      toast.success('Role created successfully');
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      loading.value = false;
    }
  };

  const updateRole = async (role: Role) => {
    try {
      const response = await axiosInstance.put(
        '/api/role/' + role.role_id,
        role,
      );
      const rolIndex = roles.value.findIndex((r) => r.role_id === role.role_id);
      roles.value[rolIndex] = response.data;
      toast.success('Role updated successfully');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const deleteRole = async (role_id: number) => {
    try {
      await axiosInstance.delete('/api/role/' + role_id);
      roles.value = roles.value.filter((role) => role.role_id !== role_id);
      toast.success('Role deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  watch(
    () => route.query,
    (newQuery: QueryParams) => {
      currentPage.value = 1;
      const queryWithPage = { ...newQuery, page: currentPage.value.toString() };
      fetchRoles(queryWithPage);
      // router.push({ query: queryWithPage }); // Simplified router push
    },
    { immediate: true },
  );

  return {
    roles,
    fetchRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
  };
});
