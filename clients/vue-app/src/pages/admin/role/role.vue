<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Roles</h1>
    <Button class="bg-indigo-950 text-white p-2 rounded-md">Add Role</Button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <div>
      <RoleList :roles="roleStore.roles" />
    </div>
  </div>
</template>



<script setup lang="ts">
import RoleList from '@/components/admin/roles/role-list.vue';
import { useRolesStore } from '@/store';


const roleStore = useRolesStore();



</script>

<style></style>