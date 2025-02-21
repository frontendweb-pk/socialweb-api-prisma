<template>
    <Form @submit.prevent="onSubmit">
        <CustomSelect placeholder="Select api route" label="Api" :options="routes" name="route" />
        <h6 class="text-sm font-medium mb-2">Select permissions</h6>
        <Checkbox v-for="check in CRUD" :value="check" name="permission" :key="check" :label="check" />
        <Button color="primary" size="full" type="submit">Save</Button>
    </Form>
</template>
<script setup lang="ts">
import { CRUD, routes } from '@/constants';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import Button from '@/components/ui/button.vue';
import CustomSelect from '@/components/ui/custom-select.vue';
import Form from '@/components/ui/form.vue';

import Checkbox from '@/components/ui/checkbox.vue';
import { usePermissionStore } from '@/store/permission';

// emits
const emit = defineEmits(['close']);

// store
const permissionStore = usePermissionStore();

// schema
const schema = yup.object({
    route: yup.string().required('Route is requried!'),
    permission: yup.array(yup.string().required("Permission is required!"))
        .required('Permission is requried!'),
});

// form
const { meta, handleSubmit } = useForm({
    initialValues: { route: 'post', permission: [] },
    validationSchema: schema,
});

// submit
const onSubmit = handleSubmit(async (values) => {
    if (!meta.value.valid) return;
    const updatedValues = values.permission.map((value: string) => ({
        permission: `${values.route}:${value}`
    }));
    console.log(values.permission)
    // permissionStore.createPermissions(updatedValues);
    emit('close');
});

// const selectOption = (option: Record<keyof (typeof routes)[0], string>) => {
//     return option.value;
// };
</script>
