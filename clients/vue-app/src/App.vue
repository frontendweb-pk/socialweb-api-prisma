<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Confirmation from "./components/ui/confirm.vue";
import PageLoader from "./components/ui/page-loader.vue";
import { useConfirmStore } from "./store/confirmation";

// current route
const route = useRoute();
console.log(route.meta);
const router = useRouter();

const authStore = useAuthStore();
const confirmStore = useConfirmStore();
// transition
onMounted(() => {
  authStore.checkAuth();
});

// page loader
const pageLoaderRef = ref<InstanceType<typeof PageLoader> | null>(null);
onMounted(() => {
  router.beforeEach((_, __, next) => {
    pageLoaderRef.value?.startLoading();
    next();
  });
  router.afterEach(() => {
    pageLoaderRef.value?.stopLoading();
  });
});
</script>

<template>
  <PageLoader ref="pageLoaderRef" />
  <Confirmation v-if="confirmStore.confirm.visible" />
  <RouterView v-slot="{ Component, route }">
    <Transition
      :name="(route.meta.transition as string) || 'fade'"
      mode="out-in">
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
