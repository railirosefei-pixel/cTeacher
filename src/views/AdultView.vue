<script setup>
/**
 * @file AdultView.vue
 * @description Adult portal view content. Composes AdultMenu with the learning
 * dashboard panel and opens the C99 side-panel when selected.
 */

import { ref } from "vue";
import AdultMenu from "../components/AdultMenu.vue";
import C99View from "./C99View.vue";

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
    id: "schedule",
    label: "Schedule",
    accent: "from-emerald-600/40 to-green-700/20",
    badge: "Plan",
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
const selectedAdultMenuItem = ref("overview");

/** Keep the Schedule panel active when its calendar control is selected. */
function openSchedulePanel() {
  selectedAdultMenuItem.value = "schedule";
  isC99ViewOpen.value = false;
}

const scheduleButtonConfig = {
  id: "schedule-calendar-button",
  image:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='58' fill='%23f8fafc'/%3E%3Crect x='56' y='64' width='400' height='384' rx='36' fill='%23f8fafc' stroke='%23cbd5e1' stroke-width='10'/%3E%3Crect x='56' y='64' width='400' height='88' rx='36' fill='%23dbeafe'/%3E%3Cpath d='M56 136h400' stroke='%23bfdbfe' stroke-width='10'/%3E%3Cpath d='M56 172h400' stroke='%23dbeafe' stroke-width='10'/%3E%3Cpath d='M142 64v88M370 64v88' stroke='%239aa9b9' stroke-width='12' stroke-linecap='round'/%3E%3Crect x='116' y='226' width='64' height='56' rx='12' fill='%23e2e8f0'/%3E%3Crect x='204' y='226' width='64' height='56' rx='12' fill='%23e2e8f0'/%3E%3Crect x='292' y='226' width='64' height='56' rx='12' fill='%23e2e8f0'/%3E%3Crect x='116' y='310' width='64' height='56' rx='12' fill='%23e2e8f0'/%3E%3Crect x='204' y='310' width='64' height='56' rx='12' fill='%23e2e8f0'/%3E%3Crect x='292' y='310' width='64' height='56' rx='12' fill='%23e2e8f0'/%3E%3Crect x='104' y='100' width='32' height='22' rx='7' fill='%233b82f6'/%3E%3Crect x='376' y='100' width='32' height='22' rx='7' fill='%233b82f6'/%3E%3Ctext x='256' y='118' text-anchor='middle' font-size='42' font-family='Arial, sans-serif' fill='%233b82f6' font-weight='700'%3EMar%3C/text%3E%3C/svg%3E",
  label: "Schedule calendar",
  action: openSchedulePanel,
};

/** Ask the app shell to return to the home view. */
function goBack() {
  emit("back");
}

/**
 * Handle menu selection events from the Adult sub-menu.
 * @param {string} itemId - Selected menu item ID.
 */
function handleMenuSelection(itemId) {
  selectedAdultMenuItem.value = itemId;

  if (itemId === "c99") {
    isC99ViewOpen.value = true;
    return;
  }

  isC99ViewOpen.value = false;
}

/**
 * Switch the active placeholder page inside the C99 panel.
 * @param {string} pageId - Target placeholder page.
 */
function selectC99Page(pageId) {
  currentC99Page.value = pageId;
  isC99ViewOpen.value = true;
}

/** Close the C99 panel and return to the overview placeholder. */
function closeC99Panel() {
  isC99ViewOpen.value = false;
  selectedAdultMenuItem.value = "overview";
}
</script>

