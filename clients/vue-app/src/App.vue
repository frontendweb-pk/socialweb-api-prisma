<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./store";
import Cookies from "js-cookie";

// current route
const route = useRoute()
console.log(route.meta)

const authStore = useAuthStore()
// transition
onMounted(() => {
  authStore.checkAuth();
  console.log('mounted', document.cookie)
  console.log('c', Cookies.get("refreshToken"))
});
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition as string || 'fade'" mode="out-in">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
