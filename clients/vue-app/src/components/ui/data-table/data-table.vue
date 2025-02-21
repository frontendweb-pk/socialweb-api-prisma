<template>

  <table class="w-full">
    <TableHead :columns="columns" />
    <tbody>
      <tr class="hover:bg-indigo-50/50 text-sm text-slate-900" v-for="row in data" :key="JSON.stringify(row)">
        <template v-for="column in columns" :key="column.field">
          <td class="p-2" v-if="$slots[column.field]">
            <slot :name="column.field" :row="row" :column="column.field">{{
              row[column.field]
              }}</slot>
          </td>
          <td class="p-2" v-else-if="column.field === 'created_at'">
            {{ transformDate(row[column.field] as string) }}
          </td>
          <td class="p-2" v-else-if="column.field === 'updated_at'">
            {{ transformDate(row[column.field] as string) }}
          </td>
          <td class="p-2" v-else>{{ row[column.field] }}</td>
        </template>
      </tr>
    </tbody>
  </table>
  <div class="flex items-center justify-between" v-if="pagination">
    <div>
      <select>
        <option v-for="page in totalPages" :key="page" :value="page" :selected="page === currentPage">
          Page {{ page }}
        </option>
      </select>
    </div>
    <div class="flex space-x-2">
      <Button>Previous</Button>
      <Button>Next</Button>
    </div>
  </div>

</template>

<script setup lang="ts" generic="T, K extends keyof T">
import { format } from 'date-fns';

import type { TableColumns } from '@/lib/types';

import Button from '../button.vue';
import TableHead from './table-head.vue';



const transformDate = (date: string) => {
  return format(new Date(date), 'dd MMM yyyy, hh:mm a');
};

// Define props with generics
withDefaults(
  defineProps<{
    pagination?: boolean;
    currentPage?: number;
    totalPages?: number;
    data: T[]; // Array of data, could be more specific based on your needs
    columns: TableColumns<T, K>[]; // Assuming columns use a string key type, adjust accordingly
  }>(),
  {
    currentPage: 1,
    totalPages: 1,
  },
);
</script>
