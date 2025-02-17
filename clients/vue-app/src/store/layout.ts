import { useToggle } from "@/hooks/useToggle";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", () => {
  const { toggle, handleClose, handleOpen, onToggle } = useToggle();

  // return
  return { toggle, onToggle, handleClose, handleOpen };
});
