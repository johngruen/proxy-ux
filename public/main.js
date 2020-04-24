// selectables
const stateEl = document.querySelector("#state");
const contentEl = document.querySelector("#content");
const utilsEl = document.querySelector("#utils");

const stateContentEl = document.querySelector("#stateContent");
const stateButtonEl = document.querySelector("#stateButton");
const panelButtonEl = document.querySelector("noIncludeTriggerButton");

import { animateRings, showRings, animateGlobe } from "./modules/animations.js";
import { setBackButton, setSettingsButton } from "./modules/headerButtons.js";
import views from "./modules/views.js";

// view lookup
const lookupView = (name) => {
  const filteredView = views.filter((view) => {
    if (view.viewName === name) return view;
  });
  return filteredView[0];
};

// for speediness reasons, we want o be able to access
// the current view, lastView and setupView globally
window.currentView = {};
window.lastViewName = '';
window.setupView = (name) => {
  if (typeof currentView !== "undefined") {
    lastViewName = currentView.viewName;
  }

  console.log(`last: ${lastViewName} current: ${name}`);
  currentView = lookupView(name);

  // set state on big box
  stateEl.setAttribute("data-state", currentView.state);

  // set back and settings button display
  setBackButton(currentView.showBackButton || false);
  setSettingsButton(currentView.showSettingsButton || false);

  // set the view template
  contentEl.innerHTML = currentView.template || ``;

  // do globe stuff if needed
  if (typeof currentView.globeFrames !== "undefined") {
    animateGlobe(currentView.globeFrames);
  }

  if (currentView.viewName === "Enabled") {
    showRings(true);
    animateRings();
  } else {
    showRings(false);
  }

  // add state content if needed
  if (typeof currentView.stateContent !== "undefined") {
    stateContentEl.innerHTML = currentView.stateContent;
  } else {
    stateContent.innerHTML = "";
  }

  if (typeof currentView.registerHandlers !== "undefined") {
    console.log(currentView.registerHandlers);
    currentView.registerHandlers();
  }

  // do an automatic transition of needed
  if (typeof currentView.transition !== "undefined") {
    window.setTimeout(() => {
      setupView(currentView.transition);
    }, currentView.transitionTiming);
  }
};


stateButtonEl.addEventListener("click", () => {
  if (currentView.state === "disabled") setupView("Connecting");
  if (currentView.viewName === "Enabled") setupView("Disabling");
});


// init
setupView("Disabled");

// create utility buttons for navigating states
views.forEach((view) => {
  const button = document.createElement("button");
  button.textContent = view.viewName;
  utilsEl.appendChild(button);
  // const data = viewToggle.value;
  button.addEventListener("click", () => {
    setupView(view.viewName);
  });
});
