<script setup>
/**
 * @file AdultView.vue
 * @description Adult portal view content. Composes AdultMenu with the learning
 * dashboard panel and opens the C99 side-panel when selected.
 */

import { ref } from "vue";
import AdultMenu from "../components/AdultMenu.vue";
import c99View from "./C99View.vue";

const emit = defineEmits(["back"]);

/** Adult sub-menu items rendered by AdultMenu. */
const adultSubMenuItems = [
  {
    id: "overview",
    label: "Overview",
    accent: "from-violet-500/20 to-indigo-500/10",
    badge: "Primary",
  },
  {
    id: "programs",
    label: "Programs",
    accent: "from-cyan-500/20 to-emerald-500/10",
    badge: "Next",
  },
  {
    id: "reports",
    label: "Global Reports",
    accent: "from-fuchsia-500/20 to-violet-500/10",
    badge: "Queued",
  },
  {
    id: "support",
    label: "Support",
    accent: "from-amber-500/20 to-orange-500/10",
    badge: "Info",
  },
  {
    id: "c99",
    label: "C99",
    accent: "from-sky-500/20 to-cyan-500/10",
    badge: "New",
  },
];

const isC99ViewOpen = ref(false);
const currentC99Page = ref("lessons");

/** Ask the app shell to return to the home view. */
function goBack() {
  emit("back");
}

/**
 * Handle menu selection events from the Adult sub-menu.
 * @param {string} itemId - Selected menu item ID.
 */
function handleMenuSelection(itemId) {
  if (itemId === "c99") {
    isC99ViewOpen.value = !isC99ViewOpen.value;
    return;
  }

  if (itemId === "reports") {
    isC99ViewOpen.value = false;
  }
}

/**
 * Switch the active placeholder page inside the C99 panel.
 * @param {string} pageId - Target placeholder page.
 */
function selectC99Page(pageId) {
  currentC99Page.value = pageId;
  isC99ViewOpen.value = true;
}
</script>

<template>
  <section
    id="adult-view"
    class="relative rounded-2xl border border-violet-500/20 bg-slate-900/40 p-5 sm:p-6"
  >
    <button
      type="button"
      @click="goBack"
      class="absolute right-5 top-5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-100 shadow-lg shadow-violet-950/40 transition hover:border-violet-400 hover:bg-violet-500/15 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
    >
      Back
    </button>

    <div
      id="adult-view-layout"
      class="flex min-h-[620px] flex-col gap-6 pt-14 lg:flex-row"
    >
      <AdultMenu :items="adultSubMenuItems" @select="handleMenuSelection" />

      <div
        id="learning-dashboard"
        class="flex-1 rounded-2xl border border-slate-700/80 bg-slate-900/40 p-5"
      >
        <div
          id="dashboard-header"
          class="flex items-center justify-between gap-4 border-b border-slate-700 pb-4"
        >
          <div id="dashboard-heading">
            <p class="text-xs uppercase tracking-[0.2em] text-cyan-300">
              Adult portal
            </p>
            <h3 class="mt-2 text-3xl font-bold text-white">
              Learning dashboard
            </h3>
          </div>
          <span
            class="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300"
          >
            Active
          </span>
        </div>

        <div
          id="dashboard-metrics"
          class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          <div
            id="sessions-metric"
            class="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 p-4"
          >
            <p class="text-sm text-violet-200">Sessions</p>
            <p class="mt-3 text-3xl font-bold text-white">24</p>
          </div>
          <div
            id="progress-metric"
            class="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 p-4"
          >
            <p class="text-sm text-cyan-200">Progress</p>
            <p class="mt-3 text-3xl font-bold text-white">86%</p>
          </div>
          <div
            id="next-review-metric"
            class="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-4 md:col-span-2 xl:col-span-1"
          >
            <p class="text-sm text-amber-200">Next review</p>
            <p class="mt-3 text-2xl font-bold text-white">Friday</p>
          </div>
        </div>
      </div>
    </div>

    <c99View
      v-if="isC99ViewOpen"
      :current-page="currentC99Page"
      @close="isC99ViewOpen = false"
      @select-page="selectC99Page"
    />
  </section>
</template>
