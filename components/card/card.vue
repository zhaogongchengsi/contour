<script setup lang="ts">
import { key, options } from './props'
import cardIcon from './card-icon.vue'
import cardInner from './card-inner.vue'

const props = defineProps(options)

const background = computed(() => {
  return typeof props.background === 'string' ? props.background : `linear-gradient(${props.background?.direction}, ${props.background?.colors.join(', ')})`
})

const buttonClass = computed(() => {
  switch (props.buttonStyle) {
    case 'windows':
      return 'rounded-lg'
    case 'android':
      return 'rounded-2xl'
    case 'apple':
      return 'rounded-xl'
  }
})

const row = ref(1)
const col = ref(1)

watchEffect(() => {
  const [_row, _col] = props.size.split('-').map(Number)
  row.value = _row
  col.value = _col
})

const cardStyle = computed(() => {
  return {
    background: background.value,
  }
})

provide(key, props)
</script>

<template>
  <ui-card-size :row="row" :col="col" :style="cardStyle" :class="buttonClass"
    class="relative h-full w-full overflow-hidden">
    <card-inner :size="$props.size!">
      <template #icon>
        <card-icon :image="$props.icon?.image!" :background="$props.icon?.background" :class="buttonClass"
          :name="$props.icon?.name" />
      </template>
      <template #image>
        <slot name="image" />
      </template>
      <slot>
        {{ $props.icon?.label }}
      </slot>
    </card-inner>
  </ui-card-size>
</template>
