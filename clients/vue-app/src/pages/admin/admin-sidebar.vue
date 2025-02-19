<template>
  <aside :class="['bg-white shadow-md z-10', classes]">
    <Logo class="flex py-2 px-3 items-center shadow-sm" to="/admin" />
    <div class="divider border-t border-t-gray-200 py-3"></div>
    <div class="p-2">
      <ul>
        <template v-for="menu in adminMenus" :key="menu.name">
          <span class="block text-xs uppercase text-gray-500 py-2">
            {{ menu.name }}
          </span>
          <ul class="mb-4 border-b border-b-gray-100 pb-4" v-if="menu.children">
            <NavItem
              class="py-2 text-sm flex items-center gap-2"
              v-for="child in menu.children"
              :key="child.name"
              :to="child.href"
              isMenu
            >
              <Icon :icon="child.icon" /> {{ child.name }}
            </NavItem>
          </ul>
        </template>
      </ul>
    </div>
  </aside>
</template>
<script setup lang="ts">
  import { adminMenus } from '@/constants/admin-menus';

  import { computed } from 'vue';

  import Logo from '@/components/layout/logo.vue';
  import Icon from '@/components/ui/icon.vue';
  import NavItem from '@/components/ui/nav-item.vue';

  import { useLayoutStore } from '@/store/layout';

  import type { Theme } from '@/lib/types';

  const layoutStore = useLayoutStore();
  defineProps<{ theme?: Theme }>();

  // classes
  const classes = computed(() => {
    return {
      'fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out':
        true,
      'translate-x-0': !layoutStore.toggle,
      '-translate-x-full': layoutStore.toggle,
    };
  });
</script>
