<script setup lang="ts">
import { Chart } from "@antv/g2";
import type { Chart as IChart } from "@antv/g2";
import { Renderer } from "@antv/g-webgl";
import theme from "~/assets/g2-theme.json";

const lineDom = ref<HTMLDivElement | null>();

const chart = shallowRef<IChart>();

const init = async () => {
  const { width, height } = lineDom.value!.getBoundingClientRect();

  chart.value = new Chart({
    width,
    height,
    autoFit: true,
    container: lineDom.value!,
    renderer: new Renderer(),
    margin: 10,
  });

  chart.value.theme(theme);
};

const load = async () => {
  chart
    .value!.line()
    .data({
      type: "fetch",
      value: "/aapl.csv",
    })
    .encode("x", "date")
    .encode("y", "close");

  chart.value!.render();
};

onMounted(async () => {
  await init();
  await load();
});
</script>

<template>
  <div class="w-full h-full overflow-hidden" ref="lineDom"></div>
</template>
