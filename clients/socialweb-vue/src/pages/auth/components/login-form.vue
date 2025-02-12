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

// auth store
const authStore = useAuth();

const values = ref({
  email: "",
  password: "",
});

function handleLogin() {
  authStore.signIn(values.value);
}
</script>

<style>
</style>