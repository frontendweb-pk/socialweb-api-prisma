<template>
  <PageTitle title="Roles & Permissions" btnLabel="">
    <Button color="primary" @click="onToggle">
      Add Role
    </Button>
  </PageTitle>

  <DataTable :data="roleStore.roles" :columns="columns">
    <template v-slot:[action]="{ row }">
      <TableAction :role="row" column="action" />
    </template>
  </DataTable>

  <Modal :isOpen="toggle" title="Add role" @close="onToggle">
    hi
  </Modal>

</template>

<script setup lang="ts">
import Button from '@/components/ui/button.vue';
import DataTable from '@/components/ui/data-table/data-table.vue';
import TableAction from '@/components/ui/data-table/table-action.vue';
import Modal from '@/components/ui/modal.vue';
import PageTitle from '@/components/ui/page-title.vue';
import { useToggle } from '@/hooks/useToggle';
import type { TableColumns } from '@/lib/types';
import { useRolesStore } from '@/store';
import type { Role } from '@/store/roles';

// toggle modal
const { toggle, onToggle } = useToggle()

const action = 'action';


// role store
const roleStore = useRolesStore();

// columns
type keys = keyof Role;
const columns: TableColumns<Role, keys>[] = [  // Use `Role` as the first type argument
  { field: 'role_id', fieldName: 'ID' },
  { field: 'role_name', fieldName: 'Role Name', },
  { field: "created_at", fieldName: "Created At" },
  { field: "updated_at", fieldName: "Updated At" },
  { field: "action", fieldName: "Actions", },
];

</script>

<style></style>
