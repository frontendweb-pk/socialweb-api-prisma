<template>
    <Teleport :to="telport">
        <TransitionGroup name="modal" tag="div">
            <div v-if="isOpen" id="popup-modal" tabindex="-1"
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full">
                <div :class="['relative p-4 w-auto h-full md:h-auto flex justify-center items-center', sizeClass]">
                    <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 w-full">
                        <div
                            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                {{ title }}
                            </h3>
                            <button @click="$emit('close')" type="button"
                                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="static-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isOpen" class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>
        </TransitionGroup>
    </Teleport>
</template>


<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    isOpen: boolean,
    title: string,
    telport?: string | HTMLElement,
    size?: keyof typeof sizes
}>(), {
    isOpen: false,
    title: "Modal",
    telport: "body",
    size: "md"
})

// emits
defineEmits(["close"])


// sizes
const sizes = {
    sm: "min-w-sm",
    md: "min-w-md",
    lg: "min-w-lg",
    xl: "min-w-xl",
    "2xl": "min-w-2xl",
    full: "min-w-full"
}
const sizeClass = computed(() => sizes[props.size])

</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    /* transform: translateX(30px); */
}
</style>