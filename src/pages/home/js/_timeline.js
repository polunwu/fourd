import { gsap } from "gsap"

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
  gsap.set('.js-start-subtitle', { scale: 0, y: 100, rotate: '8deg' })
  gsap.set('.js-start-cotent-slogan', { y: 50, autoAlpha: 0 })
  gsap.set('.js-start-btn', { y: 30, autoAlpha: 0 })
  gsap.set('.js-start-btn', { y: 30, autoAlpha: 0 })
  gsap.set('.js-share', { y: -60 })
  gsap.set('.js-lang', { y: -60 })
}

export function registerEnterStartPageTl() {
  return gsap
    // * delay timing = leave loader timing
    .timeline({ defaults: { delay: 1 } }) 
    .to('.js-start-title', {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: 'Elastic.easeOut'
    }, '0')
   .to('.js-start-subtitle', {
     y: 0,
     scale: 1,
     rotate: 0,
     duration: 2,
     ease: 'Elastic.easeOut'
   }, '0.2')
   .to('.js-start-cotent-slogan', {
     y: 0,
     autoAlpha: 1,
     duration: 0.8,
     ease: 'Sine.easeOut'
   }, '0.9')
   .to('.js-start-btn', {
     y: 0,
     autoAlpha: 1,
     duration: 0.5,
     ease: 'Sine.easeOut'
   }, '1.8')
   .to('.js-share', {
     y: 0,
     duration: 0.5,
     ease: 'Sine.easeOut'
   }, '1.8')
   .to('.js-lang', {
     y: 0,
     duration: 0.5,
     ease: 'Sine.easeOut'
   }, '1.8')
}