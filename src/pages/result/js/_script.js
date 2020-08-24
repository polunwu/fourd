import { gsap } from "gsap"
import { getIconUnit } from "./_icon_unit.js";
import { registerResultIconTl, registerResultTop75Tl } from "./_result_timeline.js";

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
  window.result = getResults()
  if (window.result) {
    console.log('result: ', window.result)
    renderResultText(window.result)  // 置換文字
    renderResultIcons(window.result) // 置換圖標
  } else {
    console.log('no result')
    redirectToHome() // 返回首頁測驗
  }
})

window.addEventListener('load', () => {
  
  if (result.type === 'top') {
    let resultTop75Tl = registerResultTop75Tl()
    resultTop75Tl.play()
  } else {
    let resultIconTl = registerResultIconTl()
    resultIconTl.play()
  }
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
    document.querySelector('.js-result-img-wrapper').innerHTML = window.resultData.iconUnit['top']
  } else {
    document.querySelectorAll('.js-icon-unit').forEach( el => {
      el.outerHTML = window.resultData.iconUnit[result.type]
    })
  }
}
