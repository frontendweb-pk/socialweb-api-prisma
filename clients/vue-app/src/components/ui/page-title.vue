<template>
    <div class="flex items-center justify-between mb-3">
        <div>
            <h1 class="text-2xl font-semibold">{{ title }}</h1>
            <ul></ul>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">


defineProps<{
    title: string;

}>()
</script>
