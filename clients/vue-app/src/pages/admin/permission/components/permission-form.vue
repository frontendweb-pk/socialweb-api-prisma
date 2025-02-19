<template>
  <Form @submit.prevent="onSubmit">
    <CustomSelect
      placeholder="Select api route"
      label="Api"
      :options="routes"
      name="route"
      :get-option-label="selectOption"
    />
    <Input
      v-focus
      label="Permission"
      name="permission"
      placeholder="Enter permission as post:read"
    />
    <Button color="primary" size="full" type="submit">Save</Button>
  </Form>
</template>
<script setup lang="ts">
  import { routes } from '@/constants';
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';

  import Button from '@/components/ui/button.vue';
  import CustomSelect from '@/components/ui/custom-select.vue';
  import Form from '@/components/ui/form.vue';
  import Input from '@/components/ui/input.vue';

  import { usePermissionStore } from '@/store/permission';

  // emits
  const emit = defineEmits(['close']);

  // store
  const permissionStore = usePermissionStore();

  // schema
  const schema = yup.object({
    route: yup.string().required('Route is requried!'),
    permission: yup.string().required('Permission is requried!'),
  });

  // form
  const { meta, handleSubmit } = useForm({
    initialValues: { route: 'post', permission: '' },
    validationSchema: schema,
  });

  // submit
  const onSubmit = handleSubmit(async (values) => {
    if (!meta.value.valid) return;
    permissionStore.createPermission({
      permission: `${values.route}:${values.permission}`,
    });
    console.log('values', values);
    emit('close');
  });

  const selectOption = (option: Record<keyof (typeof routes)[0], string>) => {
    return option.title;
  };
</script>
