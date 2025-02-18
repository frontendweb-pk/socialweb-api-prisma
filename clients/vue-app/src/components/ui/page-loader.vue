<template>
    <div v-if="isLoading"
        class="fixed top-0 left-0 w-full h-full z-50 bg-white opacity-75 flex items-center justify-center">
        <div
            class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div
                class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const isLoading = ref(false);

const startLoading = () => {
    isLoading.value = true;
};

const stopLoading = () => {
    isLoading.value = false;
};

defineExpose({
    startLoading,
    stopLoading
});
</script>