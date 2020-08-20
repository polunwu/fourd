import { gsap } from "gsap"
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// import { TextPlugin } from "gsap/TextPlugin";
import { 
  registerShareLinksOpenTl, 
  setStartPage, 
  playBgSlideTl, 
  playEnterStartPageTl, 
  registerLeaveStartPageTl } from "./_start_timeline";
import { 
  setQuizPage, 
  registerDemoQuizTl,
  registerInitQ1Tl } from "./_quiz_timeline";
import { getTranslations } from "./_translations";
import 'hammerjs';
// gsap.registerPlugin(MotionPathPlugin, TextPlugin);

window.quiz = {
  current: '',
  totalTime: 0
}
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

  // 3.X. 按鈕 -> 觸發離開首頁
  document.querySelector('.js-start-btn').addEventListener('click', () => {
    // 3. 載入離開首頁動畫 LEAVE START PAGE - [paused]
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
    _leaveStartPageTl.play()
  })

  // 4.X 離開首頁後 -> 觸發演示測驗
  document.body.addEventListener('startPageEnd', () => {
    console.log('startPage - End')
    // 4. 演示測驗動畫 DEMO QUIZ - [paused]
    let _demoQuizTl = registerDemoQuizTl()
    _demoQuizTl.eventCallback('onComplete', () => {
    // 4.1 發送 demoQuizEnd 事件
      document.body.dispatchEvent(new CustomEvent('demoQuizEnd'))
    })
    console.log('demoQuiz - Start')
    _demoQuizTl.timeScale(2).play() // 暫時快轉
  })

  // 5.X 演示測驗結束 -> 觸發初始化 Q1 位置
  //                -> 初始化卡牌
  document.body.addEventListener('demoQuizEnd', () => {
    console.log('demoQuiz - End')
    // 5. 初始化 Q1 位置 INIT Q1 - [pause]
    let _initQ1Tl = registerInitQ1Tl()
    setCurrentQuiz('q1')
    _initQ1Tl.play()
    initAllCards()
  })

  function initAllCards() {
    const allCards = document.querySelectorAll('.js-quiz-card')
    allCards.forEach(card => {
      let hammertime = new Hammer(card);
      
      hammertime.on('pan', function(e) {
        let xMulti = e.deltaX / -16.8;
        console.log(xMulti)
        e.target.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px) rotate(${xMulti}deg)`
      })
    })
  }
  

  // TEMP PROGRESS
  let _progressTl = gsap.timeline().to("#p-cur", {
    duration: 4, 
    ease: "none",
    motionPath:{
      path: "#p-bar",
      align: "#p-bar",
      autoRotate: true,
      alignOrigin: [0.6, 0.5]
    }
  })
  _progressTl.tweenTo(0)
})

function setCurrentQuiz(quiz) {
  window.quiz.current = quiz
  console.log('current quiz:', window.quiz.current)
}
