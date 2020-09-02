import { gsap } from "gsap"
import { getIconUnit } from "./_icon_unit.js";
import { registerLeaveResultLoadingTl,
         registerResultIconTl, 
         registerResultTop75Tl, 
         registerTrafficIconTl,
         registerOnResultSectionScrollTl,
         registerScrollToAppTl } from "./_result_timeline.js";
import smoothscroll from 'smoothscroll-polyfill';

window.delayTrivia = [
  '根據統計，每個人平均每天會在工作中拖延 2 小時！',
  '根據統計，每個人平均每天會查看電子郵件 50 幾次！',
  '根據統計，每個人平均每天會傳 77 次訊息！',
  '根據統計，「去健身房」是大家最容易拖延的事項之一喔！',
  '你知道嗎？「害怕失敗」是拖延的主因之一喔！',
  '你知道嗎？「容易衝動和分心」是拖延的主因之一喔！'
]
window.resultData = {
  timeUnit: {
    'meme': 1,
    'kakin': 1,
    'wash': 2,
    'steak': 3,
    'ramen': 3,
    'traffic': 4,
    'egg': 6
  }, 
  describe: {
    'meme': '傳迷因給朋友',
    'kakin': '手滑課金',
    'wash': '認真洗手',
    'steak': '煎完美的五分熟牛排',
    'ramen': '用大胃王的速度吃拉麵',
    'traffic': '過台北市最長的紅綠燈',
    'egg': '煮完美的溏心蛋'
  },
  iconUnit: getIconUnit(),
}

document.addEventListener('DOMContentLoaded', () => {
  // 0. 隨機生成拖延小秘密
  document.querySelector('.js-loading-trivia-content b').innerHTML = generateTrivia(window.delayTrivia)
  // 1. 從 query string 取得測驗結果
  window.result = getResults()
  if (window.result) {
    console.log('result: ', window.result)
    // 2. 根據結果渲染頁面文字
    renderResultText(window.result)  
    // 3. 根據結果置渲染面圖標
    renderResultIcons(window.result)
  } else {
    // * 若無結果，導回首頁測驗
    console.log('no result')
    redirectToHome()
  }
})

window.addEventListener('load', () => {
  // 4. 載入秀圖標動畫
  let _resultShowTl
  if (result.type === 'top') { 
    // 4.1 金字塔情況
    _resultShowTl = registerResultTop75Tl()
  } else if (result.type === 'traffic') {
    // 4.2 小綠人 -> 小紅人情況
    _resultShowTl = registerTrafficIconTl()
  } else {
    // 4.3 其餘圖標情況
    _resultShowTl = registerResultIconTl()
  }
  // 5. 隱藏載入頁面
  let _leaveResultLoadingTl = registerLeaveResultLoadingTl()
  _leaveResultLoadingTl.eventCallback('onComplete', () => {
    // 載入結束
    _leaveResultLoadingTl.kill()
    document.body.classList.add('enter') // 允許自然滾動
    document.querySelector('#loading').remove() // 移除元素#loading
    _resultShowTl.play()
  })
  _leaveResultLoadingTl.play()

  // 6. 滾動觸發圖標容器左滑動畫 - [scrub]
  if (result.type !== 'top') {
    let _onResultSectionScroll = registerOnResultSectionScrollTl()
  }
  // 7. 滾動觸發 APP icon Bouncing
  let _onScrollToAppTl = registerScrollToAppTl()


  createShareLinks()
  // 觸發分享按鈕展開
  document.querySelector('.js-share-slogan').addEventListener('click', onShareSloganClicked)
  // 點擊箭頭，自動下滑至 APP 區域
  smoothscroll.polyfill()
  document.querySelector('.js-result-arrow').addEventListener('click', onArrowClicked)
})

function createShareLinks() {
  let encodedShareUrl = encodeURIComponent(window.location.href + '&m=sharing') // 加入 sharing 參數
  let encodedFbHashtag = encodeURIComponent('#拖延計時器') // fb 只能有一個
  let encodedTwitterHashtag = encodeURIComponent('#拖延計時器 #Fourdesire')

  let fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodedShareUrl + '&hashtag=' + encodedFbHashtag
  let twitterShareUrl = 'https://twitter.com/intent/tweet?url=' + encodedShareUrl + '&text=' + encodedTwitterHashtag
  let lineShareUrl = 'https://line.me/R/msg/text/?' + encodedShareUrl

  document.querySelector('a.js-share-fb').setAttribute('href', fbShareUrl)
  document.querySelector('a.js-share-twitter').setAttribute('href', twitterShareUrl)
  document.querySelector('a.js-share-line').setAttribute('href', lineShareUrl)
}

function generateTrivia(trivia) {
  let num = Math.floor(Math.random() * 6) // random 0~5
  return trivia[num]
}

function redirectToHome() {
  window.location.assign(window.location.href.split('result')[0])
}

function redirectToDesktop() {
  window.location.assign(window.location.href.split('result')[0] + 'desktop')
}

function getResults() {
  console.log('isMobile: ', document.body.dataset.mobile !== undefined )
  if ( document.body.dataset.mobile === undefined ) { redirectToDesktop() } // 沒有 data-mobile ，非行動裝置，跳轉桌機
  
  console.log('url: ', window.location.href)

  const urlParams = new URLSearchParams(window.location.search)
  if (!urlParams.get('t')) { redirectToHome() } // CANT GET :t
  if (urlParams.get('m') === 'sharing') { redirectToHome() } // GET m=sharing from sharing url
  
  window.locale =  urlParams.get('l') ? 'en' : 'zh'
  const params = urlParams.get('t').split('-')
  console.log('lang:: ', window.locale)
  console.log('params: ', params)
  if (params.length !== 2 || !window.resultData.describe[`${params[1]}`] || isNaN(parseInt(params[0]))) {
    // NOT COMPLETE PARAMS or UNDEFINE TYPE
    redirectToHome() 
  } else {
    const type = `${params[1]}`
    const delayTime = parseInt(params[0])
    const timeUnit = parseInt(window.resultData.timeUnit[type])
    return {
      type: delayTime === 0 ? 'top' : type,
      delayTime: delayTime,
      describe: window.resultData.describe[type],
      count: Math.round(delayTime / timeUnit)
    }
  }
}

function renderResultText(result) {
  if (result.type === 'top') {
    document.querySelector('.js-result-content-1').innerHTML = '<span class="js-type-top-1"></span>'
    document.querySelector('.js-result-content-2').innerHTML = `<span class="js-type-top-2"></span>
                                                                <span class="result__highlight js-result-describe js-type-top-3"></span>
                                                                <span class="js-type-top-4"></span>`
  } else {
    document.querySelector('.js-result-count').innerHTML = result.count
  }
}

function renderResultIcons(result) {
  if (result.type === 'top') {
    // 全部置換成金字塔
    document.querySelector('.js-result-img-wrapper').innerHTML = window.resultData.iconUnit['top']
  } else {
    // 只置換單一圖標
    document.querySelectorAll('.js-icon-unit').forEach( el => {
      el.parentNode.innerHTML = window.resultData.iconUnit[result.type]
    })

    // 若非小綠人，移除隱藏的小紅人，因為不需要
    if (result.type !== 'traffic') {
      document.querySelector('.js-result-img-redlight').remove()
    }
  }
}

function onShareSloganClicked() {
  document.querySelector('.js-footer-share').classList.add('active')
}

function onArrowClicked(e) {
  e.preventDefault()
  document.querySelector('#section-app').scrollIntoView({ behavior: 'smooth' })
}
