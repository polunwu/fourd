import { gsap, Back } from "gsap"

export function registerShareLinksOpenTl() {
  return gsap
        .timeline({ 
          paused: true, 
          defaults: {
            duration: 0.2,
        }})
        .fromTo('.js-open-share', {
          autoAlpha: 1,
        }, {
          rotate: '90deg',
          autoAlpha: 0,
        })
        .fromTo('.js-leave-share', {
          rotate: '-90deg',
          autoAlpha: 0,
        }, {
          rotate: '0deg',
          autoAlpha: 1,
        }, '0')
        .fromTo('.js-share-fb', {
          x: -40,
          scale: 0,
          autoAlpha: 0,
        }, {
          x: 0,
          scale: 1,
          autoAlpha: 1,
        }, '0')
        .fromTo('.js-share-line', {
          x: -80,
          scale: 0,
          autoAlpha: 0,
        }, {
          x: 0,
          scale: 1,
          autoAlpha: 1,
        }, '0.05')
        .fromTo('.js-share-twitter', {
          x: -120,
          scale: 0,
          autoAlpha: 0,
        }, {
          x: 0,
          scale: 1,
          autoAlpha: 1,
        }, '0.1')
        .fromTo('.js-lang', {
          x: 0,
        }, {
          x: 64,
        }, '0')
}

export function setStartPage() {
  gsap.set('.js-start-title', { scale: 0, rotate: '60deg', y: 200 })
  gsap.set('.js-start-subtitle', { scale: 0, y: 100, rotate: '10deg' })
  gsap.set('.js-start-cotent-slogan', { y: 50, autoAlpha: 0 })
  gsap.set('.js-start-btn', { y: 30, autoAlpha: 0 })
  gsap.set('.js-start-btn', { y: 30, autoAlpha: 0 })
  gsap.set('.js-share', { y: -60 })
  gsap.set('.js-lang', { y: -60 })
}

export function playBgSlideTl() {
  return gsap
    .timeline({ repeat: -1 })
    .to('.js-start-bg', {
      x: -1440,
      duration: 60,
      ease: 'linear'
    })
}

export function registerLeaveLoadingTl() {
  return gsap.timeline({
    paused: true,
    defaults: {
      delay: 1.5,
      duration: 0.4,
      ease: 'none',
    }
  })
  .to('.js-loading-upper', {
    y: '-60vh'
  }, '0')
  .to('.js-loading-clock', {
    opacity: 0,
    duration: 0.1,
    ease: 'none',
  }, '0')
  .to('.js-loading-lower', {
    y: '50vh'
  }, '0')
  .to('.js-loading-percent-wrapper', {
    opacity: 0,
    duration: 0.1,
    ease: 'none',
  }, '0')
  .to('.js-loading-progress', {
    opacity: 0,
    duration: 0.1,
    ease: 'none',
  }, '0')
}

export function registerEnterStartPageTl() {
  return gsap
    // * delay timing = after leave loader complete timing
    .timeline({ 
      paused: true,
      defaults: { 
        delay: 0.2 
      } 
    }) 
    .to('.js-start-title', {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.5,
      ease: Back.easeOut.config(2),
    }, '0')
   .to('.js-start-subtitle', {
     y: 0,
     scale: 1,
     rotate: 0,
     duration: 0.5,
     ease: 'Back.easeOut',
   }, '0.2')
   .to('.js-start-cotent-slogan', {
     y: 0,
     autoAlpha: 1,
     duration: 0.6,
     ease: 'Sine.easeOut'
   }, '0.8')
   .to('.js-start-btn', {
     y: 0,
     autoAlpha: 1,
     duration: 0.5,
     ease: 'Sine.easeOut'
   }, '1.2')
   .to('.js-share', {
     y: 0,
     duration: 0.5,
     ease: 'Sine.easeOut'
   }, '1.2')
   .to('.js-lang', {
     y: 0,
     duration: 0.5,
     ease: 'Sine.easeOut'
   }, '1.2')
}

export function registerLeaveStartPageTl() {
  return gsap
    .timeline({
      paused: true
    })
    .to('.js-start-btn', {
      y: '+=40vh',
      ease: 'Back.easeIn',
      duration: 0.5
    })
    .to('.js-start-title', {
      y: '-=50vh',
      ease: 'Back.easeIn',
      duration: 0.5
    }, '0.3')
    .to('.js-start-subtitle', {
      y: '-=50vh',
      ease: 'Back.easeIn',
      duration: 0.5
    }, '0.3')
    .to('.js-start-logo', {
      y: '+=40vh',
      ease: 'easeIn',
      duration: 0.15
    },'0.35')
    .to('.js-start-cotent-slogan', {
      y: '+=40vh',
      ease: 'easeIn',
      duration: 0.15
    },'0.35')
    .to('.js-share', {
      y: '-=20vh',
      ease: 'easeIn',
      duration: 0.15
    },'0.75')
    .to('.js-lang', {
      y: '-=20vh',
      ease: 'easeIn',
      duration: 0.15
    },'0.75')
    .to('.js-start-bg', {
      y: '-=70vh',
      ease: 'easeIn',
      duration: 0.2
    },'0.75')
}