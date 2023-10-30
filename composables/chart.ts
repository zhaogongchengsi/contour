import { Chart } from "@antv/g2";
import type { Chart as IChart, ChartOptions } from "@antv/g2";
import { Renderer } from "@antv/g-webgl";
import theme from "~/assets/g2-theme.json";

export interface UseChartOption extends ChartOptions {}

export const useChart = (opt?: UseChartOption) => {
  const chart = ref<IChart>();

  chart.value = new Chart({
    autoFit: true,
    renderer: new Renderer(),
  });

  chart.value.theme(theme);

  const render = async <T extends HTMLElement>(t: T) => {
    chart.value?.render().then(() => {
      const container = chart.value?.getContainer();
      unref(t).appendChild(container!);
    });
  };

  return {
    chart,
    render,
  };
};
