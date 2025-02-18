<template>
    <div class="mb-3">
        <label v-if="label" class="block mb-1 text-sm  text-gray-700" for="email">{{ label }}</label>
        <div class="border border-gray-200 rounded-md">
            <input v-bind="$attrs" v-model="model" class="outline-none p-2 bg-transparent" :type="type" name="email"
                :placeholder="placeholder" />
        </div>
        <div v-if="error" class="text-red-500 text-xs">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">

// component options
defineOptions({ inheritAttrs: false })

// component props
withDefaults(
    defineProps<{
        error?: string;
        label?: string;
        type?: HTMLInputElement['type'];
        placeholder?: string;
    }>(), {
    type: 'text'
})

const model = defineModel({ default: '' })
</script>