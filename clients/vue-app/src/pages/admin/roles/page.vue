<template>
  <PageTitle title="Roles & Permissions" btnLabel="">
    <Button color="primary" @click="handleOpen"> Add Role </Button>
  </PageTitle>

  <DataTable :data="roleStore.roles" :columns="columns">
    <template v-slot:[action]="{ row }">
      <RoleAction
        @delete="handleDelete(row)"
        @edit="handleRoleEdit(row)"
        :role="row"
        column="action"
      />
    </template>
  </DataTable>

  <!-- Modal used for add / update role -->
  <Modal v-if="toggle" :title="modalTitle" @close="onClose">
    <EditRole :data="editRoleData" @close="onClose" />

    <!-- <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component"></component>
      </transition>
    </router-view> -->
  </Modal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  import Button from '@/components/ui/button.vue';
  import DataTable from '@/components/ui/data-table/data-table.vue';
  import Modal from '@/components/ui/modal.vue';
  import PageTitle from '@/components/ui/page-title.vue';

  import { useToggle } from '@/hooks/useToggle';

  import { useConfirmStore } from '@/store/confirmation';
  import type { Role } from '@/store/roles';
  import { useRolesStore } from '@/store/roles';

  import type { TableColumns } from '@/lib/types';

  import EditRole from './components/edit-role.vue';
  import RoleAction from './components/role-action.vue';

  // table action column
  const action = 'action';

  // toggle composable
  const { toggle, handleOpen, handleClose } = useToggle();

  // role
  const editRoleData = ref<Role | null>(null);

  // modal title computed
  const modalTitle = computed(() =>
    editRoleData.value ? 'Edit Role' : 'Add Role',
  );

  // role store
  const roleStore = useRolesStore();
  const confirmStore = useConfirmStore();

  // columns
  type keys = keyof Role;
  const columns: TableColumns<Role, keys>[] = [
    { field: 'role_id', fieldName: 'ID' },
    { field: 'role_name', fieldName: 'Role Name' },
    { field: 'created_at', fieldName: 'Created At' },
    { field: 'updated_at', fieldName: 'Updated At' },
    { field: 'action', fieldName: 'Actions' },
  ];

  // edit role
  const handleRoleEdit = (role: Role) => {
    console.log(role, 'role');
    editRoleData.value = { ...role };
    handleOpen();
  };

  const onClose = () => {
    handleClose();
    editRoleData.value = null;
  };

  const handleDelete = (role: Role) => {
    confirmStore.handleConfirm({
      title: 'Delete Role',
      message: `Are you sure you want to delete ${role.role_name} role?`,
      onConfirm: async () => {
        await roleStore.deleteRole(role.role_id!);
        confirmStore.handleConfirmCancel();
      },
    });
  };
</script>

<style></style>
