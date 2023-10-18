<script setup lang="ts">
import { NCheckbox, NCheckboxGroup, NGi, NGrid, NScrollbar, NTabPane, NTabs, NTooltip, NColorPicker } from 'naive-ui'

const store = useEditDataStore()
const material = useMaterial()

const save = () => {
  store.save()
}

</script>

<template>
  <ui-affix-modal direction="right">
    <template #header>
      <div class="flex items-center justify-between px-3 py-2">
        <h3 class="text-4 font-bold">
          样式
        </h3>
        <div class="flex gap-5 items-center">
          <NTooltip trigger="hover">
            <template #trigger>
              <button class="w-5 h-5 i-carbon:export hover:text-purple-500" @click="save" />
            </template>
            保存并发布
          </NTooltip>
          <RouterLink :to="`/preview/${store.name}`" class="flex items-center">
            <NTooltip trigger="hover">
              <template #trigger>
                <button class="w-5 h-5 i-carbon:view hover:text-purple-500" />
              </template>
              预览
            </NTooltip>
          </RouterLink>
        </div>
      </div>
    </template>
    <div class="flex flex-1 flex-col gap-3">
      <h4 class="px-3 text-4 font-bold text-gray-400">
        背景颜色
      </h4>
      <div class="px-3">
        <NTabs type="segment" animated size="small">
          <NTabPane name="color" tab="纯颜色">
            <NScrollbar class="h-50 max-h-80">
              <div class="grid grid-cols-4 w-full gap-3">
                <ui-bg-card v-for="item of material.colors" :key="item" :active="store.background === item"
                  @click="store.setBackground(item)">
                  <div class="w-full h-full" :style="{ background: item }" />
                </ui-bg-card>
              </div>
            </NScrollbar>
          </NTabPane>
          <NTabPane name="gradientColor" tab="渐变色">
            <NScrollbar class="h-50 max-h-80">
              <div class="grid grid-cols-4 w-full gap-3">
                <ui-bg-card v-for="(item, index) of material.generateColor" :key="index"
                  :active="store.background === material.generateColorStyle(item)"
                  @click="store.setBackground(material.generateColorStyle(item))">
                  <div class="w-full h-full" :style="{ background: material.generateColorStyle(item) }" />
                </ui-bg-card>
              </div>
            </NScrollbar>
          </NTabPane>
          <NTabPane name="image" tab="图片">
            <NScrollbar class="max-h-80 min-h-50 px-3">
              <div class="grid grid-cols-3 w-full gap-3">
                <ui-bg-card v-for="item of material.images" :key="item" :active="store.background === item"
                  @click="store.setBackground(`url(${item})`)">
                  <img class="w-full h-full object-contain" :src="item" />
                </ui-bg-card>
              </div>
            </NScrollbar>
          </NTabPane>
        </NTabs>
      </div>
      <h4 class="px-3 text-4 font-bold text-gray-400">
        文本颜色
      </h4>
      <div class="px-3">
        <n-color-picker v-model:value="store.color" />
      </div>
      <h4 class="px-3 text-4 font-bold text-gray-400">
        设置
      </h4>
      <NCheckboxGroup v-model:value="store.styles" class="px-3" @update-value="store.setStyles">
        <NGrid :y-gap="8" :cols="2">
          <NGi>
            <NCheckbox size="medium" label="磨砂" value="frosted" />
          </NGi>
          <NGi>
            <NCheckbox size="medium" label="模糊" value="blur" />
          </NGi>
          <NGi>
            <NCheckbox size="medium" label="居中" value="center" />
          </NGi>
          <NGi>
            <NCheckbox size="medium" label="斜体" value="ltalic" />
          </NGi>
        </NGrid>
      </NCheckboxGroup>
    </div>
  </ui-affix-modal>
</template>
