import { gsap } from "gsap"
import { registerShareLinksOpenTl, 
         setStartPage, 
         registerBgSlideTl, 
         registerEnterStartPageTl, 
         registerLeaveStartPageTl } from "./_start_timeline.js";

window.addEventListener('load', () => {
  // TOGGLE SHARE LINKS - [paused]
  let _shareLinksOpenTl = registerShareLinksOpenTl()
  document.querySelector('.js-open-share').addEventListener('click', () => {
    _shareLinksOpenTl.play()
  })
  document.querySelector('.js-leave-share').addEventListener('click', () => {
    _shareLinksOpenTl.reverse()
  })
  // 0. SET START PAGE - [set]
  setStartPage()
  // 1. SET BG ANIMATION - [play]
  let _setBgSlideTl = registerBgSlideTl()
  // 1. LEAVE LOADER
  // 2. ENTER START PAGE - [play]
  let _enterStartPageTl = registerEnterStartPageTl()
  // 3. LEAVE START PAGE - [paused]
  let _leaveStartPageTl = registerLeaveStartPageTl()
  _leaveStartPageTl.eventCallback('onComplete', () => {
    // 4. KILL START PAGE RESOURCES
    _setBgSlideTl.kill()
    _shareLinksOpenTl.kill()
    _enterStartPageTl.kill()
    _leaveStartPageTl.kill()
    document.querySelector('.page-start').remove()
  })
  document.querySelector('.js-start-btn').addEventListener('click', () => {
    _leaveStartPageTl.play()
  })
  
})
