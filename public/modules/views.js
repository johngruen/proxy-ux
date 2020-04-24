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
    notes: `Some general todos here like finalizing illustrations, showing the browserAction states etc.<br><br>
    This screen shows the default front door of the extension. Normally it would send users to do the FxA auth dance, but here we skip that and go straight to onboarding.`,
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

        if (onboardingIndex === onboardingLength - 1) {
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
    notes:
      "This one needs a bunch of cleanup, still...mostly CSS + want to add illos for the links",
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
  {
    globeFrames: [75, 90],
    showSettingsButton: true,
    state: "disabled",
    stateContent: stateContent["disabled"],
    viewName: "Disabled - Warning",
    template: messageTemplate(
      "warning",
      "your proxy exploded, please turn it on again to restart."
    ),
    notes:
      "warning messages should generally dismiss when the user re-enables the proxy",
  },
  {
    globeFrames: [15, 30],
    showSettingsButton: true,
    state: "enabled",
    stateContent: stateContent["enabled"],
    viewName: "Enabled - Info",
    template: messageTemplate(
      "info",
      "We're going to be conducting routine maintenance at 1:30AM CET. You might have trouble connecting for a bit."
    ),
    notes: "need to add a dismiss button to these types of messages.",
  },
  {
    globeFrames: [15, 30],
    showSettingsButton: true,
    state: "enabled",
    stateContent: stateContent["enabled"],
    viewName: "Enabled - Good",
    template: messageTemplate(
      "good",
      `You've been using the proxy for <strong>three months straight</strong>! Thank you for your support ;)`
    ),
    notes:  "need to add a dismiss button to these types of messages.",
  },
];

export default views;
