import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);
import { 
  registerShareLinksOpenTl, 
  setStartPage, 
  playBgSlideTl, 
  registerLeaveLoadingTl,
  registerEnterStartPageTl, 
  registerLeaveStartPageTl } from "./_start_timeline";
import { 
  setQuizPage, 
  registerProgressTl,
  registerDemoQuizTl,
  registerShowFeedTl,
  registerInitQ1Tl,
  registerInitQ2Tl,
  registerInitQ3Tl, 
  registerInitQ4Tl,
  registerInitQ5Tl } from "./_quiz_timeline";
import { getTranslations } from "./_translations";
import 'hammerjs';
let enLogoImg = require('../../../assets/images/home/home_title_en.svg')
let zhLogoImg = require('../../../assets/images/home/home_title.svg')


window.quiz = {
  isLocked: true,
  current: '',
  totalDelayTime: 0,
  progress: 0,
  progressBarOffset: 292,
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
window.i18n = function(string) {
  return window.translations[`${window.locale}`][`${string}`];
}

// 載入進度 LOADING
let loading_progess = 0
const loading_imgs = document.querySelectorAll('img')
let img_count = loading_imgs.length
let percent_per_img = 100 / img_count
const loading = document.querySelector('.js-loading')
const loading_percent_text = loading.querySelector('.js-loading-percent')
const loading_bar = loading.querySelector('.js-loading-progress-bar')

loading_imgs.forEach(img => {
  img.addEventListener('load', () => {
    loading_progess += percent_per_img
    let percent = Math.round(loading_progess)
    loading_percent_text.innerHTML = percent
    loading_bar.style.width = `${percent}%`
  })
})

window.addEventListener('load', () => {
  loading_percent_text.innerHTML = '100'
  loading_bar.style.width = '100%'

  // 0. 切換語系
  document.querySelector('button.js-zh').addEventListener('click', createLangListener(true))
  document.querySelector('button.js-en').addEventListener('click', createLangListener(false))
  // 0. 語系判斷、生成分享連結
  if (document.body.dataset.lang === 'zh') {
    createShareLinks(true)
  } else { // 若 body.data-lang 為英文，執行切換
    document.querySelector('button.js-en').dispatchEvent(new Event('click'))
  }
  
  // 0. 切換分享列 - [paused]
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
  // 1. 載入進首頁動畫 ENTER START PAGE - [play]
  let _enterStartPageTl = registerEnterStartPageTl()
  // 1. 隱藏載入進度 LEAVE LOADER
  loading.classList.add('leave')
  let _leaveLoadingTl = registerLeaveLoadingTl()
  _leaveLoadingTl.eventCallback('onComplete', () => {
    _enterStartPageTl.play()
    loading.remove()
  })
  _leaveLoadingTl.play() // 載入進度結束 LOADING END

  // 2. 載入進度條動畫 PROGRESS - [paused]
  let  _progressTl = registerProgressTl()
  _progressTl.tweenTo(0.01) // 預先停在起點

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
    updateProgress()
    // 6. 初始化 Q2
    initQ2()
  })
  document.body.addEventListener('q2End', () => {
    updateProgress()
    // 7. 初始化 Q3
    initQ3()
  })
  document.body.addEventListener('q3End', () => {
    updateProgress()
    // 8. 初始化 Q4
    initQ4()
  })
  document.body.addEventListener('q4End', () => {
    updateProgress()
    // 9. 初始化 Q5
    initQ5()
  })
  document.body.addEventListener('q5End', () => {
    console.log('ALL QUIZ END !!!')
    // 10. 測驗結束！跳轉結果頁
    let randomType = getRandomType()
    let resultString = `${window.quiz.totalDelayTime}-${randomType}`
    let langParam = `&l=${window.locale}`
    let originUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
    let resultUrl = originUrl + `result?t=${resultString}` + langParam
    console.log('RESULT: ', resultString)
    console.log('URL: ', resultUrl)
    setTimeout(() => {
      window.location.assign(resultUrl)
    }, 500);
  })

  function initAllCards() {
    const allCards = document.querySelectorAll('.js-quiz-card')
    const btnCheck = document.querySelector('.js-quiz-btn-check')
    const btnDelay = document.querySelector('.js-quiz-btn-delay')
    allCards.forEach(card => {
      let hammertime = new Hammer(card);
      
      // 卡牌滑動
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
      // 卡牌滑動結束
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
            console.log('⟶⟶ ' + window.quiz.current + ' - Delay swiped ⟶⟶')
            console.log('+++ Total delay time - ' + window.quiz.totalDelayTime + ' +++')
            showFeed('delay')
          } else { // 打勾
            console.log('⟵⟵ ' + window.quiz.current + ' - Check swiped ⟵⟵')
            console.log('+++ Total delay time - ' + window.quiz.totalDelayTime + ' +++')
            showFeed('check')
          }
        }
      })
    })
    
    // 點擊控制鈕
    btnCheck.addEventListener('click', createBtnListener(false))
    btnDelay.addEventListener('click', createBtnListener(true)) // true = delay

    function createBtnListener(delay) {
      return function (e) {
        if (window.quiz.isLocked) return

        let moveOutWidth = document.body.clientWidth * 1.5
        let currentCard = document.querySelector(`.js-${window.quiz.current}`)
        
        currentCard.style.transition = 'transform 0.3s ease-in-out'
        if (delay) { // 拖延
          // 卡牌飛出
          currentCard.style.transform = `translate(${moveOutWidth}px, -40px) rotate(-10deg)`
          // 更新拖延時數
          let time = parseInt(window.quiz.delayTime[window.quiz.current], 10)
          window.quiz.totalDelayTime += time
          console.log('⟶⟶ ' + window.quiz.current + ' - Delay button clicked ⟶⟶')
          console.log('+++ Total delay time - ' + window.quiz.totalDelayTime + ' +++')
          showFeed('delay')
        } else { // 打勾
          // 卡牌飛出
          currentCard.style.transform = `translate(-${moveOutWidth}px, -40px) rotate(10deg)`
          console.log('⟵⟵ ' + window.quiz.current + ' - Check button clicked ⟵⟵')
          console.log('+++ Total delay time - ' + window.quiz.totalDelayTime + ' +++')
          showFeed('check')
        }
      }
    }
  }

  function updateProgress() {
    window.quiz.progress++
    window.quiz.progressBarOffset -= 73
    document.querySelector(`#p-c${window.quiz.progress}`).style.opacity = '1'
    document.querySelector('#p-bar').style.strokeDashoffset = `${window.quiz.progressBarOffset}`
    _progressTl.tweenTo(parseInt(window.quiz.progress))
  }
})

