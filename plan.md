Read C:\cTeacher\rules\copilot-rules.md

Do not create any directories or files without my explicit consent. If a file or directory should be created, ask me first, always.

Make sure that you write the code in a way that makes adding, subtracting, and editing simple and seamless so that adding functionality, buttons, menus, screens, assets and everything else in the program is a simple process.

Make sure that front-end pipelines are being created often, so that if there's an error it will be extremely simple to find exactly where that error is. I want everything perfectly organized and labeled to avoid any confusion for debugging or adding functionality.

After every small batch of code is implemented, edited, or removed or any combination of the 3, use Playwright tests, Sonarqube, and ESLint to make sure that the code is cleaned up, functional, and easy for you to read. 

IMPORTANT Do not run these tests after every little edit unless explicitly told to do so, only after a small batch of edits have been made.  

IMPORTANT Follow the plan 1 step at a time

1.) Please update src/App.vue to build the homepage layout with the following requirements:

Layout:

Create a full-screen homepage layout using Tailwind CSS.

Include a left-aligned container (sidebar) that holds vertically stacked buttons.

The layout must leave ample space in the container so additional buttons can be easily added in the future.

Buttons:

Include three vertically stacked buttons labeled: "Adult", "Child", and "Settings".

Structure the buttons cleanly (ideally mapped from a reactive array or cleanly separated) to prepare for future menu routing.

Color Scheme & Aesthetics:

Use a rich, colorful theme composed of dark colors (e.g., deep slate/zinc backgrounds paired with dark jewel tones, dark indigo, violet, cyan, or emerald accents).

Ensure high contrast and clear readability for all text and interactive states (hover/focus).

Implementation:

Implement this entirely in src/App.vue using Vue 3 <script setup>.

Use Tailwind utility classes for all layout and styling.