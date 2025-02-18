<template>
    <thead class="bg-indigo-100">
        <tr>
            <th class="p-3 text-left text-md font-medium" v-for="(column, index) in columns" :key="index">{{
                column.fieldName }}
            </th>
        </tr>
    </thead>
</template>

<script setup lang="ts" generic="T,K extends keyof T">
import type { TableColumns } from '@/lib/types';

// Define the generics correctly and set default values for columns

defineProps<{
    columns: TableColumns<T, K>[]; // Use `any` or a specific type for `T`, and `string` for the column key type
}>();

</script>