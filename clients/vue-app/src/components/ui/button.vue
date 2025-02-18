<template>
    <button class="cursor-pointer" v-bind="$attrs" :type="type">
        <slot>Submit</slot>
    </button>
</template>
<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

withDefaults(defineProps<{
    type?: ButtonHTMLAttributes['type']
}>(), {
    type: 'button'
})


</script>