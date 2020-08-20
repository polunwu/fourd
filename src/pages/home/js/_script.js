import { gsap } from "gsap"
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { TextPlugin } from "gsap/TextPlugin";
import { registerShareLinksOpenTl, 
  setStartPage, 
  playBgSlideTl, 
  playEnterStartPageTl, 
  registerLeaveStartPageTl } from "./_start_timeline";
import { setQuizPage, registerDemoQuizTl } from "./_quiz_timeline";
import { getTranslations } from "./_translations";
// gsap.registerPlugin(MotionPathPlugin, TextPlugin);

window.locale = "zh"
window.translations = getTranslations()

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
  setQuizPage()
  // 1. 背景無限橫移 SET BG ANIMATION - [play loop]
  let _setBgSlideTl = playBgSlideTl()
  // 1. 隱藏載入進度 LEAVE LOADER
  // 2. 進入首頁動畫 ENTER START PAGE - [play]
  let _enterStartPageTl = playEnterStartPageTl()
  // 3. 離開首頁動畫 LEAVE START PAGE - [paused]
  let _leaveStartPageTl = registerLeaveStartPageTl()
  _leaveStartPageTl.eventCallback('onComplete', () => {
    // 3.1. 卸載首頁資源 KILL START PAGE RESOURCES
    _setBgSlideTl.kill()
    _shareLinksOpenTl.kill()
    _enterStartPageTl.kill()
    _leaveStartPageTl.kill()
    document.querySelector('.page-start').remove()
    // 3.2. 發送 startPageEnd 事件
    document.body.dispatchEvent(new CustomEvent('startPageEnd'))
  })
  document.querySelector('.js-start-btn').addEventListener('click', () => {
    // 3.X. 觸發離開首頁
    _leaveStartPageTl.play()
  })
  // 4. 演示測驗動畫 DEMO QUIZ - [paused]
  let _demoQuizTl = registerDemoQuizTl()
  document.body.addEventListener('startPageEnd', () => {
    // 4.X 觸發演示測驗
    console.log('startPageEnd')
    _demoQuizTl.play()
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
