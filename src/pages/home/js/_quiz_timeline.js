import { gsap, Back } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(MotionPathPlugin, TextPlugin);

export function setQuizPage() {
  gsap.set('.js-quiz-progress', { autoAlpha: 0 })
  gsap.set('.js-quiz-control', { y: 100 })
  gsap.set('.js-quiz-card', { y: '100vh' })
}

export function enableBtn() {
  console.log('first enabled btns')
  document.querySelector('.js-quiz-btn-check').removeAttribute('disabled')
  document.querySelector('.js-quiz-btn-delay').removeAttribute('disabled')
}

export function registerShowFeedTl(answer) {
  return gsap
    .timeline({ 
      paused: true,
      delay: 0.2,
    })
    .fromTo(`.js-feed-${answer}`, {
      x: '+=30',
      y: '+=40',
      scale: 0,
      rotate: '45deg',
    }, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: '0deg',
      stagger: 0.1,
      repeat: 1,
      repeatDelay: 0.15,
      yoyo: true,
      duration: 0.5,
      ease: Back.easeOut.config(2),
    }, '0')
    .to('.js-quiz-control', {
      y: 100,
      duration: 0.3,
      ease: Back.easeIn.config(2),
    }, '1')
}

export function registerInitQ5Tl() {
  return gsap
  .timeline({
    paused: true,
    defaults: {
      duration: 0.6,
      ease: 'Circ.easeOut',
    },
  })
  .addLabel('enter') // 卡牌滑入
  .to('.js-quiz-control', { 
    x: 0, 
    y: 0,
    duration: 0.66,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .fromTo('.js-q5', {
    y: '100vh',
    x: '-50vw',
    rotate: '45deg',
  },{ 
    x: 0, 
    y: 0,
    rotate: '0deg',
    duration: 0.8,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .addLabel('flashing') // 閃爍
  .to('.js-q5-bg', {
    opacity: 0.85,
    duration: 0.9,
    repeat: -1,
    yoyo: true,
    ease: 'none'
  }, 'flashing')
  .to('.js-q5-bed-light', {
    opacity: 0.7,
    duration: 0.9,
    repeat: -1,
    yoyo: true,
    ease: 'none'
  }, 'flashing')
  .to('.js-q5-next-fill', { // 填滿 NEXT 紅色色塊
    scaleX: 1,
    duration: 5,
    ease: 'none'
  }, 'flashing+=0.2')
  .addLabel('typing', "-=3.5") // 打字
  .to('.js-q5-text b', {
    duration: 0,
    opacity: 1,
  }, 'typing')
  .to('.js-q5-text span', {
    duration: 2.5,
    text: {
      value: window.translations[`${window.locale}`]['q5-text'],
    },
    ease: "none"
  }, 'typing')
  .to('.js-q5-text b', {
    duration: 0,
    opacity: 0,
    onComplete: () => {
      document.body.dispatchEvent(new CustomEvent('q5TypingEnd'))
    }
  }, 'typing+=2.5')
}

export function registerInitQ4Tl() {
  return gsap
  .timeline({
    paused: true,
    defaults: {
      duration: 1.6,
      ease: 'Power1.easeInOut',
    },
  })
  .set('.js-q4-bg', { x: '-5vw' })
  .set('.js-q4-mid', { x: '-50vw' })
  .set('.js-q4-front', { x: '-130vw' })
  .addLabel('enter') // 卡牌滑入
  .to('.js-quiz-control', { 
    x: 0, 
    y: 0,
    duration: 0.66,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .fromTo('.js-q4', {
    y: '100vh',
    x: '-50vw',
    rotate: '45deg',
  },{ 
    x: 0, 
    y: 0,
    rotate: '0deg',
    duration: 0.8,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .addLabel('panView') // 場景水平滑入
  .to('.js-q4-bg', { x: 0 }, 'panView-=0.2')
  .to('.js-q4-mid', { x: 0 }, 'panView-=0.2')
  .to('.js-q4-front', { x: 0 }, 'panView-=0.2')
  .addLabel('typing') // 打字
  .to('.js-q4-text b', {
    duration: 0,
    opacity: 1,
  }, 'typing')
  .to('.js-q4-text span', {
    duration: 2,
    text: {
      value: window.translations[`${window.locale}`]['q4-text'],
    },
    ease: "none"
  }, 'typing')
  .to('.js-q4-text b', {
    duration: 0,
    opacity: 0,
  }, 'typing+=2')
}

export function registerInitQ3Tl() {
  return gsap
  .timeline({
    paused: true,
    defaults: {
      duration: 0.6,
      ease: 'Circ.easeOut',
    },
  })
  .set('.js-q3-laptop', { autoAlpha: 0 }, '0')
  .set('.js-q3-block', { scale: 0 }, '0')
  .set('.js-q3-content', { scale: 0 }, '0')
  .set('.js-q3-notification', { 
    scale: 0,
   }, '0')
  .addLabel('enter') // 卡牌滑入
  .to('.js-quiz-control', { 
    x: 0, 
    y: 0,
    duration: 0.66,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .fromTo('.js-q3', {
    y: '100vh',
    x: '-50vw',
    rotate: '45deg',
  },{ 
    x: 0, 
    y: 0,
    rotate: '0deg',
    duration: 0.8,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .addLabel('showBlock') // 顯示螢幕光＋對話框
  .to('.js-q3-laptop', {
    autoAlpha: 1,
    duration: 0.8,
    ease: 'none',
  }, 'showBlock')
  .to('.js-q3-block', {
    scale: 1,
    stagger: 0.1,
    ease: Back.easeOut.config(1),
  }, 'showBlock')
  .to('.js-q3-content', {
    scale: 1,
    stagger: 0.1,
    ease: Back.easeOut.config(1),
  }, 'showBlock+=0.8')
  .addLabel('showNoti')
  .to('.js-q3-notification', {
    scale: 1,
    duration: 0.8,
    ease: Back.easeOut.config(3),
  }, 'showNoti')
  .addLabel('typing') // 打字
  .to('.js-q3-text b', {
    duration: 0,
    opacity: 1,
  }, 'typing')
  .to('.js-q3-text span', {
    duration: 2.5,
    text: {
      value: window.translations[`${window.locale}`]['q3-text'],
    },
    ease: "none"
  }, 'typing')
  .to('.js-q3-text b', {
    duration: 0,
    opacity: 0,
  }, 'typing+=2.5')
}

export function registerInitQ2Tl() {
  return gsap
  .timeline({
    paused: true,
    defaults: {
      duration: 0.6,
      ease: 'Circ.easeOut',
    },
  })
  .set('.js-q2-desk-after', { autoAlpha: 0 }, '0')
  .set('.js-q2-sticker-after', { autoAlpha: 0 }, '0')
  .set('.js-q2-like', { scale: 0 }, '0')
  .addLabel('enter') // 卡牌滑入
  .to('.js-quiz-control', { 
    x: 0, 
    y: 0,
    duration: 0.66,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .fromTo('.js-q2', {
    y: '100vh',
    x: '-50vw',
    rotate: '45deg',
  },{ 
    x: 0, 
    y: 0,
    rotate: '0deg',
    duration: 0.8,
    ease: 'Power4.easeOut' ,
  }, 'enter+=0.5')
  .addLabel('deskLight') // 桌子亮
  .to('.js-q2-desk-after', { 
    autoAlpha: 1,
    duration: 0.2,
    repeat: 2,
    yoyo: true,
    ease: 'Power1.easeInOut',
  }, 'deskLight+=0.35')
  .to('.js-q2-sticker-after', { 
    autoAlpha: 1,
    duration: 0.2,
    repeat: 2,
    yoyo: true,
    ease: 'Power1.easeInOut',
    onComplete: () => {
      document.querySelector('.js-q2-sticker-before').remove()
    }
  }, 'deskLight+=0.35')
  .addLabel('moveSticker') // 標籤動一動
  .to('.js-q2-sticker-after', {
    transformOrigin: '100% 0%',
    rotate: '-10deg',
    duration: 0.25,
  }, 'moveSticker+=0.5')
  .addLabel('showLike') // 愛心
  .to('.js-q2-like', {
    scale: 1,
    duration: 0.5,
    ease: Back.easeOut.config(3),
  }, 'showLike+=0.8')
  .addLabel('typing') // 打字
  .to('.js-q2-text b', {
    duration: 0,
    opacity: 1,
  }, 'typing')
  .to('.js-q2-text span', {
    duration: 2,
    text: {
      value: window.translations[`${window.locale}`]['q2-text'],
    },
    ease: "none"
  }, 'typing')
  .to('.js-q2-text b', {
    duration: 0,
    opacity: 0,
  }, 'typing+=2')
}

export function registerInitQ1Tl() {
  return gsap
    .timeline({
      paused: true,
      defaults: {
        delay: 0.4,
        duration: 1,
        ease: 'Circ.easeOut',
      },
      onStart: enableBtn,
    })
    .to('.js-quiz-progress', { autoAlpha: 1 }, '0')
    .to('.js-quiz-control', { x: 0, y: 0 }, '0')
    .to('.js-q1', { x: 0, y: 0 }, '0')
    .to('.js-q1-answer-check', { clearProps: 'all' }, '0') // clear inline styles
    .to('.js-q1-answer-delay', { clearProps: 'all' }, '0') // clear inline styles
    .to('.js-quiz-btn-check', { 
      color: '#000',
      backgroundColor: '#FFF',
      duration: 0.4,
    }, '0')
    .to('.js-quiz-btn-delay', { 
      color: '#000',
      backgroundColor: '#FFF',
      duration: 0.4,
    }, '0')
    .to('.js-quiz-btn-check', { clearProps: 'all' }, '0.4') // clear inline styles
    .to('.js-quiz-btn-delay', { clearProps: 'all' }, '0.4') // clear inline styles
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
    .to('.js-q1-clock-after', {
      x: '+=5px',
      repeat: 15,
      yoyo: true,
      duration: 0.1
    }, 'ringClock+=0.4')
    .to('.js-q1-clock-after', {
      y: '-=5px',
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
    .addLabel('swipeLeft', "+=0.35")
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

export function registerProgressTl() {
  return gsap.timeline({
    paused: true,
  }).to("#p-cur", {
    duration: 4, 
    ease: "none",
    motionPath:{
      path: "#p-bar",
      align: "#p-bar",
      autoRotate: true,
      alignOrigin: [0.6, 0.5]
    }
  })
}