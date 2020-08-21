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
  registerShowFeedTl,
  registerInitQ1Tl,
  registerInitQ2Tl,
  registerInitQ3Tl, 
  registerInitQ4Tl,
  registerInitQ5Tl } from "./_quiz_timeline";
import { getTranslations } from "./_translations";
import 'hammerjs';
// gsap.registerPlugin(MotionPathPlugin, TextPlugin);

window.quiz = {
  isLocked: false,
  current: '',
  totalDelayTime: 0,
  delayTime: {
    'q1': 15,
    'q2': 20,
    'q3': 10,
    'q4': 30,
    'q5': 60,
  }
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
      _demoQuizTl.kill()
      document.body.dispatchEvent(new CustomEvent('demoQuizEnd'))
    })
    console.log('demoQuiz - Start')
    _demoQuizTl.timeScale(1.5).play() // 暫時快轉
  })

  // 5.X 演示測驗結束 -> 觸發初始化 Q1 位置
  //                -> 初始化所有卡牌
  document.body.addEventListener('demoQuizEnd', () => {
    console.log('demoQuiz - End\n\n------------------------')
    // 5. 初始化 Q1
    initQ1()
    // *** 5.1 初始化所有卡牌 ***
    initAllCards()
  })

  document.body.addEventListener('q1End', () => {
    // 6. 初始化 Q2
    initQ2()
  })
  document.body.addEventListener('q2End', () => {
    // 7. 初始化 Q3
    initQ3()
  })
  document.body.addEventListener('q3End', () => {
    // 8. 初始化 Q4
    initQ4()
  })
  document.body.addEventListener('q4End', () => {
    // 9. 初始化 Q5
    console.log('got q4End')
    initQ5()
  })
  document.body.addEventListener('q5End', () => {
    // 10. 測驗結束！跳轉結果頁
    console.log('ALL QUIZ END !!!')
  })

  function initAllCards() {
    const allCards = document.querySelectorAll('.js-quiz-card')
    const btnCheck = document.querySelector('.js-quiz-btn-check')
    const btnDelay = document.querySelector('.js-quiz-btn-delay')
    allCards.forEach(card => {
      let hammertime = new Hammer(card);
      
      hammertime.on('pan', function(e) {
        if (window.quiz.isLocked) return
        if (e.deltaX === 0) return
        if (e.center.x === 0 && e.center.y === 0) return;

        btnCheck.classList.toggle('disabled', e.deltaX > 0)
        e.target.classList.toggle('card--delay', e.deltaX > 0)
        btnDelay.classList.toggle('disabled', e.deltaX < 0)
        e.target.classList.toggle('card--ckeck', e.deltaX < 0)
        e.target.querySelector('.card__text').classList.add('card__text--hide')

        let deltaR = e.deltaX / -16.8; // 45vw -> 168px -> -10deg
        // console.log(e, e.target)
        e.target.style.transition = ''
        e.target.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px) rotate(${deltaR}deg)`
      })
      hammertime.on('panend', function(e) {
        if (window.quiz.isLocked) return

        e.target.classList.remove('card--delay')
        e.target.classList.remove('card--ckeck')
        e.target.querySelector('.card__text').classList.remove('card__text--hide')

        // X 距離太短 或 速度太慢時，會彈回
        let keep = Math.abs(e.deltaX) < 80 || Math.abs(e.velocityX) < 0.5;
        let moveOutWidth = document.body.clientWidth;
        if(keep) {
          // 還原所有按鈕
          btnCheck.classList.remove('disabled')
          btnDelay.classList.remove('disabled')
          e.target.style.transition = 'transform 0.4s ease-in-out'
          e.target.style.transform = ''
        } else {
          let endX = Math.max(Math.abs(e.velocityX) * moveOutWidth, moveOutWidth);
          let toX = e.deltaX > 0 ? endX : -endX;
          let endY = Math.abs(e.velocityY) * moveOutWidth;
          let toY = e.deltaY > 0 ? endY : -endY;
          let deltaR = e.deltaX / -16.8;
          // 卡牌飛出
          e.target.style.transition = 'transform 0.2s ease-in-out'
          e.target.style.transform = `translate(${toX}px, ${toY}px) rotate(${deltaR}deg)`
          // 反饋結果
          if (e.deltaX > 0) { // 拖延
            // 更新拖延時數
            let time = parseInt(window.quiz.delayTime[window.quiz.current], 10)
            window.quiz.totalDelayTime += time
            console.log(window.quiz.current + ' - Delay selected')
            console.log('*** Total delay time = ' + window.quiz.totalDelayTime)
            showFeed('delay')
          } else { // 打勾
            console.log(window.quiz.current + ' - Check selected')
            console.log('*** Total delay time = ' + window.quiz.totalDelayTime)
            showFeed('check')
          }
        }
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

function initQ1() {
  setCurrentQuiz('q1')
  // 5. 初始化 Q1 位置 INIT Q1 - [pause]
  let _initQ1Tl = registerInitQ1Tl()
  _initQ1Tl.eventCallback('onComplete', () => {
    _initQ1Tl.kill()
  })
  _initQ1Tl.play()
}

function initQ2() {
  setCurrentQuiz('q2')
  resetControlBtns('q2')
  // TODO : 更新進度條
  let _initQ2Tl = registerInitQ2Tl()
  _initQ2Tl.eventCallback('onComplete', () => {
    // 解鎖卡牌
    unlockControlBtns()
    _initQ2Tl.kill()
  })
  _initQ2Tl.play()
}

function initQ3() {
  setCurrentQuiz('q3')
  resetControlBtns('q3')
  let _initQ3Tl = registerInitQ3Tl()
  _initQ3Tl.eventCallback('onComplete', () => {
    // 解鎖卡牌
    unlockControlBtns()
    _initQ3Tl.kill()
  })
  _initQ3Tl.play()
}

function initQ4() {
  setCurrentQuiz('q4')
  resetControlBtns('q4')
  let _initQ4Tl = registerInitQ4Tl()
  _initQ4Tl.eventCallback('onComplete', () => {
    // 解鎖卡牌
    unlockControlBtns()
    _initQ4Tl.kill()
  })
  _initQ4Tl.play()
}

function initQ4() {
  setCurrentQuiz('q5')
  resetControlBtns('q5')
  let _initQ5Tl = registerInitQ5Tl()
  // q5 為無限輪播動畫，因此偵測 typing 的結束，而非 onComplete
  document.body.addEventListener('q5TypingEnd', () => {
    // 解鎖卡牌
    unlockControlBtns()
    // _initQ5Tl.kill()
  })
  _initQ5Tl.play()
}

function setCurrentQuiz(quiz) {
  window.quiz.current = quiz
  console.log('current quiz:', window.quiz.current)
}

function showFeed(answer) {
  console.log(window.quiz.current + ' - Show ' + answer + ' feed')
  if (answer === 'delay') {
    // 置換當前題目的拖延時數
    document.querySelector('.js-feed-delay-time').innerHTML = window.quiz.delayTime[window.quiz.current]
  }
  let _showFeedTl = registerShowFeedTl(answer)
  // 秀出反饋
  _showFeedTl.play()
  // 隱藏相反的 control 鈕
  _showFeedTl.eventCallback('onComplete', () => {
    // 移除當前卡牌
    removeCard(window.quiz.current)
    // 鎖住卡牌
    window.quiz.isLocked = true
    // 結束這回合
    console.log(window.quiz.current + ' - End\n\n------------------------')
    document.body.dispatchEvent(new CustomEvent( window.quiz.current + 'End'))
  })
  let toHide = answer === 'check' ? 'delay' : 'check'
  document.querySelector(`.js-quiz-btn-${toHide}`).classList.toggle('hide', true)
}

function removeCard(card) {
  document.querySelector(`.js-${card}`).remove()
}

function resetControlBtns(card) {
  const checkBtn = document.querySelector('.js-quiz-btn-check')
  const delayBtn = document.querySelector('.js-quiz-btn-delay')
  checkBtn.classList.remove('hide')
  checkBtn.classList.add('disabled')
  delayBtn.classList.remove('hide')
  delayBtn.classList.add('disabled')
  checkBtn.innerHTML = window.translations[`${window.locale}`][`${card}-options-check`]
  delayBtn.innerHTML = window.translations[`${window.locale}`][`${card}-options-delay`]
}

function unlockControlBtns() {
  window.quiz.isLocked = false
  document.querySelector('.js-quiz-btn-check').classList.remove('disabled')
  document.querySelector('.js-quiz-btn-delay').classList.remove('disabled')
}