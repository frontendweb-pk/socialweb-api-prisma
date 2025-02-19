<template>
  <AdminSidebar />
  <main
    :class="[
      'flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300 ease-in-out',
      classes,
    ]"
  >
    <Header />
    <main class="flex-1 px-6 py-6 bg-gray-50 z-0 relative">
      <RouterView />
    </main>
    <Footer />
  </main>
</template>
<script setup lang="ts">
  import { computed } from 'vue';

  import Footer from '@/components/layout/footer.vue';
  import Header from '@/components/layout/header.vue';

  import { useLayoutStore } from '@/store/layout';

  import AdminSidebar from './admin-sidebar.vue';

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
