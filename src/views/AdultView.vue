<script setup>
/**
 * @file AdultView.vue
 * @description Adult portal view content. Composes AdultMenu with the learning
 * dashboard panel and opens the C99 learning panel when selected.
 */

import { ref } from "vue";
import AdultMenu from "../components/AdultMenu.vue";
import C99View from "./C99View.vue";

const emit = defineEmits(["back"]);

/** Adult sub-menu items rendered by AdultMenu. */
const adultSubMenuItems = [
  {
    id: "curriculum",
    label: "Curriculum",
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
];

const isC99ViewOpen = ref(false);
const currentC99Page = ref("lessons");
const selectedAdultMenuItem = ref("curriculum");
const selectedCurriculumButton = ref("");
const selectedScheduleOption = ref("");

/** Keep the Schedule panel active when its calendar control is selected. */
function openSchedulePanel() {
  selectedAdultMenuItem.value = "schedule";
  isC99ViewOpen.value = false;
}

/** Change the active schedule button state without applying a global glow style. */
function selectScheduleOption(optionId) {
  selectedScheduleOption.value = optionId;
}

/** Track the selected curriculum subject for its individual button glow. */
function selectCurriculumButton(buttonId) {
  selectedCurriculumButton.value = buttonId;
}

/** Open the C99 learning panel from its curriculum button. */
function openC99Panel() {
  selectedCurriculumButton.value = "c99";
  selectedAdultMenuItem.value = "c99";
  isC99ViewOpen.value = true;
}

const scheduleButtonConfig = {
  id: "schedule-calendar-button",
  image:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='52' fill='%2307121d'/%3E%3Crect x='46' y='46' width='420' height='420' rx='28' fill='%230f172a'/%3E%3Crect x='46' y='46' width='420' height='82' rx='28' fill='%231b2c4d'/%3E%3Cpath d='M46 122h420' stroke='%235b6d9a' stroke-width='8'/%3E%3Cpath d='M128 46v86M384 46v86' stroke='%23889ac9' stroke-width='10' stroke-linecap='round'/%3E%3Cg fill='%231d3555'%3E%3Crect x='90' y='178' width='92' height='64' rx='10'/%3E%3Crect x='210' y='178' width='92' height='64' rx='10'/%3E%3Crect x='330' y='178' width='92' height='64' rx='10'/%3E%3Crect x='90' y='270' width='92' height='64' rx='10'/%3E%3Crect x='210' y='270' width='92' height='64' rx='10'/%3E%3Crect x='330' y='270' width='92' height='64' rx='10'/%3E%3Crect x='90' y='362' width='92' height='64' rx='10'/%3E%3Crect x='210' y='362' width='92' height='64' rx='10'/%3E%3Crect x='330' y='362' width='92' height='64' rx='10'/%3E%3C/g%3E%3Crect x='98' y='104' width='48' height='14' rx='7' fill='%2362a4ff'/%3E%3Crect x='366' y='104' width='48' height='14' rx='7' fill='%2362a4ff'/%3E%3C/svg%3E",
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

/** Close the C99 panel and return to the active adult section. */
function closeC99Panel() {
  isC99ViewOpen.value = false;
  selectedAdultMenuItem.value = "curriculum";
  selectedCurriculumButton.value = "";
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
        v-if="selectedAdultMenuItem === 'curriculum'"
        id="curriculum-panel"
        class="flex-1 rounded-2xl border border-teal-200/40 bg-[linear-gradient(135deg,#134e4a,#0f766e,#14b8a6,#047857,#10b981,#6ee7b7)] p-5"
      >
        <h3 class="text-3xl font-bold text-white">Curriculum</h3>
        <div id="curriculum-subject-buttons" class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <button
            id="cpp-curriculum-button"
            type="button"
            name="cpp-curriculum-button"
            class="cpp-curriculum-button"
            :class="selectedCurriculumButton === 'cpp' ? 'cpp-curriculum-button-active' : ''"
            :aria-pressed="selectedCurriculumButton === 'cpp'"
            @click="selectCurriculumButton('cpp')"
          >
            <span class="cpp-curriculum-dot" />
            <span>C++</span>
          </button>

          <button
            id="python-curriculum-button"
            type="button"
            name="python-curriculum-button"
            class="python-curriculum-button"
            :class="selectedCurriculumButton === 'python' ? 'python-curriculum-button-active' : ''"
            :aria-pressed="selectedCurriculumButton === 'python'"
            @click="selectCurriculumButton('python')"
          >
            <span class="python-curriculum-dot" />
            <span>Python</span>
          </button>

          <button
            id="web-based-curriculum-button"
            type="button"
            name="web-based-curriculum-button"
            class="web-based-curriculum-button"
            :class="selectedCurriculumButton === 'web-based' ? 'web-based-curriculum-button-active' : ''"
            :aria-pressed="selectedCurriculumButton === 'web-based'"
            @click="selectCurriculumButton('web-based')"
          >
            <span class="web-based-curriculum-dot" />
            <span>Web-Based</span>
          </button>

          <button
            id="computer-science-curriculum-button"
            type="button"
            name="computer-science-curriculum-button"
            class="computer-science-curriculum-button"
            :class="selectedCurriculumButton === 'computer-science' ? 'computer-science-curriculum-button-active' : ''"
            :aria-pressed="selectedCurriculumButton === 'computer-science'"
            @click="selectCurriculumButton('computer-science')"
          >
            <span class="computer-science-curriculum-dot" />
            <span>Computer Science</span>
          </button>

          <button
            id="hardware-curriculum-button"
            type="button"
            name="hardware-curriculum-button"
            class="hardware-curriculum-button"
            :class="selectedCurriculumButton === 'hardware' ? 'hardware-curriculum-button-active' : ''"
            :aria-pressed="selectedCurriculumButton === 'hardware'"
            @click="selectCurriculumButton('hardware')"
          >
            <span class="hardware-curriculum-dot" />
            <span>Hardware</span>
          </button>

          <button
            id="embedded-hardware-curriculum-button"
            type="button"
            name="embedded-hardware-curriculum-button"
            class="embedded-hardware-curriculum-button"
            :class="selectedCurriculumButton === 'embedded-hardware' ? 'embedded-hardware-curriculum-button-active' : ''"
            :aria-pressed="selectedCurriculumButton === 'embedded-hardware'"
            @click="selectCurriculumButton('embedded-hardware')"
          >
            <span class="embedded-hardware-curriculum-dot" />
            <span>Embedded Hardware</span>
          </button>

          <button
            id="c99-curriculum-button"
            type="button"
            name="c99-curriculum-button"
            class="c99-curriculum-button flex min-h-16 items-center gap-3 rounded-2xl border border-sky-300/65 bg-slate-900/90 px-5 py-4 text-left text-[0.95rem] font-bold text-slate-50 transition duration-150 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/85"
            :class="selectedCurriculumButton === 'c99' ? 'border-sky-300 shadow-[0_0_0_1px_rgba(125,211,252,0.95),0_0_14px_rgba(56,189,248,1),0_0_28px_rgba(14,165,233,1),0_0_52px_rgba(2,132,199,0.95)]' : ''"
            :aria-pressed="selectedCurriculumButton === 'c99'"
            @click="openC99Panel"
          >
            <span class="size-3 shrink-0 rounded-full bg-[linear-gradient(135deg,#bae6fd,#0284c7)]" />
            <span>C99</span>
          </button>
        </div>
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
              :class="[
                'schedule-option-button schedule-daily-button',
                selectedScheduleOption === 'daily' ? 'schedule-daily-button-active' : '',
              ]"
              @click="selectScheduleOption('daily')"
            >
              <span class="schedule-option-main">
                <span
                  :class="[
                    'schedule-option-dot schedule-daily-dot',
                    selectedScheduleOption === 'daily' ? 'schedule-daily-dot-active' : '',
                  ]"
                />
                <span class="schedule-option-label">Daily</span>
              </span>
            </button>

            <button
              id="weekly-schedule-button"
              type="button"
              name="weekly-schedule-button"
              :class="[
                'schedule-option-button schedule-weekly-button',
                selectedScheduleOption === 'weekly' ? 'schedule-weekly-button-active' : '',
              ]"
              @click="selectScheduleOption('weekly')"
            >
              <span class="schedule-option-main">
                <span
                  :class="[
                    'schedule-option-dot schedule-weekly-dot',
                    selectedScheduleOption === 'weekly' ? 'schedule-weekly-dot-active' : '',
                  ]"
                />
                <span class="schedule-option-label">Weekly</span>
              </span>
            </button>

            <button
              id="monthly-schedule-button"
              type="button"
              name="monthly-schedule-button"
              :class="[
                'schedule-option-button schedule-monthly-button',
                selectedScheduleOption === 'monthly' ? 'schedule-monthly-button-active' : '',
              ]"
              @click="selectScheduleOption('monthly')"
            >
              <span class="schedule-option-main">
                <span
                  :class="[
                    'schedule-option-dot schedule-monthly-dot',
                    selectedScheduleOption === 'monthly' ? 'schedule-monthly-dot-active' : '',
                  ]"
                />
                <span class="schedule-option-label">Monthly</span>
              </span>
            </button>

            <button
              id="yearly-schedule-button"
              type="button"
              name="yearly-schedule-button"
              :class="[
                'schedule-option-button schedule-yearly-button',
                selectedScheduleOption === 'yearly' ? 'schedule-yearly-button-active' : '',
              ]"
              @click="selectScheduleOption('yearly')"
            >
              <span class="schedule-option-main">
                <span
                  :class="[
                    'schedule-option-dot schedule-yearly-dot',
                    selectedScheduleOption === 'yearly' ? 'schedule-yearly-dot-active' : '',
                  ]"
                />
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
  border-color: rgba(148, 163, 184, 0.8);
}

