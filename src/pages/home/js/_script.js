import { gsap } from "gsap"
import { registerShareLinksOpenTl, setStartPage, registerEnterStartPageTl } from "./_timeline.js";

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
  setStartPage()
  // LEAVE LOADER
  // ENTER START PAGE
  const _enterStartPageTl = registerEnterStartPageTl()
  // LEAVE START PAGE
  // KILL START PAGE RESOURCES
})
