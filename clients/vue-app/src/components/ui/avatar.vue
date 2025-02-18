<template>
    <div :class="[rounded && 'rounded-full', sizeClass, 'overflow-hidden']">
        <img :src="src" :alt="alt" />
    </div>
</template>
<script setup lang="ts">
import type { Size } from '@/lib/types';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        src?: string;
        alt?: string;
        size?: Size;
        rounded?: boolean;
    }>(), {
    src: '/avatar.png',
    alt: 'avatar',
    size: "sm",
    rounded: true
})

const sizes = {
    'sm': 'h-8 w-8',
    'md': 'h-10 w-10',
    'lg': 'h-12 w-12',
    'xl': 'h-16 w-16',
    '2xl': 'h-20 w-20',
    '3xl': 'h-24 w-24',
    '4xl': 'h-32 w-32',
}

const sizeClass = computed(() => sizes[props.size as keyof typeof sizes])

</script>