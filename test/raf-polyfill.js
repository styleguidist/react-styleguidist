// requestAnimationFrame “polyfill”
window.requestAnimationFrame = a => a();
global.requestAnimationFrame = window.requestAnimationFrame;
