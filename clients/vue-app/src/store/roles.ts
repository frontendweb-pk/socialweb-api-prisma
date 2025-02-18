import axiosInstance from "@/axios-instance";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
export interface Role {
  role_id?: number;
  role_name: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  permissions?: string[];
}

export const useRolesStore = defineStore("roles", () => {
  const roles = ref<Role[]>([]);

  // network requests
  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get("/api/role/all");
      roles.value = response.data;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const fetchRole = async (role_id: number) => {
    try {
      const response = await axiosInstance.get("/api/roles/" + role_id);
      roles.value = response.data;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  const createRole = async (role: Role) => {
    try {
      const response = await axiosInstance.post("/api/roles", role);
      roles.value.push(response.data);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  const updateRole = async (role: Role) => {
    try {
      const response = await axiosInstance.put(
        "/api/roles/" + role.role_id,
        role
      );
      roles.value = response.data;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  const deleteRole = async (role_id: number) => {
    try {
      const response = await axiosInstance.delete("/api/roles/" + role_id);
      roles.value = response.data;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  // fetch
  onMounted(async () => await fetchRoles());

  return {
    roles,
    fetchRoles,
    fetchRole,
    createRole,
    updateRole,
    deleteRole,
  };
});
