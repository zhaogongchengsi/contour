<script setup lang="ts">
import { NCheckbox, NCheckboxGroup, NGi, NGrid, NRadioButton, NRadioGroup, NScrollbar, NTabPane, NTabs, NTooltip } from 'naive-ui'

const store = useEditDataStore()
</script>

<template>
  <ui-affix-modal direction="right">
    <template #header>
      <div class="flex items-center justify-between px-3 py-2">
        <h3 class="text-4 font-bold">
          样式
        </h3>
        <RouterLink :to="`/preview/${store.name}`" class="flex items-center">
          <NTooltip trigger="hover">
            <template #trigger>
              <button class="md-icon i-carbon:view" />
            </template>
            预览
          </NTooltip>
        </RouterLink>
      </div>
    </template>
    <div class="flex flex-1 flex-col gap-3">
      <h4 class="px-3 text-4 font-bold text-gray-400">
        按钮风格
      </h4>
      <NRadioGroup class="w-full justify-center px-3">
        <NRadioButton label="Apple" />
        <NRadioButton label="Android" />
        <NRadioButton label="Windows" />
      </NRadioGroup>
      <h4 class="px-3 text-4 font-bold text-gray-400">
        背景颜色
      </h4>
      <div class="px-3">
        <NTabs type="segment" animated size="small">
          <NTabPane name="color" tab="纯颜色">
            <NScrollbar class="h-50 max-h-80">
              <div class="grid grid-cols-4 w-full gap-3">
                <ui-bg-card
                  v-for="item of swatches" :key="item"
                  :active="store.background === item" :value="item" @click="store.setBackground(item)"
                />
              </div>
            </NScrollbar>
          </NTabPane>
          <NTabPane name="gradientColor" tab="渐变色">
            <NScrollbar class="h-50 max-h-80">
              <div class="grid grid-cols-4 w-full gap-3">
                <ui-bg-card
                  v-for="item of generateColor" :key="item"
                  :active="store.background === item" :value="item" @click="store.setBackground(item)"
                />
              </div>
            </NScrollbar>
          </NTabPane>
          <NTabPane name="image" tab="图片">
            <NScrollbar class="max-h-80 min-h-50 px-3">
              <div class="grid grid-cols-3 w-full gap-3">
                <ui-bg-card
                  v-for="item of images" :key="item"
                  :active="store.background === item" :value="`${item}/ 100% 100%`" @click="store.setBackground(item)"
                />
              </div>
            </NScrollbar>
          </NTabPane>
        </NTabs>
      </div>
      <h4 class="px-3 text-4 font-bold text-gray-400">
        设置
      </h4>
      <NCheckboxGroup v-model:value="store.styles" class="px-3" @update-value="store.setStyles">
        <NGrid :y-gap="8" :cols="2">
          <NGi><NCheckbox size="medium" label="磨砂" value="frosted" /></NGi>
          <NGi><NCheckbox size="medium" label="模糊" value="blur" /></NGi>
          <NGi><NCheckbox size="medium" label="居中" value="center" /></NGi>
          <NGi><NCheckbox size="medium" label="斜体" value="ltalic" /></NGi>
        </NGrid>
      </NCheckboxGroup>
    </div>
  </ui-affix-modal>
</template>
