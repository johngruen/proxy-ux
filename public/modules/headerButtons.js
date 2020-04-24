const settingsButtonEl = document.querySelector("#settingsButton");
const backButtonEl = document.querySelector("#backButton");

export const setBackButton = (show) => {
  if (show) backButtonEl.removeAttribute("hidden");
  else backButtonEl.setAttribute("hidden", "");
};

export const setSettingsButton = (show) => {
  if (show) settingsButtonEl.removeAttribute("hidden");
  else settingsButtonEl.setAttribute("hidden", "");
};

// handlers
settingsButtonEl.addEventListener("click", () => {
  setupView("Settings");
});

backButtonEl.addEventListener("click", () => {
  setupView(window.lastViewName);
});