<template>
  <section
    id="adult-view"
    class="relative rounded-2xl border border-violet-500/20 bg-slate-900/40 p-5 sm:p-6"
  >
    <button
      type="button"
      class="absolute right-5 top-5 rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-100 shadow-lg shadow-violet-950/40 transition hover:border-violet-400 hover:bg-violet-500/15 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
      @click="goBack"
    >
      Back
    </button>

    <div id="adult-view-layout" class="flex min-h-[620px] flex-col gap-6 pt-14 lg:flex-row">
      <AdultMenu
        :items="adultSubMenuItems"
        :active-item="selectedAdultMenuItem"
        @select="handleMenuSelection"
      />

      <div
        v-if="selectedAdultMenuItem === 'overview'"
        id="overview-panel"
        class="flex-1 rounded-2xl border border-violet-300/40 bg-[linear-gradient(135deg,#2e1065,#4c1d95,#6d28d9,#7c3aed,#8b5cf6,#c4b5fd)] p-5"
      >
        <div
          id="dashboard-header"
          class="flex items-center justify-between gap-4 border-b border-slate-700 pb-4"
        >
          <div id="dashboard-heading">
            <p class="text-xs uppercase tracking-[0.2em] text-cyan-300">Adult portal</p>
            <h3 class="mt-2 text-3xl font-bold text-white">Learning dashboard</h3>
          </div>
          <span
            class="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300"
          >
            Active
          </span>
        </div>

        <div id="dashboard-metrics" class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

      <div
        v-else-if="selectedAdultMenuItem === 'programs'"
        id="programs-panel"
        class="flex-1 rounded-2xl border border-teal-200/40 bg-[linear-gradient(135deg,#134e4a,#0f766e,#14b8a6,#047857,#10b981,#6ee7b7)] p-5"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-teal-100">Adult portal</p>
        <h3 class="mt-2 text-3xl font-bold text-white">Programs</h3>
        <p class="mt-4 max-w-xl text-base leading-7 text-teal-50">
          Adult learning programs will appear here.
        </p>
      </div>

      <div
        v-else-if="selectedAdultMenuItem === 'reports'"
        id="global-reports-panel"
        class="flex-1 rounded-2xl border border-orange-200/40 bg-[linear-gradient(135deg,#7f1d1d,#991b1b,#b91c1c,#9a3412)] p-5"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-orange-100">Adult portal</p>
        <h3 class="mt-2 text-3xl font-bold text-white">Global Reports</h3>
        <p class="mt-4 max-w-xl text-base leading-7 text-orange-50">
          Global learning reports will appear here.
        </p>
      </div>

      <div
        v-else-if="selectedAdultMenuItem === 'support'"
        id="support-panel"
        class="flex-1 rounded-2xl border border-yellow-200/40 bg-[linear-gradient(135deg,#9a3412,#c2410c,#ea580c,#f59e0b,#facc15,#fef08a)] p-5"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-yellow-100">Adult portal</p>
        <h3 class="mt-2 text-3xl font-bold text-white">Support</h3>
        <p class="mt-4 max-w-xl text-base leading-7 text-yellow-50">
          Adult learning support will appear here.
        </p>
      </div>

      <div
        v-else-if="selectedAdultMenuItem === 'schedule'"
        id="schedule-panel"
        class="schedule-panel flex-1 rounded-2xl border border-emerald-200/40 bg-[linear-gradient(135deg,#022c22,#065f46,#047857,#16a34a,#4ade80,#bbf7d0)] p-5"
      >
        <div class="schedule-panel-inner flex h-full flex-col">
          <button
            :id="scheduleButtonConfig.id"
            type="button"
            :name="scheduleButtonConfig.id"
            :aria-label="scheduleButtonConfig.label"
            class="schedule-calendar-button mt-2.5 ml-2.5 block size-[clamp(182px,32vw,260px)] overflow-hidden rounded-3xl p-0 transition duration-200 hover:-translate-y-0.5"
            @click="scheduleButtonConfig.action"
          >
            <img
              :id="`${scheduleButtonConfig.id}-image`"
              class="block size-full rounded-3xl object-cover"
              :src="scheduleButtonConfig.image"
              :alt="scheduleButtonConfig.label"
            />
          </button>

          <div class="schedule-options mt-4 flex w-full max-w-[18rem] flex-col gap-3">
            <button
              id="daily-schedule-button"
              type="button"
              name="daily-schedule-button"
              class="schedule-option-button schedule-daily-button"
            >
              <span class="schedule-option-main">
                <span class="schedule-option-dot schedule-daily-dot" />
                <span class="schedule-option-label">Daily</span>
              </span>
            </button>

            <button
              id="weekly-schedule-button"
              type="button"
              name="weekly-schedule-button"
              class="schedule-option-button schedule-weekly-button"
            >
              <span class="schedule-option-main">
                <span class="schedule-option-dot schedule-weekly-dot" />
                <span class="schedule-option-label">Weekly</span>
              </span>
            </button>

            <button
              id="monthly-schedule-button"
              type="button"
              name="monthly-schedule-button"
              class="schedule-option-button schedule-monthly-button"
            >
              <span class="schedule-option-main">
                <span class="schedule-option-dot schedule-monthly-dot" />
                <span class="schedule-option-label">Monthly</span>
              </span>
            </button>

            <button
              id="yearly-schedule-button"
              type="button"
              name="yearly-schedule-button"
              class="schedule-option-button schedule-yearly-button"
            >
              <span class="schedule-option-main">
                <span class="schedule-option-dot schedule-yearly-dot" />
                <span class="schedule-option-label">Yearly</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <C99View
        v-else-if="selectedAdultMenuItem === 'c99' && isC99ViewOpen"
        id="c99-panel"
        :current-page="currentC99Page"
        @close="closeC99Panel"
        @select-page="selectC99Page"
      />
    </div>
  </section>
