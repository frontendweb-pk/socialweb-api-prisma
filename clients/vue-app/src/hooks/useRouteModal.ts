import { onBeforeMount, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

export const useRouteModal = () => {
  const open = ref(false);

  const route = useRoute();
  const router = useRouter();

  watch(
    () => [route.meta],
    (value) => {
      open.value = value[0].showModal as boolean;
    },
  );

  onBeforeMount(() => {
    open.value = route.meta.showModal as boolean;
  });

  return {
    open,
  };
};
