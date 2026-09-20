<script setup>
/**
 * @file C99View.vue
 * @description C99 learning panel with left-centered section navigation.
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
    class="relative flex min-h-[720px] flex-1 flex-col rounded-2xl border border-cyan-200/40 bg-[linear-gradient(135deg,#991b1b,#ea580c,#facc15,#16a34a,#2563eb,#4f46e5,#8b5cf6)] p-4 shadow-2xl shadow-cyan-950/40"
  >
    <div
      id="c99-view-header"
      class="absolute left-4 top-4 z-10"
    >
      <button
        type="button"
        class="rounded-lg border border-slate-600 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200 transition hover:border-cyan-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
        @click="closePanel"
      >
        Close
      </button>
    </div>

    <div id="c99-view-layout" class="flex min-h-0 flex-1 gap-4 pt-10">
      <nav id="c99-navigation" class="flex w-40 flex-col justify-center gap-3">
        <button
          v-for="item in menuItems"
          :key="item.id"
          type="button"
          :class="[
            'flex w-full items-center justify-start rounded-xl border px-3 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400/70',
            props.currentPage === item.id
              ? 'border-cyan-400/80 bg-cyan-500/10 text-cyan-100 shadow-lg shadow-cyan-950/30'
              : 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-cyan-400/60 hover:bg-slate-800',
          ]"
          @click="choosePage(item.id)"
        >
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div
        id="c99-page-panel"
        class="min-h-0 flex-1 rounded-xl border border-slate-700 bg-slate-900/60 p-4"
      >
        <component :is="pageComponents[props.currentPage]" />
      </div>
    </div>
  </aside>
</template>
