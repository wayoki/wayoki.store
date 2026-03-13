document.addEventListener("DOMContentLoaded", () => {
  const siteTarget = document.getElementById("site");
  const loadingTarget = document.getElementById("loading");

  const siteText = "WAYOKI.STORE";
  const loadingText = "Loading";
  const typingSpeed = 250;
  const loadingFrameDelay = 800;
  const loadingFrames = ["", ".", "..", "..."];

  if (!siteTarget || !loadingTarget) {
    return;
  }

  siteTarget.textContent = "";
  loadingTarget.textContent = "";

  function startLoadingAnimation(frameIndex = 0) {
    loadingTarget.textContent = loadingText + loadingFrames[frameIndex];

    setTimeout(() => {
      startLoadingAnimation((frameIndex + 1) % loadingFrames.length);
    }, loadingFrameDelay);
  }

  function typeText(target, value, onComplete, charIndex = 0) {
    if (charIndex >= value.length) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    target.textContent += value[charIndex];

    setTimeout(() => {
      typeText(target, value, onComplete, charIndex + 1);
    }, typingSpeed);
  }

  typeText(siteTarget, siteText, () => {
    typeText(loadingTarget, loadingText, () => {
      setTimeout(() => startLoadingAnimation(1), loadingFrameDelay);
    });
  });
});
