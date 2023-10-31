enum VisibilityState {
  visible = "visible",
  hidden = "hidden",
}

export function useMonitor() {
  if (import.meta.server) return;

  const route = useRoute();
  const name = route.params.name as string;

  // 页面打开 添加访问次数
  navigator.sendBeacon(`/api/report?name=${name}&type=number&time=1`);
  let startTime = Date.now();

  const sendDurationBeacon = () => {
    var endTime = Date.now();
    var duration = Math.round((endTime - startTime) / 1000);
    navigator.sendBeacon(`/api/report?name=${name}&type=duration&time=${duration}`);
  };

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

  window.addEventListener("beforeunload", (event) => {
    sendDurationBeacon();
  });

  // 打印事件
  window.addEventListener("afterprint", (event) => {});
}