</template>

<style scoped>
.schedule-calendar-button {
  border-color: rgba(71, 85, 105, 0.95);
  background:
    radial-gradient(circle at top, rgba(96, 165, 250, 0.18), rgba(15, 23, 42, 0.98) 52%),
    linear-gradient(180deg, rgba(15, 23, 42, 0.94), rgba(15, 23, 42, 0.9));
  box-shadow:
    0 18px 30px rgba(2, 6, 23, 0.74),
    inset 0 0 0 1px rgba(148, 163, 184, 0.14),
    inset 0 0 20px rgba(30, 41, 59, 0.7);
  transition:
    border-color 200ms ease,
    box-shadow 200ms ease,
    transform 200ms ease;
}

.schedule-calendar-button:hover {
  border-color: rgba(129, 140, 248, 0.9);
  box-shadow:
    0 20px 34px rgba(2, 6, 23, 0.82),
    0 0 22px rgba(99, 102, 241, 0.22),
    inset 0 0 18px rgba(30, 41, 59, 0.8);
}

.schedule-calendar-button:focus-visible {
  outline: 2px solid rgba(167, 139, 250, 0.7);
  outline-offset: 2px;
}

.schedule-panel {
  min-height: 620px;
}

.schedule-panel-inner {
  min-height: 100%;
}

.schedule-options {
  margin-top: 1rem;
}

.schedule-option-button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border-width: 1px;
  padding: 0.75rem 1rem;
  text-align: left;
  transition:
    border-color 150ms ease,
    background-color 150ms ease,
    box-shadow 150ms ease;
  background-color: rgba(15, 23, 42, 0.95);
  color: rgb(241 245 249);
}

.schedule-option-main {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.schedule-option-dot {
  display: inline-block;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 9999px;
  flex-shrink: 0;
}

.schedule-option-label {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.schedule-daily-button {
  border-color: rgba(134, 239, 172, 0.9);
  box-shadow:
    0 0 0 1px rgba(110, 231, 183, 0.9),
    0 0 14px rgba(52, 211, 153, 1),
    0 0 26px rgba(16, 185, 129, 1),
    0 0 44px rgba(6, 95, 70, 1),
    0 0 70px rgba(4, 120, 87, 0.9);
}

.schedule-weekly-button {
  border-color: rgba(165, 180, 252, 0.9);
  box-shadow:
    0 0 0 1px rgba(165, 180, 252, 0.9),
    0 0 14px rgba(99, 102, 241, 1),
    0 0 26px rgba(129, 140, 248, 1),
    0 0 44px rgba(79, 70, 229, 1),
    0 0 70px rgba(67, 56, 202, 0.9);
}

.schedule-monthly-button {
  border-color: rgba(125, 211, 252, 0.9);
  box-shadow:
    0 0 0 1px rgba(125, 211, 252, 0.9),
    0 0 14px rgba(56, 189, 248, 1),
    0 0 26px rgba(34, 211, 238, 1),
    0 0 44px rgba(14, 165, 233, 1),
    0 0 70px rgba(2, 132, 199, 0.9);
}

.schedule-yearly-button {
  border-color: rgba(252, 211, 77, 0.9);
  box-shadow:
    0 0 0 1px rgba(252, 211, 77, 0.9),
    0 0 14px rgba(251, 191, 36, 1),
    0 0 26px rgba(251, 146, 60, 1),
    0 0 44px rgba(249, 115, 22, 1),
    0 0 70px rgba(234, 88, 12, 0.9);
}

.schedule-daily-dot {
  background: linear-gradient(135deg, #86efac, #22c55e);
  box-shadow:
    0 0 10px rgba(34, 197, 94, 1),
    0 0 14px rgba(22, 163, 74, 1);
}

.schedule-weekly-dot {
  background: linear-gradient(135deg, #c7d2fe, #818cf8);
  box-shadow:
    0 0 10px rgba(99, 102, 241, 1),
    0 0 14px rgba(79, 70, 229, 1);
}

.schedule-monthly-dot {
  background: linear-gradient(135deg, #bae6fd, #38bdf8);
  box-shadow:
    0 0 10px rgba(56, 189, 248, 1),
    0 0 14px rgba(14, 165, 233, 1);
}

.schedule-yearly-dot {
  background: linear-gradient(135deg, #fde68a, #f59e0b);
  box-shadow:
    0 0 10px rgba(251, 191, 36, 1),
    0 0 14px rgba(249, 115, 22, 1);
}
</style>
