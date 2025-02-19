<template>
  <PageTitle title="Roles & Permissions" btnLabel="">
    <Button color="primary" @click="handleOpen"> Add Role </Button>
  </PageTitle>

  <DataTable :data="roleStore.roles" :columns="columns">
    <template v-slot:[action]="{ row }">
      <RoleAction @edit="handleRoleEdit(row)" :role="row" column="action" />
    </template>
  </DataTable>

  <!-- Modal used for add / update role -->
  <Modal v-if="toggle" :title="modalTitle" @close="onClose">
    <EditRole :data="editRoleData" @close="onClose" />
  </Modal>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import DataTable from "@/components/ui/data-table/data-table.vue";
import Modal from "@/components/ui/modal.vue";
import PageTitle from "@/components/ui/page-title.vue";
import { useToggle } from "@/hooks/useToggle";
import type { TableColumns } from "@/lib/types";
import { useRolesStore } from "@/store";
import type { Role } from "@/store/roles";
import { computed, ref } from "vue";
import EditRole from "./components/edit-role.vue";
import RoleAction from "./components/role-action.vue";

// table action column
const action = "action";

// toggle composable
const { toggle, handleOpen, handleClose } = useToggle();

// role
const editRoleData = ref<Role | null>(null);

// modal title computed
const modalTitle = computed(() =>
  editRoleData.value ? "Edit Role" : "Add Role",
);

// role store
const roleStore = useRolesStore();

// columns
type keys = keyof Role;
const columns: TableColumns<Role, keys>[] = [
  // Use `Role` as the first type argument
  { field: "role_id", fieldName: "ID" },
  { field: "role_name", fieldName: "Role Name" },
  { field: "created_at", fieldName: "Created At" },
  { field: "updated_at", fieldName: "Updated At" },
  { field: "action", fieldName: "Actions" },
];

// edit role
const handleRoleEdit = (role: Role) => {
  editRoleData.value = { ...role };
  handleOpen();
};

const onClose = () => {
  handleClose();
  editRoleData.value = null;
};
</script>

<style></style>
