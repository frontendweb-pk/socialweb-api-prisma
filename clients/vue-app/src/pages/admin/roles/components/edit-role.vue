<template>
  <Form @submit.prevent="onSumit">
    <Input label="Role name" name="role_name" placeholder="Enter role name" />
    <Button color="primary" size="full" type="submit">Save</Button>
  </Form>
</template>
<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import Form from "@/components/ui/form.vue";
import Input from "@/components/ui/input.vue";
import type { Role } from "@/lib/types";
import { useRolesStore } from "@/store/roles";
import { useForm } from "vee-validate";
import * as yup from "yup";

// props
const props = defineProps<{
  data: Role | null;
}>();

// emits
const emit = defineEmits(["close"]);

// role store
const roleStore = useRolesStore();

const schema = yup.object({
  role_name: yup.string().required("Role name is requried!"),
});

const { handleSubmit, meta } = useForm({
  initialValues: { role_name: props.data?.role_name || "" },
  validationSchema: schema,
});

const onSumit = handleSubmit(async (values) => {
  if (!meta.value.valid) return;
  if (props.data) {
    roleStore.updateRole({ role_id: props.data.role_id, ...values });
  } else {
    roleStore.createRole(values);
  }
  emit("close");
});
</script>
