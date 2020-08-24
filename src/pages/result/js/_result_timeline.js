import { gsap } from "gsap"

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