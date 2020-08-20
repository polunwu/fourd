import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { registerShareLinksOpenTl, 
  setStartPage, 
  registerBgSlideTl, 
  registerEnterStartPageTl, 
  registerLeaveStartPageTl } from "./_start_timeline.js";
gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(TextPlugin);

window.addEventListener('load', () => {
  // 切換分享列 - [paused]
  let _shareLinksOpenTl = registerShareLinksOpenTl()
  document.querySelector('.js-open-share').addEventListener('click', () => {
    _shareLinksOpenTl.play()
  })
  document.querySelector('.js-leave-share').addEventListener('click', () => {
    _shareLinksOpenTl.reverse()
  })
  // 0. 初始設置 SET START PAGE - [set]
  setStartPage()
  // 0. 初始設置 SET QUIZ PAGE - [set]
  // 1. 背景無限橫移 SET BG ANIMATION - [play]
  let _setBgSlideTl = registerBgSlideTl()
  // 1. 隱藏載入進度 LEAVE LOADER
  // 2. 進入首頁動畫 ENTER START PAGE - [play]
  let _enterStartPageTl = registerEnterStartPageTl()
  // 3. 離開首頁動畫 LEAVE START PAGE - [paused]
  let _leaveStartPageTl = registerLeaveStartPageTl()
  _leaveStartPageTl.eventCallback('onComplete', () => {
    // 4. 卸載首頁資源 KILL START PAGE RESOURCES
    _setBgSlideTl.kill()
    _shareLinksOpenTl.kill()
    _enterStartPageTl.kill()
    _leaveStartPageTl.kill()
    document.querySelector('.page-start').remove()
  })
  document.querySelector('.js-start-btn').addEventListener('click', () => {
    _leaveStartPageTl.play()
  })
  

  // TEMP PROGRESS
  gsap.to("#p-cur", {
    duration: 5, 
    repeat: 3,
    repeatDelay: 3,
    yoyo: true,
    ease: "power1.inOut",
    motionPath:{
      path: "#p-bar",
      align: "#p-bar",
      autoRotate: true,
      alignOrigin: [0.6, 0.5]
    }
  })
})
