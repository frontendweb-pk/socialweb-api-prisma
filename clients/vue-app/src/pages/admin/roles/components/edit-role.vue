<template>
  <Form @submit.prevent="onSubmit">
    <Input v-focus label="Role name" name="role_name" placeholder="Enter role name" />

    <div class="mt-5">
      <h4 class="mb-4 font-semibold text-indigo-900">Role permissions</h4>
    </div>
    <Button color="primary" size="full" type="submit">Save</Button>
  </Form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import Button from '@/components/ui/button.vue';
import Form from '@/components/ui/form.vue';
import Input from '@/components/ui/input.vue';

import { useRolesStore } from '@/store/roles';

import { type RolePermission } from '@/constants';
import type { Role, TableColumns } from '@/lib/types';
import { ref } from 'vue';


const permissions = ref<string[]>();


// const setPermission = new Set<string>()

// props
const props = defineProps<{
  data: Role | null;
}>();

// emits
const emit = defineEmits(['close']);

// role store
const roleStore = useRolesStore();

const schema = yup.object({
  role_name: yup.string().required('Role name is requried!'),
});

const { handleSubmit, meta } = useForm({
  initialValues: { role_name: props.data?.role_name || '' },
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  if (!meta.value.valid) return;
  console.log(permissions.value)
  if (props.data) {
    roleStore.updateRole({ role_id: props.data.role_id, ...values });
  } else {
    roleStore.createRole(values);
  }
  emit('close');
});



// table
const columns: TableColumns<RolePermission, keyof RolePermission>[] = [
  { field: 'value', fieldName: 'Role access' },
  { field: 'permissions', fieldName: 'permissions' },      // Indicate boolean type
];
</script>
