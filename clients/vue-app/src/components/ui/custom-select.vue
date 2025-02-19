<template>
  <div class="mb-3">
    <label v-if="label" class="block mb-1 text-sm text-gray-700" for="email">
      {{ label }}
    </label>
    <div
      :class="[
        'border border-gray-300 rounded-md',
        {
          'border-red-500': errorMessage,
          'border-green-500': meta.valid && meta.dirty,
        },
      ]"
    >
      <select
        class="outline-none w-full p-2 bg-transparent"
        v-bind="$attrs"
        v-on="validationListeners"
        :name="name"
        :value="value"
      >
        <option v-if="placeholder" :value="null" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="JSON.stringify(option)"
          :value="optionValue!(option)"
        >
          <template v-if="typeof option == 'string'">{{ option }}</template>
          <template v-else>
            {{ optionLabel!(option) }}
          </template>
        </option>
      </select>
    </div>
    <div v-if="errorMessage" class="text-red-500 text-xs">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts" generic="T, K extends keyof T">
  import { useField } from 'vee-validate';

  // component options
  defineOptions({ inheritAttrs: false });

  // component props
  const props = defineProps<{
    name: string;
    label?: string;
    options: T[];
    columns?: { field: K; fieldName: string };
    getOptionLabel?: (option: T) => string;
    getOptionValue?: (option: T) => string;
    placeholder?: string;
  }>();

  const { meta, value, errorMessage, handleBlur, handleChange } = useField(
    () => props.name,
  );

  const optionLabel = (option: T) => {
    return props.getOptionLabel
      ? props.getOptionLabel(option)
      : typeof option === 'string'
        ? option
        : option['label' as keyof typeof option];
  };
  const optionValue = (option: T) => {
    return props.getOptionValue
      ? props.getOptionValue(option)
      : typeof option === 'string'
        ? option
        : option['value' as keyof typeof option];
  };

  const validationListeners = {
    blur: (evt: Event) => handleBlur(evt, true),
    change: handleChange,
    input: (evt: Event) => handleChange(evt, !!errorMessage.value),
  };
</script>
