<script setup lang="ts">
import { useRoute } from "vue-router";
import Cover from "./components/ui/cover.vue";

// current route
const route = useRoute()
console.log(route.meta)


</script>

<template>
  <Cover>
    <RouterView v-slot="{ Component, route }">
      <Transition :name="route.meta.transition as string || 'fade'" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </Cover>
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
