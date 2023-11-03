export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.name, from.name);
});
