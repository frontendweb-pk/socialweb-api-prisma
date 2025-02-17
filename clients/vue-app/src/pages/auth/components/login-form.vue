<template>
  <form @submit.prevent="handleLogin">
    <input
      type="text"
      name="email"
      placeholder="enter email"
      v-model="values.email"
    />
    <input
      type="password"
      name="password"
      placeholder="*******"
      v-model="values.password"
    />
    <button type="submit">Login</button>
  </form>
</template>

<script lang="ts">
export default {};
</script>
<script lang="ts" setup>
import { useAuth } from "@/store/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

// auth store
const authStore = useAuth();

// router
const router = useRouter();

const values = ref({
  email: "",
  password: "",
});

async function handleLogin() {
  await authStore.signIn(values.value);

  if (authStore.role === "admin") {
    router.push("/admin/dashboard");
  }

  if (authStore.role === "user") {
    router.push("/");
  }
}
</script>

<style>
</style>