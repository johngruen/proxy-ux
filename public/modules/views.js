import {
  onboardingTemplate,
  loadingTemplate,
  settingsTemplate,
  authTemplate,
  messageTemplate,
  upgradeTemplate,
  clientTemplate,
  stateContent,
} from "./templates.js";

const views = [
  {
    viewName: "Authenticate",
    state: "hidden",
    template: authTemplate,
    registerHandlers: () => {
      const authButtonEl = document.querySelector("#authButton");
      authButtonEl.addEventListener("click", () => {
        setupView("Onboarding");
      });
    },
  },
  {
    showBackButton: false,
    showSettingsButton: false,
    state: "hidden",
    template: onboardingTemplate,
    viewName: "Onboarding",
    registerHandlers: () => {
      const onboardingCloseButtonEl = document.querySelector(
        "#onboardingCloseButton"
      );

      const onboardingNextButtonEl = document.querySelector(
        "#onboardingNextButton"
      );
      const onboardingDoneButtonEl = document.querySelector(
        "#onboardingDoneButton"
      );
      const onboardingCardEls = document.querySelectorAll("#onboarding .card");
      const onboardingLength = onboardingCardEls.length;
      let onboardingIndex = 0;

      onboardingNextButtonEl.addEventListener("click", () => {
        if (onboardingIndex < onboardingLength - 1) {
          onboardingCardEls[onboardingIndex].setAttribute("hidden", "");
          onboardingIndex++;
          onboardingCardEls[onboardingIndex].removeAttribute("hidden");
        }

        if (onboardingIndex === onboardingLength - 2) {
          onboardingNextButtonEl.setAttribute("hidden", "");
          onboardingDoneButtonEl.removeAttribute("hidden");
        }

        onboardingDoneButtonEl.addEventListener("click", () => {
          setupView("Disabled");
        });
      });

      onboardingCloseButtonEl.addEventListener("click", () => {
        setupView("Disabled");
      });
    },
  },
  {
    state: "hidden",
    template: loadingTemplate,
    transition: "Authenticate",
    transitionTiming: 2000,
    viewName: "Loading",
  },
  {
    globeFrames: [60, 75],
    showSettingsButton: true,
    state: "disabling",
    stateContent: stateContent["disabling"],
    transition: "Disabled",
    transitionTiming: 2000,
    viewName: "Disabling",
  },
  {
    globeFrames: [75, 90],
    showSettingsButton: true,
    state: "disabled",
    stateContent: stateContent["disabled"],
    viewName: "Disabled",
    template: messageTemplate(
      "good",
      "argle bargle lorem ipsum blah blah blah blah"
    ),
  },
  {
    globeFrames: [0, 15],
    showSettingsButton: true,
    state: "connecting",
    stateContent: stateContent["connecting"],
    transition: "Enabled",
    transitionTiming: 2000,
    viewName: "Connecting",
  },
  {
    globeFrames: [15, 30],
    showSettingsButton: true,
    state: "enabled",
    stateContent: stateContent["enabled"],
    viewName: "Enabled",
  },
  {
    showBackButton: true,
    state: "hidden",
    template: settingsTemplate,
    viewName: "Settings",
  },
  {
    state: "hidden",
    template: upgradeTemplate,
    viewName: "Force Upgrade",
  },
  {
    state: "hidden",
    template: clientTemplate,
    viewName: "Max Clients",
  },
];

export default views;
