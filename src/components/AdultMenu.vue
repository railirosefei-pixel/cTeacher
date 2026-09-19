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
          typeof menuItem.badge === "string",
      ),
  },
});

const emit = defineEmits(["select"]);

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
    <div
      id="adult-navigation-header"
      class="mb-5 border-b border-slate-700 pb-4"
    >
      <p
        class="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300"
      >
        Menu
      </p>
      <h2 class="mt-2 text-2xl font-bold text-white">Adult</h2>
    </div>

    <div id="adult-navigation-items" class="space-y-3">
      <button
        v-for="item in props.items"
        :key="item.id"
        type="button"
        @click="selectItem(item.id)"
        class="group flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-left transition hover:border-violet-400/60 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
      >
        <span class="flex items-center gap-3">
          <span
            class="h-2.5 w-2.5 rounded-full bg-gradient-to-r"
            :class="item.accent"
          ></span>
          <span class="text-sm font-semibold text-slate-100">{{
            item.label
          }}</span>
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
