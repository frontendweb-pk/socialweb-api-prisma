<template>
  <div class="flex gap-2">
    <IconButton
      color="danger"
      size="sm"
      @click="$emit('delete')"
      v-bind="$attrs"
    >
      <Icon :icon="TrashIcon" class="text-rose-600" />
    </IconButton>
    <IconButton @click="$emit('edit')" v-bind="$attrs">
      <Icon :icon="EditIcon" />
    </IconButton>
    <RouterLink :to="'admin/role/permission'" v-bind="$attrs" color="base">
      Permissions
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { EditIcon, TrashIcon } from 'lucide-vue-next';

  import IconButton from '@/components/ui/icon-button.vue';
  import Icon from '@/components/ui/icon.vue';

  import type { Role } from '@/lib/types';

  defineOptions({
    inheritAttrs: false,
  });

  defineProps<{
    role: Role;
    column: string;
  }>();

  defineEmits(['edit', 'permissions', 'delete']);
</script>
