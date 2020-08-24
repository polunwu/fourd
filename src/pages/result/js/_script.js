import { gsap } from "gsap"
import { getIconUnit } from "./_icon_unit.js";

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
    gsap.timeline({
      repeat: -1,
      repeatDelay: 0.6,
    })
    .to('.js-top-1', {
      fill: '#E9B65A',
      duration: 0.2,
    },'0')
    .to('.js-top-1', {
      fill: '#176299',
      duration: 0.4,
    },'0.8')
    .to('.js-top-2', {
      fill: '#E9B65A',
      duration: 0.2,
    },'0.2')
    .to('.js-top-2', {
      fill: '#176299',
      duration: 0.4,
    },'0.8')
    .to('.js-top-3', {
      fill: '#E9B65A',
      duration: 0.2,
    },'0.4')
    .to('.js-top-3', {
      fill: '#176299',
      duration: 0.4,
    },'0.8')
    .to('.js-top-4', {
      fill: '#ee664e',
      duration: 0.2,
    },'0.6')
    .to('.js-top-light', {
      opacity: 1,
    }, '0.8')
  } else {
    gsap.timeline()
    .to('.js-icon-unit', {
      scale: 1.2,
      duration: 0.1,
      repeat: 1,
      stagger: {
        each: 0.1,
        repeat: 1,
        yoyo: true,
        from: 'edge',
        grid: 'auto',
        axis: 'x'
      },
    })
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
