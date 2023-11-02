import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { AvatarUri, CardConfig, ContactInfo } from "~/types";

const defineStorageKey = (key: string) => `contour-edit-${key}`;

export const useEditDataStore = defineStore("editData", () => {

  const name = useStorage<string>(defineStorageKey("name"), "");
  const background = useStorage(defineStorageKey("background"), "");
  const color = useStorage<string>(defineStorageKey("color"), "");
  const avatar = useStorage<AvatarUri>(defineStorageKey("avatar"), "emoji:😎");
  const styles = useStorage<string[]>(defineStorageKey("styles"), []);
  const description = useStorage<string>(defineStorageKey("description"), "");
  const contacts = useStorage<ContactInfo[]>(defineStorageKey("contact"), []);
  const cardCurredId = useStorage<number>(defineStorageKey("id"), 0);
  const cards = useStorage<CardConfig[]>(defineStorageKey("cards"), []);

  const getId = () => {
    return (cardCurredId.value = cardCurredId.value + 1);
  };

  return {
    name,
    background,
    color,
    avatar,
    styles,
    description,
    contacts,
    cards,
    cardCurredId,
    getId,
  };
});
