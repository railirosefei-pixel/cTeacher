<script setup>
/**
 * @file MainPanel.vue
 * @description Shared content panel wrapper for the app shell. Provides the
 * consistent panel chrome; the active view is injected through the default slot.
 */
</script>

<template>
  <main
    id="content-panel"
    class="flex-1 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 p-6 shadow-2xl shadow-indigo-950/30 sm:p-8 lg:p-10"
  >
    <slot></slot>
  </main>
</template>
