<script setup>
/**
 * @file HomeView.vue
 * @description Home (dashboard) view content. Rendered inside MainPanel by the
 * app shell when currentView is 'home'.
 */
</script>

<template>
  <section
    id="home-view"
    class="max-w-xl"
  >
    <span
      class="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300"
    >
      Dashboard
    </span>
    <h2 class="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
      Learn, guide, and grow with clarity.
    </h2>
    <p class="mt-4 max-w-lg text-base leading-7 text-slate-300">
      A focused home screen for future learning paths, student tools, and quick-access settings.
    </p>
  </section>
</template>
