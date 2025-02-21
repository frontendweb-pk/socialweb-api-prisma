import axiosInstance from '@/axios-instance';
import { toast } from 'vue3-toastify';

import { onMounted, ref } from 'vue';

import { defineStore } from 'pinia';

import type { Permission } from '@/lib/types';

export const usePermissionStore = defineStore('permission', () => {
  const loading = ref(false);
  const permissions = ref<Permission[]>([]);
  //   const currentPage = ref(1);
  //   const totalItems = ref(0);

  const fetchPermissions = async () => {
    loading.value = true;
    try {
      const response = await axiosInstance.get('/api/permission/all');
      const data = response.data as Permission[];
      permissions.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // create permission
  const createPermission = async (body: Permission[]) => {
    loading.value = true;
    try {
      const response = await axiosInstance.post('/api/permissions', body);
      const data = response.data as Permission;
      console.log('data', data);
      permissions.value.concat(data);
      toast.success('Permissions created successfully');
    } catch (error) {
      toast.error('Failed to create permission');
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // create many
  const createPermissions = async (body: Permission[]) => {
    loading.value = true;
    try {
      const response = await axiosInstance.post('/api/permission/bulk', body);
      const data = response.data as Permission[];
      permissions.value.push(...data);
      toast.success('Permission created successfully');
    } catch (error) {
      toast.error('Failed to create permission');
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchPermissions();
  });

  return {
    permissions,
    fetchPermissions,
    createPermission,
    createPermissions,
  };
});