.schedule-daily-button-active {
  border-color: rgba(110, 231, 183, 0.9);
  background-color: rgba(15, 23, 42, 0.95);
  box-shadow:
    0 0 0 1px rgba(110, 231, 183, 0.9),
    0 0 14px rgba(52, 211, 153, 1),
    0 0 26px rgba(16, 185, 129, 1),
    0 0 44px rgba(6, 95, 70, 1),
    0 0 70px rgba(4, 120, 87, 0.9);
}

.schedule-weekly-button {
  border-color: rgba(148, 163, 184, 0.8);
}

.schedule-weekly-button-active {
  border-color: rgba(165, 180, 252, 0.9);
  background-color: rgba(15, 23, 42, 0.95);
  box-shadow:
    0 0 0 1px rgba(165, 180, 252, 0.9),
    0 0 14px rgba(99, 102, 241, 1),
    0 0 26px rgba(129, 140, 248, 1),
    0 0 44px rgba(79, 70, 229, 1),
    0 0 70px rgba(67, 56, 202, 0.9);
}

.schedule-monthly-button {
  border-color: rgba(148, 163, 184, 0.8);
}

.schedule-monthly-button-active {
  border-color: rgba(125, 211, 252, 0.9);
  background-color: rgba(15, 23, 42, 0.95);
  box-shadow:
    0 0 0 1px rgba(125, 211, 252, 0.9),
    0 0 14px rgba(56, 189, 248, 1),
    0 0 26px rgba(34, 211, 238, 1),
    0 0 44px rgba(14, 165, 233, 1),
    0 0 70px rgba(2, 132, 199, 0.9);
}

