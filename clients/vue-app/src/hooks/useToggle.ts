import { ref } from "vue";

export function useToggle() {
  const toggle = ref<boolean>(false);

  // handlers
  const onToggle = () => {
    console.log("toggle");
    toggle.value = !toggle.value;
  };
  const handleClose = () => (toggle.value = false);
  const handleOpen = () => (toggle.value = true);

  // return
  return {
    toggle,
    onToggle,
    handleClose,
    handleOpen,
  };
}
