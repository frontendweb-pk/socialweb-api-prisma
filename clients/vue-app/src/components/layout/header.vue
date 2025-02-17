<template>
    <header :class="['h-16 ', themeColor]">
        <Container class="flex justify-between items-center h-full">
            <Button @click="onToggle" class="p-2">
                <Icon :icon="Menu" />
            </Button>
            <Logo v-if="props.type === 'user'" />
            <Navbar />
        </Container>
    </header>
</template>

<script setup lang="ts">
import Container from '../ui/container.vue';
import Logo from './logo.vue';
import Navbar from './navbar.vue';
import Icon from '../ui/icon.vue';
import Button from '../ui/button.vue';
import type { Theme } from '@/lib/types';
import { computed } from 'vue';
import { Menu } from 'lucide-vue-next';
import { useLayoutStore } from '@/store/layout';

// props with defaults
const props = withDefaults(defineProps<{
    theme?: Theme,
    type?: 'admin' | 'user'
}>(), {
    theme: "light"
});

// layout store
const { onToggle } = useLayoutStore()

// computed properties
const isDark = computed(() => props.theme === 'dark');
const themeColor = computed(() => isDark.value ? 'bg-indigo-950' : 'bg-white shadow ');

</script>
