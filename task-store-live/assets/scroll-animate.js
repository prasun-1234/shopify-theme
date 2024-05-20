gsap.config({ nullTargetWarn: false })
function zoomBg(el) {
  if (el) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: `${el}`,
        start: 'top top',
        end: 'bottom center',
        scrub: 1.5,
        markers: false
      }
    })

    tl.to(`${el}`, {
      scale: 1.2
    })
  }

}

zoomBg('.zoom_gsap_bg')

function zoomOutBg(el) {
  if (el) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: `${el}`,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
        markers: false
      }
    })

    tl.to(`${el}`, {
      scaleX: .9
    })
  }

}

zoomOutBg('.scale_x_gsap_bg')

function slideUp(el, container) {
  if (el && container) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: `${container}`,
        start: 'top center',
        end: '+=500',
        scrub: 2,
        markers: false,
      }
    })

    tl.to(`${el}`, {
      y: '0'
    })
  }

}

slideUp('.slide_up_gsap', '.slide_up_container')

function opacity(el) {
  if (el) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: `${el}`,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        markers: false,
      }
    })

    tl.from(`${el}`, { opacity: '0' })
    tl.to(`${el}`, { opacity: '1' })
  }

}

opacity('.opacity_gsap')

function circleAnimate() {
  let wrapper = document.querySelector(".circle_inner_animate");
  let wrapperWidth = wrapper ? wrapper.offsetWidth : 0;
  let slides = document.querySelectorAll(".circle_animate_gsap .slide_animate_image");
  let allSlides = gsap.utils.toArray(".slide_animate_image");
  let tl;

  function timeline(height) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".circle_animate_gsap",
        start: "top top",
        end: `+=${height}`,
        scrub: 1,
        pin: ".circle_inner_animate",
        snap: {
          snapTo: 1 / (allSlides.length - 1),
          duration: 1,
          delay: 0.5,
          ease: "power1.inOut",
        },
        markers: false,
        invalidateOnRefresh: true
      },
    });
  }

  var mobile = window.matchMedia("(max-width: 1200px)");

  // Create a MediaQueryList object
  if (mobile.matches) {
    // If media query matches
    endHeight = slides.length * 400;
  } else {
    endHeight = slides.length * 500;
  }

  timeline(endHeight);
  tl
    .add("anim_start", "+=0") // Here is your label.
    .from(".vertical_slider_gsap", 1, { clipPath: "inset(50% 0px)" }, "anim_start")
    .to(".vertical_slider_gsap", 1, { clipPath: "inset(0% 0px)" }, "anim_start")
    .to(".text_1", 1, { y: mobile.matches ? "-200px" : "-250px", x: mobile.matches ? 0 : `-${wrapperWidth / 4}px` }, "anim_start")
    .to(".text_2", 1, { y: mobile.matches ? "200px" : "250px", x: mobile.matches ? 0 : `${wrapperWidth / 4}px` }, "anim_start")
    .to(allSlides, { yPercent: -100 * (allSlides.length - 1), duration: 2 });
}

circleAnimate();