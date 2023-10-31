import { ReportAction } from "~/composables/constants";

enum VisibilityState {
  visible = "visible",
  hidden = "hidden",
}

export function useMonitor() {
  if (import.meta.server) return;

  const route = useRoute();
  const name = route.params.name as string;
  let startTime = Date.now();

  // 页面打开 添加访问次数
  navigator.sendBeacon(`/api/report?name=${name}&action=${ReportAction.number}`);

  const sendDurationBeacon = () => {
    var endTime = Date.now();
    var duration = Math.round((endTime - startTime) / 1000);
    navigator.sendBeacon(`/api/report?name=${name}&action=${ReportAction.duration}&time=${duration}`);
  };

  // 页面切换tab
  window.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === VisibilityState.hidden) {
        sendDurationBeacon();
      } else {
        startTime = Date.now();
      }
    },
    false
  );

  // 页面关闭
  window.addEventListener(
    "beforeunload",
    () => {
      sendDurationBeacon();
    },
    false
  );

  // 打印事件
  window.addEventListener(
    "afterprint",
    () => {
      navigator.sendBeacon(`/api/report?name=${name}&action=${ReportAction.print}`);
    },
    false
  );
}
