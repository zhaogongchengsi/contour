<script setup lang="ts">
import { NPopover, NTabs, NTabPane, NScrollbar, NLoadingBarProvider } from "naive-ui";

const loadingBarTargetRef = ref<undefined | HTMLElement>(undefined);
const value = ref("");
const props = withDefaults(
  defineProps<{
    value?: string;
    separator?: string;
    action?: string;
    name?: string;
    defaultValue?: string;
  }>(),
  {
    separator: ":",
    action: "/api/file/upload",
    name: "",
    defaultValue: "/images/grid.webp",
  },
);

const emit = defineEmits(["update:value", "change"]);
const data = useVModel(props, "value", emit);

value.value = props.defaultValue;

watch(value, (newValue) => {
  data.value = newValue;
  emit("change", newValue);
});

provide("ui-picture-selector-value", value);
provide("ui-picture-selector-separator", props.separator);
</script>

<template>
  <n-popover trigger="click">
    <template #trigger>
      <slot />
    </template>
    <n-loading-bar-provider :to="loadingBarTargetRef" container-style="position: absolute;">
      <div class="w-110 p-2 picture-selector-container" ref="loadingBarTargetRef">
        <n-tabs type="bar" animated placement="bottom" size="small">
          <n-tab-pane name="image" tab="图片" display-directive="show">
            <n-scrollbar class="h-80">
              <ui-image-selector prefix="url" :name="$props.name" :action="$props.action" v-model:value="value" />
            </n-scrollbar>
          </n-tab-pane>
          <n-tab-pane name="emoji" tab="表情" display-directive="show">
            <n-scrollbar class="h-80">
              <ui-emoji-selector prefix="emoji" v-model:value="value" />
            </n-scrollbar>
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-loading-bar-provider>
  </n-popover>
</template>

<style lang="scss">
.picture-selector-container {
  border: 1px solid $dt('border.primary');
  border-radius: 8px;
}
</style>
