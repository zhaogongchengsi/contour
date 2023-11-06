<script lang="ts" setup>
import {
  NInput,
  NDynamicInput,
  NInputGroup,
  NSelect,
  NCheckbox,
  NCheckboxGroup,
  NColorPicker,
  NGi,
  NGrid,
  NScrollbar,
  NTabPane,
  NTabs,
} from "naive-ui";
import type { SelectOption } from "naive-ui";
import { VNodeChild, h } from "vue";
import icons from "~/assets/icons.json";
import type { ContactInfo, IconInfo } from "~/types";

const material = useMaterial();

const config = ref([]);
const props = defineProps<{
  desc: string;
  contacts: ContactInfo[];
  color: string;
  style: string;
  background: string;
}>();

const emit = defineEmits([
  "addCard",
  "update:desc",
  "update:contacts",
  "update:color",
  "update:style",
  "update:background",
]);
const { desc, contacts, color, style, background } = useVModels(props, emit);

watchEffect(() => {
  style.value = config.value.join("-");
});

const selectOptions = ref([
  {
    label: "i-uiw:qq",
    value: "qq",
  },
  {
    label: "i-uiw:mail",
    value: "mail",
  },
  {
    label: "i-uiw:android",
    value: "phone",
  },
]);

const renderLabel = (option: SelectOption): VNodeChild => {
  return h("div", { class: ["sm-icon", option.label] });
};

const addCard = (icon: IconInfo) => {
  emit("addCard", icon);
};

const createContact = () => {
  return {
    value: "",
    type: "phone",
  };
};
</script>

<template>
  <div class="w-full flex flex-col gap-3 px-3 pb-2 text-gray-400">
    <ui-label>描述</ui-label>
    <n-input size="small" v-model:value="desc" placeholder="请输入描述" />
    <ui-label>联系方式</ui-label>
    <n-dynamic-input v-model:value="contacts" :on-create="createContact">
      <template #create-button-default>随便加点联系方式</template>
      <template #default="{ value }">
        <div class="w-full flex items-center gap-3">
          <n-input-group>
            <n-select
              size="tiny"
              class="w-30"
              v-model:value="value.type"
              :options="selectOptions"
              :render-label="renderLabel"
            />
            <n-input size="tiny" v-model:value="value.value" type="text" />
          </n-input-group>
        </div>
      </template>
      <template #action="{ index, create, remove }">
        <div class="flex items-center gap-3 ml-3">
          <div class="sm-icon cursor-pointer opacity-80 hover:opacity-100 i-uiw:plus" @click="() => create(index)" />
          <div class="sm-icon cursor-pointer opacity-80 hover:opacity-100 i-uiw:minus" @click="() => remove(index)" />
        </div>
      </template>
    </n-dynamic-input>
    <ui-label>文本颜色</ui-label>
    <NColorPicker v-model:value="color" />
    <ui-label>设置</ui-label>
    <NCheckboxGroup v-model:value="config">
      <NGrid :y-gap="8" :cols="2">
        <NGi><NCheckbox size="medium" label="磨砂" value="frosted" /></NGi>
        <NGi><NCheckbox size="medium" label="模糊" value="blur" /></NGi>
        <NGi><NCheckbox size="medium" label="居中" value="center" /></NGi>
        <NGi><NCheckbox size="medium" label="斜体" value="ltalic" /></NGi>
      </NGrid>
    </NCheckboxGroup>
    <ui-label>背景</ui-label>
    <NTabs type="segment" animated size="small">
      <NTabPane name="color" tab="纯颜色">
        <NScrollbar class="h-50 max-h-80">
          <div class="grid grid-cols-4 w-full gap-3">
            <ui-bg-card
              v-for="item of material.colors"
              :key="item"
              :active="background === item"
              @click="background = item"
            >
              <div class="h-full w-full" :style="{ background: item }" />
            </ui-bg-card>
          </div>
        </NScrollbar>
      </NTabPane>
      <NTabPane name="gradientColor" tab="渐变色">
        <NScrollbar class="h-50 max-h-80">
          <div class="grid grid-cols-4 w-full gap-3">
            <ui-bg-card
              v-for="(item, index) of material.generateColor"
              :key="index"
              :active="background === material.generateColorStyle(item)"
              @click="background = material.generateColorStyle(item)"
            >
              <div class="h-full w-full" :style="{ background: material.generateColorStyle(item) }" />
            </ui-bg-card>
          </div>
        </NScrollbar>
      </NTabPane>
      <NTabPane name="image" tab="图片">
        <NScrollbar class="max-h-80 min-h-50 px-3">
          <div class="grid grid-cols-3 w-full gap-3">
            <ui-bg-card
              v-for="item of material.images"
              :key="item"
              :active="background === item"
              @click="background = `url(${item})`"
            >
              <img class="h-full w-full object-contain" :src="item" />
            </ui-bg-card>
          </div>
        </NScrollbar>
      </NTabPane>
    </NTabs>
    <ui-label>小组件</ui-label>
    <div class="grid grid-cols-5 gap-3">
      <div
        v-for="icon of icons as IconInfo[]"
        @click="addCard(icon)"
        :key="icon.name"
        class="h-full flex flex-col items-center cursor-pointer"
      >
        <div
          :style="{ background: icon.background || 'transparent' }"
          class="flex-col rounded-md py-1 w-full flex items-center justify-center"
        >
          <img :src="icon.image" class="object-contain" :alt="icon.name" />
        </div>
        <span class="text-3">{{ icon.label }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.app-file-upload .n-upload-file-list {
  --image-size: 52px;
  grid-template-columns: repeat(auto-fill, var(--image-size));
}

.app-file-upload .n-upload-file-list .n-upload-file {
  width: var(--image-size);
  height: var(--image-size);
}

.app-file-upload .n-upload-trigger {
  width: var(--image-size);
  height: var(--image-size);
}
</style>
