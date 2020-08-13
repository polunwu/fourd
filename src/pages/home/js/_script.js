import { gsap } from "gsap"
import { registerShareLinksOpenTl } from "./_timeline.js";

window.addEventListener('load', () => {
  // TOGGLE SHARE LINKS
  const _shareLinksOpenTl = registerShareLinksOpenTl()
  document.querySelector('.js-open-share').addEventListener('click', () => {
    _shareLinksOpenTl.play()
  })
  document.querySelector('.js-leave-share').addEventListener('click', () => {
    _shareLinksOpenTl.reverse()
  })
  // SET START PAGE
  // ENTER START PAGE
  // LEAVE START PAGE
})
