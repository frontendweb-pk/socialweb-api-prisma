<template>
  <div class="mb-6">
    <h1 class="text-2xl text-indigo-950 font-medium mb-1">Login</h1>
    <p class="text-xs text-gray-500">If you don't have an account,
      please click <RouterLink to="/signup" class="text-rose-600">Sign up
      </RouterLink>
    </p>
  </div>
  <Form @submit.prevent="handleLogin">
    <Input label="Email" type="text" name="email" placeholder="enter email" v-model="values.email" />
    <Input label="Password" type="password" name="password" placeholder="*******" v-model="values.password" />
    <Button class="bg-indigo-950 w-full rounded-md text-white p-2" type="submit">Login</Button>
  </Form>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store";
import { ref } from "vue";
import Input from "@/components/ui/input.vue";
import Form from "@/components/ui/form.vue";
import Button from "@/components/ui/button.vue";

// auth store
const authStore = useAuthStore();

// form values
const values = ref({ email: "", password: "", });

async function handleLogin() {
  await authStore.signIn(values.value);
}
</script>

<style></style>