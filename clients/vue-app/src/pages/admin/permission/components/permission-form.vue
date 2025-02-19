<template>
  <Form @submit.prevent="onSubmit">
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
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';

  import Button from '@/components/ui/button.vue';
  import Input from '@/components/ui/input.vue';

  import { usePermissionStore } from '@/store/permission';

  // emits
  const emit = defineEmits(['close']);

  // store
  const permissionStore = usePermissionStore();

  // schema
  const schema = yup.object({
    permission: yup
      .string()
      .required('Permission is requried!')
      .matches(
        /^[a-z]+:[a-z]+$/,
        'Permission should be in format route:action, ex: post:read',
      ),
  });

  // form
  const { meta, handleSubmit } = useForm({
    initialValues: { permission: '' },
    validationSchema: schema,
  });

  // submit
  const onSubmit = handleSubmit(async (values) => {
    if (!meta.value.valid || !values.permission.includes(':')) return;
    permissionStore.createPermission(values);
    emit('close');
  });
</script>
