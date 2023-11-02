<template>
  <div class="error-page mx-auto h-full w-full flex flex-col items-center justify-center gap-20 container">
    <svg class="animate-ping" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512">
      <path
        fill="#FF473E"
        d="M255.107 1.894C114.768 1.894 1.001 115.661 1.001 256s113.767 254.106 254.106 254.106S509.213 396.339 509.213 256S395.445 1.894 255.107 1.894zM124.924 386.183C90.151 351.41 71.001 305.176 71.001 256c0-37.761 11.303-73.78 32.289-104.214l256.03 256.031c-30.434 20.986-66.453 32.289-104.214 32.289c-49.176 0-95.409-19.151-130.182-53.923zm283.54-28.218L153.141 102.643c29.952-20.004 65.133-30.749 101.966-30.749c49.176 0 95.41 19.15 130.183 53.923c34.773 34.773 53.923 81.006 53.923 130.183c0 36.833-10.745 72.013-30.749 101.965z"
      />
    </svg>
    <span class="text-5 font-bold text-white md:text-10 sm:text-8">
      {{ $route.query.message }}
    </span>
  </div>
</template>

<style lang="scss">
.error-page {
	height: $dt('page.common.defaultMinHeight');
}
</style>
