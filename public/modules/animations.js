const globeEl = document.querySelector("#stateIcon");
const ringsEl = document.querySelector("#stateAnimation");

const GLOBE_SPEED = 1;
const RING_SPEED = 0.5;

const globeAnimation = bodymovin.loadAnimation({
  container: globeEl,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "images/globe.json",
  initialSegment: [89, 90],
});

const ringAnimation = bodymovin.loadAnimation({
  container: ringsEl,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "images/rings.json",
});

export const animateGlobe = (segment) => {
  globeAnimation.setSpeed(GLOBE_SPEED);
  globeAnimation.playSegments(segment, false);
};

export const animateRings = () => {
  ringAnimation.setSpeed(RING_SPEED);
  ringAnimation.play();
};

export const showRings = (show) => {
  if (show) ringsEl.removeAttribute("hidden");
  else ringsEl.setAttribute("hidden", "");
};
