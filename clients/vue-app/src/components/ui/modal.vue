<template>
  <Teleport :to="telport">
    <TransitionGroup name="modal" tag="div">
      <div key="modal" id="popup-modal" tabindex="-1"
        class="overflow-y-auto overflow-x-hidden flex items-center justify-center fixed top-0 right-0 left-0 z-50  md:inset-0 h-full max-h-full">
        <div :class="['relative h-full md:h-auto w-full', sizeClass]">
          <div class="relative bg-white p-8 rounded-lg shadow-sm dark:bg-gray-700">
            <div class="flex flex-col items-center justify-center p-4 md:p-5 dark:border-gray-600 border-gray-200">
              <h2 class="text-2xl text-indigo-950 text-center font-semibold dark:text-white">
                {{ title }}
              </h2>
              <p class="text-gray-700">Create new role and set role permissions</p>
              <button @click="$emit('close')" type="button"
                class="text-gray-400 cursor-pointer absolute -top-2 -right-2 bg-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="modal-body p-4 md:p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
      <div key="bg" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    telport?: string | HTMLElement;
    size?: keyof typeof sizes;
  }>(),
  {
    isOpen: false,
    title: "Modal",
    telport: "body",
    size: "lg",
  },
);

// emits
defineEmits(["close"]);

// sizes
const sizes = {
  sm: "min-w-sm",
  md: "min-w-md",
  lg: "max-w-4xl",
  xl: "min-w-xl",
  "2xl": "min-w-2xl",
  full: "min-w-full",
};
const sizeClass = computed(() => sizes[props.size]);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-body {
  max-height: calc(100vh - 200px);
  /* Adjust the height to make sure the content is scrollable */
  overflow-y: auto;
  /* Make the body scrollable */
}
</style>
