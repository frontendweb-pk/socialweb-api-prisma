import axiosInstance from "@/axios-instance";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
export interface Role extends Record<string, unknown> {
  role_id?: number;
  role_name: string;
  created_at?: string;
  updated_at?: string;
  active?: boolean;
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
      const response = await axiosInstance.get("/api/role/" + role_id);
      roles.value = response.data;
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };

  const createRole = async (role: Role) => {
    try {
      const response = await axiosInstance.post("/api/role", role);
      roles.value.push(response.data);
      toast.success("Role created successfully");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  const updateRole = async (role: Role) => {
    try {
      const response = await axiosInstance.put(
        "/api/role/" + role.role_id,
        role,
      );
      const rolIndex = roles.value.findIndex((r) => r.role_id === role.role_id);
      roles.value[rolIndex] = response.data;
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const deleteRole = async (role_id: number) => {
    try {
      await axiosInstance.delete("/api/role/" + role_id);
      toast.success("Role deleted successfully");
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