function initQ1() {
  setCurrentQuiz('q1')
  // 5. 初始化 Q1 位置 INIT Q1 - [pause]
  let _initQ1Tl = registerInitQ1Tl()
  _initQ1Tl.eventCallback('onComplete', () => {
    // 解鎖卡牌
    unlockControlBtns()
    _initQ1Tl.kill()
    // 維持鬧鈴
    // document.querySelector('.js-q1-clock-after').classList.add('keep-shake')
  })
  _initQ1Tl.play()
}

function initQ2() {
  setCurrentQuiz('q2')
  resetControlBtns('q2')
  let _initQ2Tl = registerInitQ2Tl()
  _initQ2Tl.eventCallback('onComplete', () => {
    // 解鎖卡牌
    unlockControlBtns()
    _initQ2Tl.kill()
    // 維持跳動
    // document.querySelector('.js-q2-like').classList.add('keep-bounce')
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
    // 維持浮動
    // document.querySelector('.js-q3-notification').classList.add('keep-float')
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
    // 維持模糊
    // document.querySelector('.js-q4-bg').classList.add('keep-blur')
    // document.querySelector('.js-q4-mid').classList.add('keep-blur')
  })
  _initQ4Tl.play()
}

function initQ5() {
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

  // 已完成選擇，鎖住卡牌
  window.quiz.isLocked = true
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

function createShareLinks(zh) {
  let encodedShareUrl = encodeURIComponent(window.location.href)
  let encodedFbHashtag = encodeURIComponent(zh ? '#拖延計時器' : '#DelayTimer') // fb 只能有一個
  let encodedTwitterHashtag = encodeURIComponent(zh ? '#拖延計時器 #Fourdesire' : '#DelayTimer #Fourdesire')

  let fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodedShareUrl + '&hashtag=' + encodedFbHashtag
  let twitterShareUrl = 'https://twitter.com/intent/tweet?url=' + encodedShareUrl + '&text=' + encodedTwitterHashtag
  let lineShareUrl = 'https://line.me/R/msg/text/?' + encodedShareUrl

  document.querySelector('a.js-share-fb').setAttribute('href', fbShareUrl)
  document.querySelector('a.js-share-twitter').setAttribute('href', twitterShareUrl)
  document.querySelector('a.js-share-line').setAttribute('href', lineShareUrl)
}

function createLangListener(zh) {
  return function(e) {
    document.querySelector('button.js-zh').classList.toggle('active', zh)
    document.querySelector('button.js-en').classList.toggle('active', !zh)
    if (zh) {
      if (window.locale === 'zh') return 
      window.locale = 'zh'
      document.body.dataset.lang = 'zh'
      document.body.classList.remove('en')
      document.querySelector('img.js-start-title').setAttribute('src', zhLogoImg)
      document.querySelector('a.js-fd-link').setAttribute('href', 'https://fourdesire.com/')
    } else {
      if (window.locale === 'en') return 
      window.locale = 'en'
      document.body.dataset.lang = 'en'
      document.body.classList.add('en')
      document.querySelector('img.js-start-title').setAttribute('src', enLogoImg)
      document.querySelector('a.js-fd-link').setAttribute('href', 'https://fourdesire.com/en/')
    }
    document.querySelectorAll('[data-field]').forEach(el => {
      el.innerHTML = i18n(el.dataset.field.toLowerCase());
    });
    createShareLinks(zh) // 更新該語系分享連結
  }
}

function getRandomType() {
  let type = ['meme','kakin','wash','steak','ramen','traffic','egg']
  let num = Math.floor(Math.random() * 7) // random 0~6
  return type[num]
}