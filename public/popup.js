// selectables
const stateEl = document.querySelector("#state");
const contentEl = document.querySelector("#content");
const utilsEl = document.querySelector("#utils");
const backButtonEl = document.querySelector("#backButton");
const settingsButtonEl = document.querySelector("#settingsButton");
const stateContentEl = document.querySelector("#stateContent");
const globeEl = document.querySelector("#stateIcon");
const ringsEl = document.querySelector("#stateAnimation");
const stateButtonEl = document.querySelector("#stateButton");

// templates
const settingsTemplate = `<ul class="settingsMenu">
    <li class="manage"><a class="link" id="manageAccount" href="#"><img src="./images/icon.svg"/><div class="details"><span id="email">example@example.com</span><strong class="sub">Manage Subscription</strong></div></a></li>
    <li>
        <ul>
            <li><a class="link" id="helpAndSupport" href="#">Contact Support</a></li>
            <li><a class="link" id="giveUsFeedback" href="#">Leave Feedback</a></li>
        </ul>
    </li>
    <li>
        <ul>
            <li><a class="link" id="privacyPolicy" href="#">Privacy Policy</a></li>
            <li><a class="link" id="termsAndConditions" href="#">Leave Feedback</a></li>
        </ul>
    </li>
</ul>
  <footer>
    <span id="poweredBy">Powered by &nbsp;</span>
    <a href="#" class="link" id="cloudflare">Cloudflare</a>
  </footer>`;
const nullTemplate = ``;

const loadingTemplate = `<div id="loading"><div id="loading-icon"></div><h2>Loading...</h2></div>`;

// views
const views = [
  {
    viewName: "Loading",
    showBackButton: false,
    showSettingsButton: false,
    state: "hidden",
    transition: "Disabled",
    transitionTiming: 2000,
    template: loadingTemplate,
  },
  {
    viewName: "Disabling",
    showBackButton: false,
    showSettingsButton: true,
    state: "disabling",
    template: nullTemplate,
    stateContent: `<h2>Disconnecting...</h2>`,
    transition: "Disabled",
    transitionTiming: 2000,
    globeFrames: [60, 75],
  },
  {
    viewName: "Disabled",
    showBackButton: false,
    showSettingsButton: true,
    stateContent: `<h2>Proxy is off</h2><h3>Enable to mask your IP and location.</h3>`,
    state: "disabled",
    template: nullTemplate,
    globeFrames: [75, 90],
  },
  {
    viewName: "Connecting",
    showBackButton: false,
    showSettingsButton: true,
    state: "connecting",
    stateContent: `<h2>Connecting...</h2><h3>You will be protected shortly.</h3>`,
    transition: "Enabled",
    globeFrames: [0, 15],
    transitionTiming: 2000,
    template: nullTemplate,
  },
  {
    viewName: "Enabled",
    showBackButton: false,
    showSettingsButton: true,
    state: "enabled",
    globeFrames: [15, 30],
    stateContent: `<h2>Enabled</h2><h3>IP address and location masked.</h3>`,
    template: nullTemplate,
  },
  {
    viewName: "Settings",
    showBackButton: true,
    showSettingsButton: false,
    state: "hidden",
    template: settingsTemplate,
  },

  {
    viewName: "Error",
    showBackButton: true,
    showSettingsButton: false,
    stateContent: `<p class="error">something's gone wrong! Please try resetting the proxy.</p>`,
    state: "disabled",
    template: nullTemplate,
    globeFrames: [75, 90],
  },
];

const globeAnimation = bodymovin.loadAnimation({
  container: globeEl,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "images/globe.json",
  initialSegment: [89,90]
});

const ringAnimation = bodymovin.loadAnimation({
  container: ringsEl,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "images/rings.json",
});

// just be lazy and store the current view in a global;
let currentView;
let lastViewName;

// the next several functions are basically view rendering
const animateGlobe = (segment) => {
  globeAnimation.setSpeed(1);
  globeAnimation.playSegments(currentView.globeFrames, false);
}

const animateRings = () => {
  ringAnimation.setSpeed(0.5);
  ringAnimation.play();
}

// animateRings();

const setBackButton = (show) => {
  if (show) backButtonEl.removeAttribute("hidden");
  else backButtonEl.setAttribute("hidden", "");
};

const setSettingsButton = (show) => {
  if (show) settingsButtonEl.removeAttribute("hidden");
  else settingsButtonEl.setAttribute("hidden", "");
};

const getViewInfo = (name) => {
  const filteredView = views.filter((view) => {
    if (view.viewName === name) return view;
  });
  return filteredView[0];
};

const setupView = (name) => {
  if (typeof currentView !== "undefined") {
    lastViewName = currentView.viewName;
  }

  currentView = getViewInfo(name);

  // set state on big box
  stateEl.setAttribute("data-state", currentView.state);

  // set back and settings button display
  setBackButton(currentView.showBackButton);
  setSettingsButton(currentView.showSettingsButton);

  // set the view template
  contentEl.innerHTML = currentView.template;

  // do globe stuff if needed
  if (typeof currentView.globeFrames !== "undefined") {
    animateGlobe(currentView.globeFrames);
  }

  if (currentView.viewName === 'Enabled') {
      ringsEl.removeAttribute("hidden");
    animateRings();
  } else {
    ringsEl.setAttribute("hidden","");
  }

  // add state content if needed
  if (typeof currentView.stateContent !== "undefined") {
    stateContentEl.innerHTML = currentView.stateContent;
  } else {
    stateContent.innerHTML = "";
  }

  // do an automatic transition of needed
  if (typeof currentView.transition !== "undefined") {
    window.setTimeout(() => {
      setupView(currentView.transition);
    }, currentView.transitionTiming);
  }
};

// handlers
settingsButtonEl.addEventListener("click", () => {
  setupView("Settings");
});


backButtonEl.addEventListener("click", () => {
  setupView(lastViewName);
});

stateButtonEl.addEventListener("click", () => {
  if (currentView.state === "disabled") setupView("Connecting");
  if (currentView.viewName === "Enabled") setupView("Disabling");
});

// init
setupView("Loading");

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


