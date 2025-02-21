<template>
  <div class="mb-3">
    <label v-if="label" class="block mb-1 text-sm text-gray-800" for="email">
      {{ label }}
    </label>
    <div :class="[
      'border border-gray-300 rounded-md',
      {
        'border-red-500': errorMessage,
        'border-green-500': meta.valid && meta.dirty,
      },
    ]">
      <input v-bind="$attrs" v-on="validationListeners" class="outline-none w-full p-2 bg-transparent" :value="value"
        :type="type" :name="name" :placeholder="placeholder" />
    </div>
    <div v-if="errorMessage" class="text-red-500 text-xs">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

// component options
defineOptions({
  inheritAttrs: false,
});

// component props
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    type?: HTMLInputElement['type'];
    placeholder?: string;
  }>(),
  {
    type: 'text',
  },
);

// const model = defineModel({ default: '' })

// form
const { value, meta, errorMessage, handleBlur, handleChange } = useField(
  () => props.name,
);

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, true),
  change: handleChange,
  input: (evt: Event) => handleChange(evt, !!errorMessage.value),
};
</script>
