<template>
  <AdminSidebar />
  <main
    :class="[
      'flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300 ease-in-out',
      classes,
    ]"
  >
    <Header />
    <main class="flex-1 p-4">
      <RouterView />
    </main>
    <Footer />
  </main>
</template>
<script setup lang="ts">
  import { computed } from 'vue';

  import { useLayoutStore } from '@/store/layout';

  import Footer from '../footer.vue';
  import Header from '../header.vue';
  import AdminSidebar from './AdminSidebar.vue';

  // layout store
  const layoutStore = useLayoutStore();

  // classes
  const classes = computed(() => {
    return {
      'ml-0': layoutStore.toggle,
      'ml-64': !layoutStore.toggle,
    };
  });
</script>
