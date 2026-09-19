<script setup>
/**
 * @file App.vue
 * @description Single app shell. Owns the global layout wrapper, page/view state,
 * top-level navigation logic, and page switching. All layout decisions live here;
 * child components only render what they are given.
 */

import { computed, ref } from "vue";
import SidebarNav from "./components/SidebarNav.vue";
import MainPanel from "./components/MainPanel.vue";
import HomeView from "./views/HomeView.vue";
import AdultView from "./views/AdultView.vue";

/** @typedef {'home' | 'adult' | 'child' | 'settings'} ViewId */

/** @type {Record<ViewId, { component?: object, title?: string, message?: string }>} */
const viewRegistry = Object.freeze({
  home: { component: HomeView },
  adult: { component: AdultView },
  child: {
    title: "Child",
    message: "Child tools are not available yet.",
  },
  settings: {
    title: "Settings",
    message: "Settings are not available yet.",
  },
});

/** @type {import('vue').Ref<ViewId>} Current active view. */
const currentView = ref("home");

/** Top-level navigation items rendered by SidebarNav. */
const navItems = [
  { id: "adult", label: "Adult", accent: "from-violet-500 to-indigo-600" },
  { id: "child", label: "Child", accent: "from-cyan-500 to-emerald-500" },
  { id: "settings", label: "Settings", accent: "from-rose-500 to-orange-500" },
];

const activeView = computed(() => viewRegistry[currentView.value]);

/**
 * Switch the active view.
 * @param {ViewId} view - Target view name.
 */
function setView(view) {
  if (viewRegistry[view]) {
    currentView.value = view;
  }
}

/**
 * Handle a top-level navigation selection from SidebarNav.
 * @param {ViewId} view - The stable view ID that was selected.
 */
function onNavigate(view) {
  setView(view);
}

/** Return to the home view. */
function goHome() {
  setView("home");
}
</script>

<template>
  <div id="app-shell" class="min-h-screen bg-slate-950 text-slate-100">
    <div
      id="app-frame"
      class="flex min-h-screen w-full items-start justify-start px-4 py-6 sm:px-5 lg:px-6"
    >
      <div id="app-layout" class="flex w-full items-start gap-6">
        <SidebarNav
          :nav-items="navItems"
          :active-item="currentView"
          @navigate="onNavigate"
        />

        <MainPanel>
          <component
            :is="activeView.component"
            v-if="activeView.component"
            @back="goHome"
          />
          <section id="unavailable-view" v-else class="max-w-xl">
            <span
              class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"
              >Coming soon</span
            >
            <h2 class="mt-4 text-3xl font-bold text-white">
              {{ activeView.title }}
            </h2>
            <p class="mt-3 text-base leading-7 text-slate-300">
              {{ activeView.message }}
            </p>
          </section>
        </MainPanel>
      </div>
    </div>
  </div>
</template>
