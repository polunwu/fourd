import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getIconUnit } from "./_icon_unit.js";
import { registerResultIconTl, registerResultTop75Tl, registerTrafficIconTl } from "./_result_timeline.js";
gsap.registerPlugin(ScrollTrigger)

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
  
  // 4. 秀出圖標動畫
  if (result.type === 'top') { 
    // 4.1 金字塔情況
    let resultTop75Tl = registerResultTop75Tl()
    resultTop75Tl.play()
  } else if (result.type === 'traffic') {
    // 4.2 小綠人 -> 小紅人情況
    let resultTrafficIconTl = registerTrafficIconTl()
    resultTrafficIconTl.play()
  } else {
    // 4.3 其餘圖標情況
    let resultIconTl = registerResultIconTl()
    resultIconTl.play()
  }

  // 5. 滾動觸發圖標左滑動畫
  if (result.type !== 'top') {

  }

  // 觸發分享按鈕展開
  document.querySelector('.js-share-slogan').addEventListener('click', onShareSloganClicked)
})

function redirectToHome() {
  window.location.assign(window.location.origin)
}

function getResults() {
  console.log('url: ', window.location.href)
  const urlParams = new URLSearchParams(window.location.search)
  const params = urlParams.get('t').split('-')
  console.log('params: ', params)
  if (params.length !== 3) {
    return null
  } else {
    const type = `${params[2]}`
    const delayTime = parseInt(params[1])
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
    document.querySelector('.js-result-content-1').innerHTML = '哇！經過計算'
    document.querySelector('.js-result-content-2').innerHTML = `你比 <span class="result__highlight js-result-describe">75%</span> 的人更有效率呢！`
  } else {
    document.querySelector('.js-result-delay-time').innerHTML = result.delayTime
    document.querySelector('.js-result-describe').innerHTML = result.describe
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
