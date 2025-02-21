<template>
  <header :class="['h-16 z-10', themeColor]">
    <Container :is-full="true" class="flex h-16 justify-between items-center relative">
      <div class="flex items-center gap-2">
        <button @click="onToggle" class="p-2">
          <Icon :icon="Menu" />
        </button>
        <GlobalSearch />
      </div>
      <Logo v-if="props.type === 'user'" />
      <Navbar />
    </Container>
  </header>
</template>

<script setup lang="ts">
import { Menu } from 'lucide-vue-next';

import { computed } from 'vue';

import { useLayoutStore } from '@/store/layout';

import type { Theme } from '@/lib/types';

import GlobalSearch from '../shared/global-search.vue';
import Container from '../ui/container.vue';
import Icon from '../ui/icon.vue';
import Logo from './logo.vue';
import Navbar from './navbar.vue';

// props with defaults
const props = withDefaults(
  defineProps<{
    theme?: Theme;
    type?: 'admin' | 'user';
  }>(),
  {
    theme: 'light',
  },
);

// layout store
const { onToggle } = useLayoutStore();

// computed properties
const isDark = computed(() => props.theme === 'dark');
const themeColor = computed(() =>
  isDark.value ? 'bg-indigo-950' : 'bg-white shadow ',
);
</script>
