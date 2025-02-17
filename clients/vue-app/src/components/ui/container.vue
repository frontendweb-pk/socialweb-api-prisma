<template>
    <div :class="container">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    isFull?: boolean
}>(), {
    isFull: false
})

const container = computed(() => ({
    'w-full': props.isFull,
    'w-11/12': !props.isFull
}))
</script>