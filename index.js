document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro");
  const introContent = document.querySelector(".intro-content");
  const typing = document.querySelector(".typing");
  const cursor = document.querySelector(".cursor");
  const siteTarget = document.getElementById("site");
  const loadingTarget = document.getElementById("loading");

  const siteText = "WAYOKI.STORE";
  const loadingText = "Loading";
  const typingSpeed = 250;
  const loadingFrameDelay = 800;
  const loadingFrames = ["", ".", "..", "..."];

  if (!intro || !introContent || !typing || !cursor || !siteTarget || !loadingTarget) {
    return;
  }

  siteTarget.textContent = "";
  loadingTarget.textContent = "";

  function applyResponsiveLayout() {
    const viewport = window.visualViewport;
    const width = viewport ? viewport.width : window.innerWidth;
    const height = viewport ? viewport.height : window.innerHeight;
    const isMobile = width <= 768;

    intro.style.minHeight = `${height}px`;

    if (!isMobile) {
      introContent.style.transform = "translateY(20px)";
      introContent.style.gap = "24px";
      introContent.style.padding = "";
      introContent.style.width = "";
      typing.style.fontSize = "56px";
      loadingTarget.parentElement.style.fontSize = "24px";
      cursor.style.width = "12px";
      cursor.style.marginLeft = "8px";
      return;
    }

    const safeWidth = Math.max(280, width - 32);
    const titleSize = Math.max(30, Math.min(56, safeWidth * 0.12));
    const loadingSize = Math.max(16, Math.min(24, safeWidth * 0.05));

    introContent.style.transform = "translateY(0)";
    introContent.style.gap = "16px";
    introContent.style.padding = "0 16px";
    introContent.style.width = `${safeWidth}px`;
    typing.style.fontSize = `${titleSize}px`;
    loadingTarget.parentElement.style.fontSize = `${loadingSize}px`;
    cursor.style.width = `${Math.max(8, Math.round(titleSize * 0.2))}px`;
    cursor.style.marginLeft = `${Math.max(6, Math.round(titleSize * 0.14))}px`;
  }

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

  applyResponsiveLayout();
  window.addEventListener("resize", applyResponsiveLayout);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", applyResponsiveLayout);
  }
});
