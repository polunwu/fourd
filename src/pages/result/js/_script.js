import { gsap } from "gsap"

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
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.result = getResults()
  if (window.result) {
    console.log('result: ', window.result)
    renderResultText(window.result)
  } else {
    console.log('no result')
    redirectToHome()
  }
})

window.addEventListener('load', () => {
  
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
      delayTime: delayTime,
      describe: window.resultData.describe[type],
      count: Math.round(delayTime / timeUnit)
    }
  }
}

function renderResultText(result) {
  if (result.delayTime === 0) {

  } else {
    document.querySelector('.js-result-delay-time').innerHTML = result.delayTime
    document.querySelector('.js-result-describe').innerHTML = result.describe
    document.querySelector('.js-result-count').innerHTML = result.count
  }
}
