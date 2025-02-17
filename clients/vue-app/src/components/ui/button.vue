<template>
    <button :type="type">
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