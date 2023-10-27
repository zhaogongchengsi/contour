<script setup lang="ts">
import { NCheckbox, NCheckboxGroup, NColorPicker, NGi, NGrid, NScrollbar, NTabPane, NTabs, NTooltip, useMessage } from 'naive-ui'

const { warning } = useMessage()
const store = useEditDataStore()
const material = useMaterial()
const useState = useUserInfo()
const router = useRouter()

onMounted(() => {
  if (import.meta.browser && !useState.logged()) {
    warning('未登录，建议登录后再编辑', {
      closable: true,
      duration: 5000,
    })
  }
})

function save() {
  if (!useState.logged()) {
    warning('未登录，请先登录')
    router.push('/auth/login')
    return
  }

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
        <div class="flex items-center gap-5">
          <NTooltip v-if="!useState.logged()">
            <template #trigger>
              <router-link to="/auth/login">
                <i class="i-carbon:login block h-5 w-5 hover:text-purple-500" />
              </router-link>
            </template>
            登录
          </NTooltip>
          <NTooltip trigger="hover">
            <template #trigger>
              <button class="i-carbon:export h-5 w-5 hover:text-purple-500" @click="save" />
            </template>
            保存并发布
          </NTooltip>
          <NTooltip trigger="hover">
            <template #trigger>
              <router-link :to="`/preview/${store.name}`" class="flex items-center">
                <i class="i-carbon:view block h-5 w-5 hover:text-purple-500" />
              </router-link>
            </template>
            预览
          </NTooltip>
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
                <ui-bg-card
                  v-for="item of material.colors" :key="item" :active="store.background === item"
                  @click="store.setBackground(item)"
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
                  v-for="(item, index) of material.generateColor" :key="index"
                  :active="store.background === material.generateColorStyle(item)"
                  @click="store.setBackground(material.generateColorStyle(item))"
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
                  v-for="item of material.images" :key="item" :active="store.background === item"
                  @click="store.setBackground(`url(${item})`)"
                >
                  <img class="h-full w-full object-contain" :src="item">
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
        <NColorPicker v-model:value="store.color" />
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
