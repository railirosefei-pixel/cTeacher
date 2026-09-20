<script setup>
/**
 * @file AdultMenu.vue
 * @description Sub-menu for the Adult view. Renders the provided menu items and
 * emits a select event when a menu button is pressed.
 */
/**
 * @typedef {Object} AdultMenuItem
 * @property {string} id - Stable item ID used as the Vue key.
 * @property {string} label - Display label and item key.
 * @property {string} accent - Tailwind gradient accent classes.
 * @property {string} badge - Short status label shown beside the item.
 */
const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) =>
      items.every(
        (menuItem) =>
          menuItem &&
          typeof menuItem.id === "string" &&
          typeof menuItem.label === "string" &&
          typeof menuItem.accent === "string" &&
          typeof menuItem.badge === "string"
      ),
  },
  activeItem: {
    type: String,
    default: "curriculum",
  },
});

const emit = defineEmits(["select"]);

const adultNavigationDotGlowClasses = {
  curriculumDotGlow:
    "shadow-[0_0_0_2px_rgba(94,234,212,0.95),0_0_18px_rgba(34,211,238,1),0_0_36px_rgba(52,211,153,1),0_0_52px_rgba(16,185,129,1),0_0_80px_rgba(5,150,105,0.95)]",
  reportsDotGlow:
    "shadow-[0_0_0_2px_rgba(232,121,249,0.95),0_0_18px_rgba(232,121,249,1),0_0_36px_rgba(192,132,252,1),0_0_52px_rgba(168,85,247,1),0_0_80px_rgba(147,51,234,0.95)]",
  supportDotGlow:
    "shadow-[0_0_0_2px_rgba(252,211,77,0.95),0_0_18px_rgba(251,191,36,1),0_0_36px_rgba(251,146,60,1),0_0_52px_rgba(249,115,22,1),0_0_80px_rgba(234,88,12,0.95)]",
  scheduleDotGlow:
    "shadow-[0_0_0_2px_rgba(22,101,52,0.98),0_0_18px_rgba(21,128,61,1),0_0_36px_rgba(16,185,129,1),0_0_52px_rgba(6,95,70,1),0_0_80px_rgba(5,150,105,0.95)]",
};

const adultNavigationDotGlowMap = {
  curriculum: "curriculumDotGlow",
  reports: "reportsDotGlow",
  support: "supportDotGlow",
  schedule: "scheduleDotGlow",
};

const adultNavigationButtonGlowClasses = {
  curriculumButtonGlow:
    "shadow-[0_0_0_1px_rgba(94,234,212,0.9),0_0_14px_rgba(34,211,238,1),0_0_26px_rgba(52,211,153,1),0_0_44px_rgba(16,185,129,1),0_0_70px_rgba(5,150,105,0.95)] border-emerald-300/90 bg-slate-800/95",
  reportsButtonGlow:
    "shadow-[0_0_0_1px_rgba(232,121,249,0.9),0_0_14px_rgba(232,121,249,1),0_0_26px_rgba(192,132,252,1),0_0_44px_rgba(168,85,247,1),0_0_70px_rgba(147,51,234,0.95)] border-fuchsia-300/90 bg-slate-800/95",
  supportButtonGlow:
    "shadow-[0_0_0_1px_rgba(252,211,77,0.9),0_0_14px_rgba(251,191,36,1),0_0_26px_rgba(251,146,60,1),0_0_44px_rgba(249,115,22,1),0_0_70px_rgba(234,88,12,0.95)] border-amber-300/90 bg-slate-800/95",
  scheduleButtonGlow:
    "shadow-[0_0_0_1px_rgba(22,101,52,0.9),0_0_14px_rgba(21,128,61,1),0_0_26px_rgba(16,185,129,1),0_0_44px_rgba(6,95,70,1),0_0_70px_rgba(5,150,105,0.95)] border-green-400/90 bg-slate-800/95",
};

const adultNavigationButtonGlowMap = {
  curriculum: "curriculumButtonGlow",
  reports: "reportsButtonGlow",
  support: "supportButtonGlow",
  schedule: "scheduleButtonGlow",
};

/**
 * Forward a selected menu item to the parent.
 * @param {string} itemId - The menu item ID that was clicked.
 */
function selectItem(itemId) {
  emit("select", itemId);
}
</script>

<template>
  <aside
    id="adult-navigation"
    class="w-full rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 lg:max-w-xs"
  >
    <div id="adult-navigation-header" class="mb-5 border-b border-slate-700 pb-4">
      <p class="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Menu</p>
      <h2 class="mt-2 text-2xl font-bold text-white">Adult</h2>
    </div>

    <div id="adult-navigation-items" class="space-y-3">
      <button
        v-for="item in props.items"
        :key="item.id"
        type="button"
        :class="[
          'group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition hover:border-violet-400/60 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400/70',
          props.activeItem === item.id
            ? adultNavigationButtonGlowClasses[adultNavigationButtonGlowMap[item.id]]
            : 'border-slate-700 bg-slate-800/90',
        ]"
        @click="selectItem(item.id)"
      >
        <span class="flex items-center gap-3">
          <span
            class="h-2.5 w-2.5 rounded-full bg-gradient-to-r"
            :class="[
              item.accent,
              props.activeItem === item.id
                ? adultNavigationDotGlowClasses[adultNavigationDotGlowMap[item.id]]
                : '',
            ]"
          />
          <span class="text-sm font-semibold text-slate-100">{{ item.label }}</span>
        </span>
        <span
          class="rounded-full border border-slate-600 bg-slate-900/80 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-300"
        >
          {{ item.badge }}
        </span>
      </button>
    </div>
  </aside>
</template>
