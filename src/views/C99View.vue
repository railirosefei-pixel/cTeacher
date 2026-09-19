<script setup>
/**
 * @file C99View.vue
 * @description Floating C99 portal panel with left-aligned placeholder navigation.
 */

import C99LessonsView from "./C99LessonsView.vue";
import C99ProgressView from "./C99ProgressView.vue";
import C99ReportsView from "./C99ReportsView.vue";
import C99GamesView from "./C99GamesView.vue";

const props = defineProps({
  currentPage: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "selectPage"]);

const menuItems = [
  { id: "lessons", label: "Lessons" },
  { id: "progress", label: "Progress" },
  { id: "reports", label: "Reports" },
  { id: "games", label: "Games" },
];

const pageComponents = {
  lessons: C99LessonsView,
  progress: C99ProgressView,
  reports: C99ReportsView,
  games: C99GamesView,
};

/**
 * Close the C99 panel.
 */
function closePanel() {
  emit("close");
}

/**
 * Switch to a placeholder page.
 * @param {string} pageId - Active placeholder page ID.
 */
function choosePage(pageId) {
  emit("selectPage", pageId);
}
</script>

<template>
  <aside
    id="c99-view"
    class="absolute inset-y-5 left-5 z-20 w-[420px] rounded-2xl border border-cyan-500/30 bg-slate-950/95 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-sm"
  >
    <div
      id="c99-view-header"
      class="mb-5 flex items-center justify-between border-b border-slate-700 pb-4"
    >
      <div>
        <p
          class="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300"
        >
          C99
        </p>
        <h4 class="mt-2 text-xl font-bold text-white">Learning hub</h4>
      </div>
      <button
        type="button"
        @click="closePanel"
        class="rounded-lg border border-slate-600 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
      >
        Close
      </button>
    </div>

    <div id="c99-view-layout" class="flex gap-4">
      <nav id="c99-navigation" class="w-40 space-y-3">
        <button
          v-for="item in menuItems"
          :key="item.id"
          type="button"
          @click="choosePage(item.id)"
          :class="[
            'flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400/70',
            props.currentPage === item.id
              ? 'border-cyan-400/80 bg-cyan-500/10 text-cyan-100 shadow-lg shadow-cyan-950/30'
              : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-cyan-400/60 hover:bg-slate-800',
          ]"
        >
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div
        id="c99-page-panel"
        class="flex-1 rounded-xl border border-slate-700 bg-slate-900/60 p-4"
      >
        <component :is="pageComponents[props.currentPage]" />
      </div>
    </div>
  </aside>
</template>
