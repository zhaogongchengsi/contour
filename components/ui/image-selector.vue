<script setup lang="ts">
import { useLoadingBar, useMessage } from "naive-ui";
import { uploadPicture } from "~/composables/upload";

const images = ref(
  ["github.webp", "grid_01.webp", "grid_10.webp", "grid.webp", "img2.webp"].map(
    (i) => `/images/${i}`,
  ),
);

const props = withDefaults(
  defineProps<{
    value: string;
    prefix?: string;
    separator?: string;
    action?: string;
    name?: string;
    // 禁用文件上传
    disabledUpload?: boolean;
  }>(),
  {
    prefix: "",
    separator: ":",
    action: "",
    name: "",
    disabledUpload: false,
  },
);

console.log(props.disabledUpload)

const m = 1024 * 1024;
const { error } = useMessage();
const loadingBar = useLoadingBar();
const emit = defineEmits(["update:value", "change"]);
const data = useVModel(props, "value", emit);
const { open, onChange } = useFileDialog({
  accept: "image/*",
  multiple: false,
});

const format = (value: string): string => {
  return [props.prefix, value].filter(Boolean).join(props.separator);
};

const itemClick = (value: string) => {
  data.value = format(value);
};

onChange(async (files) => {
  const file = files![0];
  if (file.size / m > 2.5) {
    error("上传图片最大不得大于2M");
    return;
  }

  loadingBar.start();

  uploadPicture(file, {
    name: props.name,
    url: props.action,
  })
    .then(([info]) => {
      images.value.push(info.url);
      loadingBar.finish();
    })
    .catch((err) => {
      error(err);
      loadingBar.error();
    });

  // const url = URL.createObjectURL(file)
  // images.value.push(url)
});
</script>

<template>
  <div class="flex flex-col gap-3 py-2">
    <div
      class="flex gap-2 justify-center items-center rounded-xl bg-gray-900 py-1 cursor-pointer"
      @click="open()"
      v-if="!disabledUpload"
    >
      <div class="md-icon i-carbon:cloud-upload" />
      <span>上传</span>
    </div>
    <ul class="grid grid-cols-3 gap-2 auto-rows-auto">
      <li
        v-for="url of images"
        class="h-24 p-2 hover:bg-gray-200/80 cursor-pointer rounded-md"
        :key="url"
        :class="{ 'bg-gray-200/80': data === format(url) }"
        @click="itemClick(url)"
      >
        <div class="h-full">
          <img
            class="w-full h-full object-cover rounded-md"
            :src="url"
            alt=""
          />
        </div>
      </li>
    </ul>
  </div>
</template>
