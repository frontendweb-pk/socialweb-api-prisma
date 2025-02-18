<template>
  <Cover class="bg-indigo-900 flex items-center justify-center overflow-x-hidden">
    <div class="bg-white p-8 rounded-lg shadow-lg min-w-72">
      <RouterView />
    </div>
  </Cover>
</template>

<script setup lang="ts">
import Cover from '@/components/ui/cover.vue';
</script>

<style></style>