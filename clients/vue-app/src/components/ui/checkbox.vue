<template>
    <div class="mb-3 w-full">
        <div class="flex items-center gap-2">
            <input v-on="validationListeners" type="checkbox" v-bind="$attrs" :id="value" :name="name"
                :checked="checked" />
            <label v-if="label" class="block mb-1 text-sm text-gray-700" :for="value">
                {{ label }}
            </label>
        </div>
        <div v-if="errorMessage" class="text-red-500 text-xs">
            {{ errorMessage }}
        </div>
    </div>

</template>
<script setup lang="ts">
import { useField } from 'vee-validate';



defineOptions({ inheritAttrs: false })

// component props
const props = defineProps<{
    // modelValue: { type: null, },
    name: string;
    label?: string;
    value?: string;
}>();

// emits
const emit = defineEmits<{
    (e: 'change', value: { value: string, name: string }): void
}>()

// form
const { checked, errorMessage, handleBlur, handleChange } = useField(() => props.name, undefined, {
    type: 'checkbox',
    checkedValue: props.value,
})
const validationListeners = {
    blur: (evt: Event) => handleBlur(evt, true),
    change: (e: Event) => {
        handleChange(e);
        const v = (e.target as HTMLInputElement).value;
        emit('change', { value: v, name: props.name });
    },
    input: (evt: Event) => handleChange(evt, !!errorMessage.value),
};
</script>