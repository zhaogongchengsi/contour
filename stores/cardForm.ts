import { defineStore } from "pinia";
import { useToggle } from "@vueuse/core";
import { CardFormValue, IconInfo } from "~/types";

const initCardValue: CardFormValue = {
  size: {
    row: 1,
    col: 1,
  },
  link: "",
  buttonStyle: "windows",
  image: "url:/images/grid.webp",
  background: "#fff",
};

export const useCardFormModal = defineStore("card-form-modal", () => {
  const isShow = ref(false);
  const toggle = useToggle(isShow);
  const show = () => (isShow.value = true);
  const close = () => (isShow.value = false);
  const title = ref("");
  const curredIcon = ref<IconInfo>();

  const formValue = reactive<Omit<CardFormValue, "edit">>(initCardValue);

  const reset = () => {
    const { background, image, buttonStyle, link, size } = initCardValue;
    formValue.background = background;
    formValue.buttonStyle = buttonStyle;
    formValue.image = image;
    formValue.link = link;
    formValue.size = size;
  };

  return {
    isShow,
    toggle,
    show,
    close,
    formValue,
    title,
    reset,
    icon: curredIcon,
  };
});
