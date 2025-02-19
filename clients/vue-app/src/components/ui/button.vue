<template>
  <button
    :class="['rounded-md cursor-pointer', colorClass, sizeClass]"
    v-bind="$attrs"
    :type="type">
    <slot>Submit</slot>
  </button>
</template>
<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<{
    color?: keyof typeof classes;
    type?: ButtonHTMLAttributes["type"];
    size?: keyof typeof sizes;
  }>(),
  {
    size: "sm",
    color: "primary",
    type: "button",
  },
);

const classes = {
  base: "p-2 bg-gray-300 text-indigo-950 hover:text-white hover:text-white rounded-md",
  primary: "bg-indigo-950 text-white hover:bg-indigo-900",
  secondary: "bg-gray-950 text-white",
  danger: "bg-red-950 text-white",
  warning: "bg-yellow-950 text-white",
  success: "bg-green-950 text-white",
  info: "bg-blue-950 text-white",
  light: "bg-gray-100 text-black",
  dark: "bg-gray-950 text-white",
  link: "text-blue-950 underline",
  disabled: "bg-gray-300 text-gray-600 cursor-not-allowed",
};

const sizes = {
  sm: "py-1 px-2",
  md: "py-2 px-3",
  lg: "py-3 px-4",
  xl: "py-4 px-5",
  "2xl": "py-5 px-6",
  "3xl": "py-6 px-7",
  full: "w-full py-2 px-4",
};

const colorClass = computed(() => classes[props.color]);
const sizeClass = computed(() => sizes[props.size]);
</script>
