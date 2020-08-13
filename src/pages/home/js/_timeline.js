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
          x: 63,
        }, '0')
}