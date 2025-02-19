<template>
  <Form @submit.prevent="handleSearch">
    <div
      class="flex rounded-full bg-gray-200 items-center broder-gray-100 px-3"
    >
      <input
        type="search"
        v-focus
        class="rounded-full outline-none p-2"
        placeholder="Search keyword..."
        v-model="search"
      />
      <button type="submit">
        <Icon :icon="SearchIcon" />
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
  import { SearchIcon } from 'lucide-vue-next';

  import { ref, watch } from 'vue';

  import { useRoute, useRouter } from 'vue-router';

  import Form from '../ui/form.vue';
  import Icon from '../ui/icon.vue';

  const router = useRouter();
  const route = useRoute();

  const search = ref('');

  // watch sarch value
  watch(search, (value) => {
    if (!value) {
      router.push({ path: route.fullPath });
    }
  });

  const handleSearch = () => {
    router.push({
      path: route.fullPath,
      query: { ...route.query, search: search.value },
    });
  };
</script>
