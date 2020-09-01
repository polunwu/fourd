import { gsap, Back } from "gsap"
import { SlowMo } from "gsap/EasePack"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin)

export function registerLeaveResultLoadingTl() {
  return gsap.timeline({
    paused: true,
  })
  .to('#loading-ball', {
    duration: 2.5, 
    ease: SlowMo.ease.config(0.3, 0.7, false),
    motionPath:{
      path: '#loading-path',
      align: "#loading-path",
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    }
  })
  .addLabel('leaveContent', '+=0.5')
  .to('.js-loading-calc', {
    y: '-=50vh',
    ease: 'Back.easeIn',
    duration: 0.4,
  }, 'leaveContent')
  .to('.js-loading-trivia', {
    y: '+=60vh',
    ease: 'Back.easeIn',
    duration: 0.4,
  }, 'leaveContent')
  .addLabel('leaveBlock', '+=0.2')
  .to('.js-loading-upper', {
    duration: 0.5,
    y: '-=60vh',
  }, 'leaveBlock')
  .to('.js-loading-dashboard', {
    opacity: 0,
    duration: 0.1,
  }, 'leaveBlock')
  .to('.js-loading-lower', {
    duration: 0.5,
    y: '+=60vh',
  }, 'leaveBlock')
}

export function registerScrollToAppTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-app-section',
      start: 'top 50%',
      toggleActions: "play pause resume reset"
    }
  })
  .to('.js-app-icon', {
    scale: 1.05,
    repeat: 1,
    yoyo: true,
    duration: 0.35,
    ease: Back.easeIn.config(1),
  })
}

export function registerOnResultSectionScrollTl() {
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.js-result-section',
      start: 'top +=95px',
      end: 'bottom 30%',
      scrub: 0.3,
    }
  })
  .to('.js-result-img', {
    x: '-42%',
  })
}

export function registerResultIconTl() {
  return gsap.timeline({
    paused: true,
  })
  .addLabel('showText')
  .set('.js-result-content', { y: '+=25vh' })
  .addLabel('type') // 1 -> delay -> 3 4 5-> describe
  .to('.js-type-1', {
    duration: 0.9,
    text: {
      value: '嘿！你每天平均花 ',
    },
    ease: "none"
  })
  .to('.js-result-delay-time', {
    duration: () => {
      return window.result.delayTime.toString().length * 0.1
    },
    text: {
      value: window.result.delayTime,
    },
    ease: "none"
  })
  .to('.js-type-3', {
    duration: 0.2,
    text: {
      value: '分鐘',
    },
    ease: "none"
  })
  .to('.js-type-4', {
    duration: 0.4,
    text: {
      value: '在拖延噢',
    },
    ease: "none"
  })
  .to('.js-type-5', {
    duration: 0.9,
    text: {
      value: '這些時間足夠讓你 ',
    },
    ease: "none"
  })
  .to('.js-result-describe', {
    duration: () => {
      return window.result.describe.length * 0.1
    },
    text: {
      value: window.result.describe,
    },
    ease: "none"
  })
  .addLabel('reveal', '+=0.5')
  .to('.js-result-content', {
    y: 0,
    duration: 0.6,
    ease: Back.easeOut.config(3),
  }, 'reveal')
  .fromTo('.js-result-img-wrapper svg.js-result-img-universal', {
    x: '105vw'
  },{
    x: 0,
    duration: 0.7,
    ease: Back.easeOut.config(3),
  }, 'reveal')
  .fromTo('.js-result-count-wrapper', { 
    scale: 0,
   }, {
     scale: 1,
     duration: 0.5,
      ease: Back.easeOut.config(3),
   }, 'reveal+=0.1')
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

export function registerTrafficIconTl() {
  return gsap.timeline({
    paused: true,
    defaults: {
      // delay: 0.5,
    }
  })
  .addLabel('showText')
  .set('.js-result-content', { y: '+=25vh' })
  .addLabel('type') // 1 -> delay -> 3 4 5-> describe
  .to('.js-type-1', {
    duration: 0.9,
    text: {
      value: '嘿！你每天平均花 ',
    },
    ease: "none"
  }, 'type')
  .to('.js-result-delay-time', {
    duration: () => {
      return window.result.delayTime.toString().length * 0.1
    },
    text: {
      value: window.result.delayTime,
    },
    ease: "none"
  })
  .to('.js-type-3', {
    duration: 0.2,
    text: {
      value: '分鐘',
    },
    ease: "none"
  })
  .to('.js-type-4', {
    duration: 0.4,
    text: {
      value: '在拖延噢',
    },
    ease: "none"
  })
  .to('.js-type-5', {
    duration: 0.9,
    text: {
      value: '這些時間足夠讓你 ',
    },
    ease: "none"
  })
  .to('.js-result-describe', {
    duration: () => {
      return window.result.describe.length * 0.1
    },
    text: {
      value: window.result.describe,
    },
    ease: "none"
  })
  .addLabel('reveal', '+=0.5')
  .to('.js-result-content', {
    y: 0,
    duration: 0.6,
    ease: Back.easeOut.config(3),
  }, 'reveal')
  .fromTo('.js-result-img-wrapper svg.js-result-img-universal', {
    x: '105vw'
  },{
    x: 0,
    duration: 0.7,
    ease: Back.easeOut.config(3),
  }, 'reveal')
  .fromTo('.js-result-count-wrapper', { 
    scale: 0,
   }, {
     scale: 1,
     duration: 0.5,
      ease: Back.easeOut.config(3),
   }, 'reveal+=0.1')
  .to('.js-icon-unit', {
    opacity: 0,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, 'reveal+=0.5')
  .to('.js-icon-unit--red', {
    opacity: 1,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, 'reveal+=0.5')
  .to('.js-icon-unit', {
    opacity: 1,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, 'reveal+=1')
  .to('.js-icon-unit--red', {
    opacity: 0,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, 'reveal+=1')
  .to('.js-icon-unit', {
    opacity: 0,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, 'reveal+=1.5')
  .to('.js-icon-unit--red', {
    opacity: 1,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, 'reveal+=1.5')
}

export function registerResultTop75Tl() {
  return gsap.timeline({
      paused: true,
    })
    .addLabel('type') // 1 -> 2 -> 3 -> 4
    .to('.js-type-top-1', {
      duration: 0.6,
      text: {
        value: '哇！經過計算',
      },
      ease: "none"
    }, 'type')
    .to('.js-type-top-2', {
      duration: 0.3,
      text: {
        value: '你比 ',
      },
      ease: "none"
    })
    .to('.js-type-top-3', {
      duration: 0.3,
      text: {
        value: '75%',
      },
      ease: "none"
    })
    .to('.js-type-top-4', {
      duration: 1,
      text: {
        value: ' 的人更有效率呢！',
      },
      ease: "none"
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
}