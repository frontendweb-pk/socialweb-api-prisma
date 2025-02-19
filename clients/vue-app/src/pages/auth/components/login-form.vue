<template>
  <div class="mb-6">
    <h1 class="text-2xl text-indigo-950 font-medium mb-1">Login</h1>
    <p class="text-xs text-gray-500">
      If you don't have an account, please click
      <RouterLink to="/signup" class="text-rose-600">Sign up </RouterLink>
    </p>
  </div>
  <Form @submit.prevent="handleLogin">
    <Input
      v-focus
      label="Email"
      type="text"
      name="email"
      placeholder="enter email"
    />
    <Input
      label="Password"
      type="password"
      name="password"
      placeholder="*******"
    />
    <Button color="primary" size="full" type="submit">Login</Button>
  </Form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate';
  import * as yup from 'yup';

  import Button from '@/components/ui/button.vue';
  import Form from '@/components/ui/form.vue';
  import Input from '@/components/ui/input.vue';

  import { useAuthStore } from '@/store/auth';

  // auth store
  const authStore = useAuthStore();

  // form
  const { values, meta, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().required('Email is required!').email('Invalid email'),
      password: yup.string().required('Password is required!').min(8),
    }),
  });

  const handleLogin = handleSubmit(async () => {
    if (meta.value.valid) {
      await authStore.signIn(values);
    }
  });
</script>

<style></style>
