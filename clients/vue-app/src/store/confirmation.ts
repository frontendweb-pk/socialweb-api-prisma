import { defineStore } from "pinia";
import { ref } from "vue";

interface Confirm {
  visible?: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}
export const useConfirmStore = defineStore("confirmation", () => {
  const confirm = ref<Confirm>({
    title: "",
    message: "",
    visible: false,
    onConfirm: () => {},
    onCancel: () => {},
  });

  const handleConfirm = (confirmation: Confirm) => {
    confirm.value = {
      ...confirm.value,
      ...confirmation,
      visible: true,
    };
  };
  const handleConfirmCancel = () => {
    confirm.value = {
      ...confirm.value,
      visible: false,
    };
  };

  return {
    confirm,
    handleConfirm,
    handleConfirmCancel,
  };
});
