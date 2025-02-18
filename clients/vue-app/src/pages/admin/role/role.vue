<template>
  <PageTitle title="Roles & Permissions" btnLabel="Add Role" />
  <DataTable :data="roleStore.roles" :columns="columns">
    <template v-slot:[action]="{ row }">
      <TableAction :role="row" column="action" />
    </template>

  </DataTable>

</template>

<script setup lang="ts">
import DataTable from '@/components/ui/data-table/data-table.vue';
import TableAction from '@/components/ui/data-table/table-action.vue';
import PageTitle from '@/components/ui/page-title.vue';
import type { TableColumns } from '@/lib/types';
import { useRolesStore } from '@/store';
import type { Role } from '@/store/roles';

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