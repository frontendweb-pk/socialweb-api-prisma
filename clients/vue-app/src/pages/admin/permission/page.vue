<template>
  <PageTitle title="Permissions">
    <Button color="primary" @click="handleOpen"> Add permission </Button>
  </PageTitle>

  <DataTable :data="permissionStore.permissions" :columns="columns" />

  <Modal v-if="toggle" @close="handleClose" title="Add Permission">
    <PermissionForm @close="handleClose" />
  </Modal>
</template>

<script lang="ts" setup>
  import Button from '@/components/ui/button.vue';
  import DataTable from '@/components/ui/data-table/data-table.vue';
  import Modal from '@/components/ui/modal.vue';
  import PageTitle from '@/components/ui/page-title.vue';

  import { useToggle } from '@/hooks/useToggle';

  import { type Permission, usePermissionStore } from '@/store/permission';

  import type { TableColumns } from '@/lib/types';

  import PermissionForm from './components/permission-form.vue';

  // permission store
  const permissionStore = usePermissionStore();

  // toggle
  const { toggle, handleClose, handleOpen } = useToggle();
  // columns
  type Keys = keyof Permission;
  const columns: TableColumns<Permission, Keys>[] = [
    {
      field: 'permission_id',
      fieldName: 'id',
    },
    {
      field: 'permission',
      fieldName: 'Permission',
    },
    {
      field: 'action',
      fieldName: 'Action',
    },
  ];
</script>

<style></style>
