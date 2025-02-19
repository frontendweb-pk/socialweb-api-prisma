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
    icon?: boolean;
  }>(),
  {
    size: "sm",
    color: "primary",
    type: "button",
  },
);
const classes = {
  base: "text-gray-300 text-indigo-950 hover: hover:text-white rounded-md",
  primary: "text-indigo-950 text-white hover:text-indigo-900",
  secondary: "text-gray-950 text-white",
  danger: "text-rose-500",
  warning: "text-yellow-950 ",
  success: "text-green-950 ",
  info: "text-blue-950 ",
  light: "text-gray-100 text-black",
  dark: "text-gray-950 ",
  link: "text-blue-950 underline",
  disabled: "text-gray-300 text-gray-600 cursor-not-allowed",
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
