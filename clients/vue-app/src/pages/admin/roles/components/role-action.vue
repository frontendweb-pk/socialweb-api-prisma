<template>
  <div class="flex gap-2">
    <Button @click="$emit('edit')" v-bind="$attrs"> Edit Role </Button>
    <RouterLink to="/" v-bind="$attrs" color="base"> Permissions </RouterLink>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import type { Role } from "@/lib/types";

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  role: Role;
  column: string;
}>();

defineEmits(["edit", "permissions"]);
</script>
