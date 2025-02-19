<template>
  <table class="w-full my-4">
    <TableHead :columns="columns" />
    <tbody>
      <tr
        class="hover:bg-indigo-50/50 text-sm text-slate-900"
        v-for="row in data"
        :key="JSON.stringify(row)"
      >
        <template v-for="column in columns" :key="column.field">
          <td class="p-3" v-if="$slots[column.field]">
            <slot :name="column.field" :row="row" :column="column.field">{{
              row[column.field]
            }}</slot>
          </td>
          <td class="p-3" v-else-if="column.field === 'created_at'">
            {{ transformDate(row[column.field] as string) }}
          </td>
          <td class="p-3" v-else-if="column.field === 'updated_at'">
            {{ transformDate(row[column.field] as string) }}
          </td>
          <td class="p-3" v-else>{{ row[column.field] }}</td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts" generic="T, K extends keyof T">
  import { format } from 'date-fns';

  import type { TableColumns } from '@/lib/types';

  import TableHead from './table-head.vue';

  const transformDate = (date: string) => {
    return format(new Date(date), 'dd MMM yyyy, hh:mm a');
  };

  // Define props with generics
  defineProps<{
    data: T[]; // Array of data, could be more specific based on your needs
    columns: TableColumns<T, K>[]; // Assuming columns use a string key type, adjust accordingly
  }>();
</script>
