import { gsap, Back } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export function registerLeaveResultLoadingTl() {
  return gsap.timeline({
    paused: true,
  })
  .to('#loading-ball', {
    duration: 2, 
    ease: 'Power4.easeInOut',
    motionPath:{
      path: '#loading-path',
      align: "#loading-path",
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    }
  })
  .addLabel('leaveContent')
  .to('.js-loading-calc', {
    duration: 0.2,
    x: '-60vw',
  }, 'leaveContent')
  .to('.js-loading-trivia', {
    duration: 0.2,
    x: '120vw',
  }, 'leaveContent')
  .addLabel('leaveBlock', '+=0.5')
  .to('.js-loading-upper', {
    duration: 0.5,
    y: '-60vh',
  }, 'leaveBlock')
  .to('.js-loading-dashboard', {
    opacity: 0,
    duration: 0.1,
  }, 'leaveBlock')
  .to('.js-loading-lower', {
    duration: 0.5,
    y: '60vh',
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
      delay: 0.5,
    }
  })
  .to('.js-icon-unit', {
    opacity: 0,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, '0.5')
  .to('.js-icon-unit--red', {
    opacity: 1,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, '0.5')
  .to('.js-icon-unit', {
    opacity: 1,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, '1')
  .to('.js-icon-unit--red', {
    opacity: 0,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, '1')
  .to('.js-icon-unit', {
    opacity: 0,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, '1.5')
  .to('.js-icon-unit--red', {
    opacity: 1,
    duration: 0,
    stagger: {
      each: 0.1,
      from: 'edge',
      grid: 'auto',
      axis: 'x'
    },
  }, '1.5')
}

export function registerResultTop75Tl() {
  return gsap.timeline({
      paused: true,
      repeat: 1,
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
}