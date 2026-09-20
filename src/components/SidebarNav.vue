<script setup>
/**
 * @file SidebarNav.vue
 * @description Left-rail navigation for the app shell. Purely presentational:
 * receives nav items and emits a navigate event with the selected view ID.
 */

/**
 * Component props.
 * @typedef {Object} NavItem
 * @property {string} id - Stable view ID used for navigation.
 * @property {string} label - Display label and navigation key.
 * @property {string} accent - Tailwind gradient accent classes (fixed class names).
 */
defineProps({
  navItems: {
    type: Array,
    required: true,
    validator: (navItems) =>
      navItems.every(
        (navItem) =>
          navItem &&
          typeof navItem.id === "string" &&
          typeof navItem.label === "string" &&
          typeof navItem.accent === "string"
      ),
  },
  activeItem: {
    type: String,
    default: "home",
  },
});

const emit = defineEmits(["navigate"]);

const navGlowClasses = {
  adult:
    "opacity-100 bg-gradient-to-r from-violet-500/35 via-indigo-500/30 to-cyan-400/35 shadow-[0_0_0_1px_rgba(167,139,250,0.7),0_0_22px_rgba(168,85,247,0.7),0_0_40px_rgba(59,130,246,0.7)]",
  child:
    "opacity-100 bg-gradient-to-r from-teal-500/35 via-emerald-500/30 to-cyan-400/35 shadow-[0_0_0_1px_rgba(45,212,191,0.7),0_0_22px_rgba(20,184,166,0.7),0_0_40px_rgba(16,185,129,0.7)]",
  settings:
    "opacity-100 bg-gradient-to-r from-orange-500/35 via-rose-500/30 to-red-500/35 shadow-[0_0_0_1px_rgba(251,146,60,0.7),0_0_22px_rgba(251,146,60,0.7),0_0_40px_rgba(239,68,68,0.7)]",
};

/**
 * Forward a nav selection to the app shell.
 * @param {string} viewId - Selected nav item ID.
 */
function select(viewId) {
  emit("navigate", viewId);
}
</script>

<template>
  <aside
    id="primary-sidebar"
    class="w-full max-w-xs rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-slate-950/60 backdrop-blur-sm sm:p-5"
  >
    <div id="sidebar-brand" class="mb-8 flex items-center gap-3 border-b border-slate-800 pb-5">
      <div
        id="brand-mark"
        class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 text-lg font-bold text-white shadow-lg shadow-violet-500/30"
      >
        C
      </div>
      <div id="brand-copy">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Portal</p>
        <h1 class="text-xl font-semibold text-white">cTeacher</h1>
      </div>
    </div>

    <nav id="primary-navigation" class="flex flex-col gap-3">
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        :class="[
          'group relative overflow-hidden rounded-2xl border px-4 py-4 text-left shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400/70',
          item.id === activeItem
            ? 'border-slate-500/80 bg-slate-800/95'
            : 'border-slate-700 bg-slate-800/90',
          item.id === activeItem ? navGlowClasses[item.id] : '',
        ]"
        @click="select(item.id)"
      >
        <span class="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b" :class="item.accent" />
        <span class="relative flex items-center justify-between pl-3">
          <span class="text-base font-semibold text-slate-100">{{ item.label }}</span>
          <span
            class="rounded-full border border-slate-600 bg-slate-900/80 px-2 py-1 text-xs font-medium text-slate-300 transition-colors group-hover:border-slate-400 group-hover:text-white"
          >
            Menu
          </span>
        </span>
      </button>
    </nav>
  </aside>
</template>
