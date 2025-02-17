<template>
    <component :size="20" :stroke="iconColor" :is="icon" />
</template>

<script setup lang="ts">
import type { Theme } from '@/lib/types';
import { HomeIcon, type LucideIcon } from 'lucide-vue-next';
import { computed } from 'vue';

// Define props with defaults
const props = withDefaults(defineProps<{
    theme?: Theme;
    icon?: LucideIcon | string;
}>(), {
    theme: 'light',
    icon: () => HomeIcon
});

// Computed property for dynamic stroke color
const iconColor = computed(() => (props.theme === 'dark' ? 'white' : 'black'));
</script>