.schedule-yearly-button {
  border-color: rgba(148, 163, 184, 0.8);
}

.schedule-yearly-button-active {
  border-color: rgba(252, 211, 77, 0.9);
  background-color: rgba(15, 23, 42, 0.95);
  box-shadow:
    0 0 0 1px rgba(252, 211, 77, 0.9),
    0 0 14px rgba(251, 191, 36, 1),
    0 0 26px rgba(251, 146, 60, 1),
    0 0 44px rgba(249, 115, 22, 1),
    0 0 70px rgba(234, 88, 12, 0.9);
}

.schedule-daily-dot {
  background: linear-gradient(135deg, #86efac, #22c55e);
}

.schedule-daily-dot-active {
  box-shadow:
    0 0 10px rgba(34, 197, 94, 1),
    0 0 14px rgba(22, 163, 74, 1);
}

.schedule-weekly-dot {
  background: linear-gradient(135deg, #c7d2fe, #818cf8);
}

.schedule-weekly-dot-active {
  box-shadow:
    0 0 10px rgba(99, 102, 241, 1),
    0 0 14px rgba(79, 70, 229, 1);
}

.schedule-monthly-dot {
  background: linear-gradient(135deg, #bae6fd, #38bdf8);
}

.schedule-monthly-dot-active {
  box-shadow:
    0 0 10px rgba(56, 189, 248, 1),
    0 0 14px rgba(14, 165, 233, 1);
}

.schedule-yearly-dot {
  background: linear-gradient(135deg, #fde68a, #f59e0b);
}

.schedule-yearly-dot-active {
  box-shadow:
    0 0 10px rgba(251, 191, 36, 1),
    0 0 14px rgba(249, 115, 22, 1);
}

.cpp-curriculum-button,
.python-curriculum-button,
.web-based-curriculum-button,
.computer-science-curriculum-button,
.hardware-curriculum-button,
.embedded-hardware-curriculum-button {
  display: flex;
  min-height: 4rem;
  align-items: center;
  gap: 0.75rem;
  border-radius: 1rem;
  border: 1px solid rgba(226, 232, 240, 0.65);
  background: rgba(15, 23, 42, 0.9);
  padding: 1rem 1.25rem;
  color: rgb(248 250 252);
  font-size: 0.95rem;
  font-weight: 700;
  text-align: left;
  transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
}

.cpp-curriculum-button:hover,
.python-curriculum-button:hover,
.web-based-curriculum-button:hover,
.computer-science-curriculum-button:hover,
.hardware-curriculum-button:hover,
.embedded-hardware-curriculum-button:hover {
  transform: translateY(-0.125rem);
}

.cpp-curriculum-button:focus-visible,
.python-curriculum-button:focus-visible,
.web-based-curriculum-button:focus-visible,
.computer-science-curriculum-button:focus-visible,
.hardware-curriculum-button:focus-visible,
.embedded-hardware-curriculum-button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.85);
  outline-offset: 2px;
}

.cpp-curriculum-dot,
.python-curriculum-dot,
.web-based-curriculum-dot,
.computer-science-curriculum-dot,
.hardware-curriculum-dot,
.embedded-hardware-curriculum-dot {
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
  border-radius: 9999px;
}

.cpp-curriculum-button {
  border-color: rgba(125, 211, 252, 0.65);
}

.cpp-curriculum-dot {
  background: linear-gradient(135deg, #f0abfc, #c026d3);
}

.cpp-curriculum-button-active {
  border-color: rgba(240, 171, 252, 0.95);
  box-shadow: 0 0 0 1px rgba(240, 171, 252, 0.95), 0 0 14px rgba(217, 70, 239, 1), 0 0 28px rgba(192, 38, 211, 1), 0 0 52px rgba(162, 28, 175, 0.95);
}

.cpp-curriculum-button-active .cpp-curriculum-dot {
  box-shadow: 0 0 10px rgba(240, 171, 252, 1), 0 0 24px rgba(192, 38, 211, 1);
}

.python-curriculum-button {
  border-color: rgba(253, 224, 71, 0.65);
}

.python-curriculum-dot {
  background: linear-gradient(135deg, #fde68a, #f97316);
}

.python-curriculum-button-active {
  border-color: rgba(253, 224, 71, 0.95);
  box-shadow: 0 0 0 1px rgba(253, 224, 71, 0.95), 0 0 14px rgba(250, 204, 21, 1), 0 0 28px rgba(245, 158, 11, 1), 0 0 52px rgba(234, 88, 12, 0.95);
}

.python-curriculum-button-active .python-curriculum-dot {
  box-shadow: 0 0 10px rgba(253, 224, 71, 1), 0 0 24px rgba(234, 88, 12, 1);
}

.web-based-curriculum-button {
  border-color: rgba(134, 239, 172, 0.65);
}

.web-based-curriculum-dot {
  background: linear-gradient(135deg, #a7f3d0, #059669);
}

.web-based-curriculum-button-active {
  border-color: rgba(134, 239, 172, 0.95);
  box-shadow: 0 0 0 1px rgba(134, 239, 172, 0.95), 0 0 14px rgba(52, 211, 153, 1), 0 0 28px rgba(16, 185, 129, 1), 0 0 52px rgba(5, 150, 105, 0.95);
}

.web-based-curriculum-button-active .web-based-curriculum-dot {
  box-shadow: 0 0 10px rgba(110, 231, 183, 1), 0 0 24px rgba(5, 150, 105, 1);
}

.computer-science-curriculum-button {
  border-color: rgba(147, 197, 253, 0.65);
}

.computer-science-curriculum-dot {
  background: linear-gradient(135deg, #bfdbfe, #2563eb);
}

.computer-science-curriculum-button-active {
  border-color: rgba(147, 197, 253, 0.95);
  box-shadow: 0 0 0 1px rgba(147, 197, 253, 0.95), 0 0 14px rgba(96, 165, 250, 1), 0 0 28px rgba(37, 99, 235, 1), 0 0 52px rgba(30, 64, 175, 0.95);
}

.computer-science-curriculum-button-active .computer-science-curriculum-dot {
  box-shadow: 0 0 10px rgba(147, 197, 253, 1), 0 0 24px rgba(37, 99, 235, 1);
}

.hardware-curriculum-button {
  border-color: rgba(253, 186, 116, 0.65);
}

.hardware-curriculum-dot {
  background: linear-gradient(135deg, #fed7aa, #dc2626);
}

.hardware-curriculum-button-active {
  border-color: rgba(253, 186, 116, 0.95);
  box-shadow: 0 0 0 1px rgba(253, 186, 116, 0.95), 0 0 14px rgba(251, 146, 60, 1), 0 0 28px rgba(220, 38, 38, 1), 0 0 52px rgba(153, 27, 27, 0.95);
}

.hardware-curriculum-button-active .hardware-curriculum-dot {
  box-shadow: 0 0 10px rgba(253, 186, 116, 1), 0 0 24px rgba(220, 38, 38, 1);
}

.embedded-hardware-curriculum-button {
  border-color: rgba(196, 181, 253, 0.65);
}

.embedded-hardware-curriculum-dot {
  background: linear-gradient(135deg, #ddd6fe, #7c3aed);
}

.embedded-hardware-curriculum-button-active {
  border-color: rgba(196, 181, 253, 0.95);
  box-shadow: 0 0 0 1px rgba(196, 181, 253, 0.95), 0 0 14px rgba(167, 139, 250, 1), 0 0 28px rgba(124, 58, 237, 1), 0 0 52px rgba(91, 33, 182, 0.95);
}

.embedded-hardware-curriculum-button-active .embedded-hardware-curriculum-dot {
  box-shadow: 0 0 10px rgba(196, 181, 253, 1), 0 0 24px rgba(124, 58, 237, 1);
}

</style>
