import { PropType } from "vue";
import { CardButtonStyle, IconInfo, LinearGradient } from "~/types";

export const key = Symbol("card-props-key");

export const options = {
  row: {
    type: [String, Number],
    default: 1,
  },
  col: {
    type: [String, Number],
    default: 1,
  },
  size: {
    type: String as PropType<`${number}-${number}`>,
    default: "1-1",
  },
  edit: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: "#",
  },
  image: {
    type: String,
    default: "",
  },
  buttonStyle: {
    type: String as PropType<CardButtonStyle>,
    default: "apple",
  },
  background: {
    type: [String, Object] as PropType<string | LinearGradient>,
    default: "fff",
  },
  icon: {
    type: Object as PropType<IconInfo>,
  },
};

export const useCardProps = () => {
  return inject<Required<typeof options>>(key)!;
};
