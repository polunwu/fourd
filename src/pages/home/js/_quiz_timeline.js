import { gsap, Back } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(MotionPathPlugin, TextPlugin);

export function setQuizPage() {
  gsap.set('.js-quiz-progress', { autoAlpha: 0 })
  gsap.set('.js-quiz-control', { y: 100 })
  gsap.set('.js-quiz-card', { y: '100vh' })
}

export function registerDemoQuizTl() {
  return gsap
    .timeline({ 
      paused: true,
    })
    .set('.js-q1-sunlight', { scaleX: 0.2, scaleY: 0.5 })
    // 卡牌滑入
    .addLabel('enter', '+=0.3')
    .to('.js-quiz-control', { 
      y: -19, 
      duration: 1,
      ease: 'Power4.easeOut' ,
    }, 'enter')
    .fromTo('.js-q1', 
    {
      y: '100vh',
      x: '-50vw',
      rotate: '45deg'
    }, {
      y: -19,
      x: 0,
      rotate: 0,
      duration: 1.2,
      ease: 'Power4.easeOut' ,
    }, 'enter') // t=1.2
    // 陽光灑入 
    .addLabel('showLight', "-=0.4")
    .to('.js-q1-sunlight', {
      scale: 1,
      duration: 1,
      ease: 'Power1.easeOut'
    }, 'showLight')
    .to('.js-q1-sunlight', {
      opacity: 1,
      duration: 2.5,
      ease: 'Power1.easeOut'
    }, 'showLight')
    .to('.js-q1-table-after', {
      opacity: 1,
      duration: 2,
      ease: 'Power1.easeOut'
    }, 'showLight+=0.5') // t=3.3
    // 鬧鐘響
    .addLabel('ringClock', '-=1')
    .to('.js-q1-clock-after', { 
      opacity: 1, 
      duration: 0,
      onComplete: () => {
        document.querySelector('.js-q1-clock-bofore').remove()
      } 
    }, 'ringClock')
    .fromTo('.js-q1-clock-after', 
    {
      x: 0,
    }, {
      x: 5,
      repeat: 15,
      yoyo: true,
      duration: 0.1
    }, 'ringClock+=0.4')
    .fromTo('.js-q1-clock-after', 
    {
      y: 0,
    }, {
      y: -5,
      rotate: '-2deg',
      repeat: 3,
      yoyo: true,
      yoyoEase: true,
      duration: 0.2,
      ease: 'Power1.easeIn',
    }, 'ringClock+=0.4')
    // 打字
    .addLabel('typing', 'ringClock+=1.2')
    .to('.js-q1-text b', {
      duration: 0,
      opacity: 1,
    }, 'typing')
    .to('.js-q1-text span', {
      duration: 3,
      text: {
        value: window.translations[`${window.locale}`]['q1-text'],
      },
      ease: "none"
    }, 'typing')
    .to('.js-q1-text b', {
      duration: 0,
      opacity: 0,
    }, 'typing+=3')
    // 右滑
    .addLabel('swipeRight', "+=0.8")
    .to('.js-q1', {
      x: '45vw',
      y: -40,
      rotate: '-10deg',
      duration: 0.5,
      repeat: 1,
      repeatDelay: 0.9,
      yoyo: true,
      ease: 'Sine.easeOut',
    }, 'swipeRight')
    .to('.js-q1-answer-delay', {
      opacity: 1,
      duration: 0.15,
      repeat: 1,
      repeatDelay: 1.52,
      yoyo: true,
      ease: 'Sine.easeOut',
    }, 'swipeRight+=0.08')
    .to('.js-quiz-btn-delay', {
      backgroundColor: '#FFF',
      color: '#000',
      duration: 0.15,
      repeat: 1,
      repeatDelay: 1.52,
      yoyo: true,
      ease: 'Sine.easeOut',
    }, 'swipeRight+=0.08')
    // 左滑
    .addLabel('swipeLeft', "+=0.8")
    .to('.js-q1', {
      x: '-50vw',
      y: -50,
      rotate: '12deg',
      duration: 0.5,
      repeat: 1,
      repeatDelay: 0.9,
      yoyo: true,
      ease: 'Sine.easeOut',
    }, 'swipeLeft')
    .to('.js-q1-answer-check', {
      opacity: 1,
      duration: 0.15,
      repeat: 1,
      repeatDelay: 1.52,
      yoyo: true,
      ease: 'Sine.easeOut',
    }, 'swipeLeft+=0.08')
    .to('.js-quiz-btn-check', {
      backgroundColor: '#FFF',
      color: '#000',
      duration: 0.15,
      repeat: 1,
      repeatDelay: 1.52,
      yoyo: true,
      ease: 'Sine.easeOut',
    }, 'swipeLeft+=0.08')
}