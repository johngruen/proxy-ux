const onboardingContent = `
  <button id="onboardingCloseButton" class="takeover__close-button"></button>
  <div class="card">
    <div class="takeover__icon"></div>
    <div class="takeover__content">
      <h2>Throw off trackers</h2>
      <p>
        Mask your location so websites can't use it to profile you, target you with ads or sell what they know about you to data collectors.
      </p>
    </div>
  </div>
  <div class="card" hidden>
    <div class="takeover__icon"></div>
    <div class="takeover__content">
      <h2>Cover your steps</h2>
      <p>
        Firefox Private Network protects you against eavesdroppers and internet service providers that collect your browsing data.
      </p>
    </div>
  </div>
  <div class="card" hidden>
    <div class="takeover__icon"></div>
    <div class="takeover__content">
      <h2>Keep it simple</h2>
      <p>
        Turn it on with a click and browse as normal.
      </p>
    </div>
  </div>
  <button class="primary" id="onboardingNextButton">Next</button>
  <button class="primary" id="onboardingDoneButton" hidden>Got it</button>`;

const loadingContent = `<div class="takeover__loading-icon"></div><h2>Loading&hellip;</h2></div>`;

const authContent = `
  <div class="takeover__icon"></div>
  <div class="takeover__content">
    <p>To start using Private Network, sign in to your Firefox account or create one.</p>
    <button class="primary" id="authButton">Continue</button>
  <div>`;

  const subscribeContent = `
  <div class="takeover__icon"></div>
  <div class="takeover__content">
    <p>Please subscribe to use Firefox Private Network</p>
    <button class="primary" id="authButton">Continue</button>
  <div>`;

const upgradeContent = `
  <div class="takeover__icon"></div>
  <div class="takeover__content">
      <p>Please update Firefox Private Network to continue.</p>
      <button class="primary" id="authButton">Find out how</button>
  </div>
`;

const clientContent = `
  <div class="takeover__icon"></div>
  <div class="takeover__content">
      <p>Your <b>Firefox Private Network <span class="lite">Lite</span></b> subscription is currently active on three clients. Please disable one to use it here. <a href="xxx">Learn more</a>.</p>
  </div>
`;

const takeoverTemplate = (
  id,
  content,
  theme = "default",
  layout = "between"
) => {
  return `<div class="takeover takeover--${theme} takeover--${layout}" id="${id}">
  ${content}
</div>`;
};

export const settingsTemplate = `<ul class="settingsMenu">
    <li class="manage"><a class="link" id="manageAccount" href="#"><img src="./images/icon.svg"/><div class="details"><span id="email">example@example.com</span><strong class="sub">Manage Subscription</strong></div></a></li>
    <li>
        <ul>
            <li><a class="link" id="helpAndSupport" href="#">Contact Support</a></li>
            <li><a class="link" id="giveUsFeedback" href="#">Leave Feedback</a></li>
        </ul>
    </li>
    <li>
        <ul>
            <li><a class="link" id="privacyPolicy" href="#">Terms of Service</a></li>
            <li><a class="link" id="termsAndConditions" href="#">Privacy Notice</a></li>
        </ul>
    </li>
</ul>
<footer>
  <span id="poweredBy">Powered by &nbsp;</span>
  <a href="#" class="link" id="cloudflare">Cloudflare</a>
</footer>`;

export const messageTemplate = (type, content) => {
  return `<div class="message message--${type}"><span>${content}</span><div class="dismiss"></div></div>`;
};

export const onboardingTemplate = takeoverTemplate("onboarding", onboardingContent)

export const loadingTemplate = takeoverTemplate("loading", loadingContent, "inverse", "center");

export const authTemplate = takeoverTemplate("auth", authContent);

export const subscribeTemplate = takeoverTemplate("auth", subscribeContent);

export const stateContent = {
  "disabled": `<h2>Private Network is off</h2><h3>Enable to mask your IP and location.</h3>`,
  "disabling": `<h2>Disconnecting...</h2>`,
  "connecting": `<h2>Connecting...</h2><h3>You will be protected shortly.</h3>`,
  "enabled": `<h2>Private Network is on</h2><h3>Your IP and location are protected.</h3>`
};

export const upgradeTemplate = takeoverTemplate("upgradePrompt", upgradeContent);

export const clientTemplate = takeoverTemplate(
  "clientPrompt",
  clientContent,
  "default",
  "center"
);

