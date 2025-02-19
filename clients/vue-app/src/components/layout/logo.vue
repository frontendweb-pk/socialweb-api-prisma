<template>
  <RouterLink
    :to="props.to"
    :class="['flex gap-2 h-16 items-center font-medium', theme]">
    <div
      :class="[
        'h-8 w-8 rounded-lg flex items-center justify-center bg-indigo-950 text-white',
        theme,
      ]">
      SA
    </div>
    <span>Social App</span>
  </RouterLink>
</template>
<script setup lang="ts">
import type { Theme } from "@/lib/types";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    to?: string;
    mode?: Theme;
  }>(),
  {
    to: "/",
    mode: "light",
  },
);

// const isDark = computed(() => props.mode === 'dark');
const theme = computed(() =>
  props.mode === "dark" ? "text-white bg-indigo-950" : "text-indigo-950",
);
</script>
