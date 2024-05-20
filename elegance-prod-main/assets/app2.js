let anchorNum = 1
document.querySelectorAll("a").forEach(link => {
  anchorNum++
  if (link.getAttribute("href") == "" || link.getAttribute("href") == "javascript:void(0)") {
    link.setAttribute("href", "#")
  }
})

if (document.body.classList.contains("template-collection")) {
  function CollectionFilter() {
    let filterBtn = document.querySelector("#collection_options");
    let filterCloseBtn = document.querySelector("#sidebar_close");
    let sidebar = document.querySelector("#collection_sidebar")

    if (filterBtn) {
      filterBtn.addEventListener("click", () => {
        sidebar.classList.add("sidebar-active");
      })

    }

    if (filterCloseBtn) {
      filterCloseBtn.addEventListener("click", () => {
        sidebar.classList.remove("sidebar-active");
      })
    }


  }

  CollectionFilter();

}




window.addEventListener("load", (e) => {
  const swiper = new Swiper('.product-slider', {
    // Default parameters
    slidesPerView: $(".product-slider").attr("data-count"),
    pagination: { el: ".product-slider .swiper-pagination", clickable: true },
    navigation: { nextEl: ".product-slider .swiper-button-next", prevEl: ".product-slider .swiper-button-prev" },
    loop: false,
    spaceBetween: 30,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      541: {
        slidesPerView: 2
      },
      // when window width is >= 640px
      1024: {
        slidesPerView: $(".product-slider").attr("data-count")
      }
    }
  })

  const swiperAbout = new Swiper("#about-us .logo-slider", {
    slidesPerView: $("#about-us .logo-slider").attr("data-count"),
    speed: 1200,
    loop: false,
    autoplay: { delay: 2000 },
    pagination: { el: ".logo-slider .swiper-pagination", type: "fraction" },
    navigation: { nextEl: ".logo-slider .swiper-button-next", prevEl: ".logo-slider .swiper-button-prev" },
    breakpoints: { 1024: { slidesPerView: $("#about-us .logo-slider").attr("data-count"), spaceBetween: 30 }, 480: { slidesPerView: 1, spaceBetween: 10 }, 0: { slidesPerView: 1, spaceBetween: 10 } },
  })

  const swiperArticle = new Swiper("#article-collections", {
    slidesPerView: 3,
    loop: true,
    autoplay: { delay: 2000 },
    pagination: { el: "#article-collections .swiper-pagination", clickable: true },
    navigation: { nextEl: "#article-collections .swiper-button-next", prevEl: "#article-collections .swiper-button-prev" },
    breakpoints: { 1024: { slidesPerView: 3 }, 541: { slidesPerView: 2 }, 0: { slidesPerView: 1 } },
  });

  if (document.querySelector(".complementarySwiper")) {
    const complementarySwiper = new Swiper('.complementarySwiper', {
      slidesPerView: document.querySelector('.complementarySwiper').getAttribute('data-limit'),
      loop: false,
      autoplay: { delay: 2000 },
      pagination: { el: '.complementarySwiper .swiper-pagination', clickable: true },
      breakpoints: {
        640: {
          slidesPerView: document
            .querySelector('.complementarySwiper')
            .getAttribute('data-limit'),
        },
        420: { slidesPerView: 2 },
        0: { slidesPerView: 2 },
      },
    });

    if (document.querySelector(".complementarySwiper .swiper-pagination-lock")) {
      document.querySelector(".complementarySwiper").classList.add("swiper_padding_none")
    }

  }

  // Single Product Swiper

  const swiperProduct = new Swiper("#single_product_swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 2000 },
    pagination: { el: "#single_product_swiper .swiper-pagination", clickable: true },
    navigation: { nextEl: "#single_product_swiper .swiper-button-next", prevEl: "#single_product_swiper .swiper-button-prev" }
  });


  const swiperFeaturedProduct = new Swiper(".featured_product_swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 2000 },
    pagination: { el: ".featured_product_swiper .swiper-pagination", clickable: true },
    navigation: { nextEl: ".featured_product_swiper .swiper-button-next", prevEl: ".featured_product_swiper .swiper-button-prev" }
  });

  if (document.body.classList.contains("template-product")) {
    let radioBtns = document.querySelectorAll("#product_options input[type='radio'], select.product-variant-dropdown")
    if (radioBtns) {
      radioBtns.forEach(radio => {
        radio.addEventListener('change', () => {
          swiperProduct.slideTo(1);
        })
      })
    }
  }

  if (document.body.classList.contains("template-index")) {
    document.querySelectorAll(".featured_product_swiper").forEach((swiper, index) => {

      let radioBtns = swiper.querySelectorAll(".product_options input[type='radio'], select.product-variant-dropdown")
      if (radioBtns) {
        radioBtns.forEach(radio => {
          radio.addEventListener('change', () => {
            swiperFeaturedProduct.slideTo(1);
          })
        })
      }
    })
  }

})


// Intersection Observers

// const letterObserver = new IntersectionObserver((entries)=>{
//   entries.forEach((entry)=>{
//    if(entry.isIntersecting){
//      entry.target.classList.add('letter-show')
//    }
//   })
// })

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide_active')
    }
  })
})

const svgObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('svg_scroll_active')
    }
  })
})

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-show')
    }
  })
})

const hiddenSection = document.querySelectorAll("section");

if (document.querySelector("#animate_js").classList.contains("section-animate")) {
  hiddenSection.forEach((el) => {

    sectionObserver.observe(el)
  })
} else {


  hiddenSection.forEach((el) => {
    el.classList.add("section-show")
  })

}

hiddenSection.forEach((el) => { sectionObserver.observe(el) })

function svgAnimate() {

  let svgEl = document.querySelectorAll(".svg_scroll_observer");

  svgEl.forEach((el) => { svgObserver.observe(el) })

}

svgAnimate();

function slideAnimate() {

  let slideEl = document.querySelectorAll(".slide_observer");

  slideEl.forEach((el) => { slideObserver.observe(el) })

}

slideAnimate();





function circleText() {

  let text = document.querySelectorAll(".circle-text-wrap")

  for (let i = 0; i < text.length; i++) {
    text[i].innerHTML = text[i].textContent.replace(/\S/g, "<span>$&</span>");
    const el = text[i].querySelectorAll("span")

    for (let j = 0; j < el.length; j++) {
      el[j].style.transform = "rotate(" + j * 16.5 + "deg)";
      if (j > 21) {
        el[j].remove();
      }
    }
  }

}

circleText();

function video2() {

  let btn = document.querySelector("#video_2_btn");
  let videoDiv = document.querySelector("#video_2");

  if (btn == null) {
    return null
  } else {
    btn.addEventListener("click", (e) => {
      videoDiv.classList.add("video-active")
      videoDiv.querySelector("video").play()
    })
  }

}

video2();


function accordionMain() {
  let accordionSec = document.querySelectorAll(".accordion-section");

  for (let i = 0; i < accordionSec.length; i++) {
    let accordion = accordionSec[i].querySelectorAll(".faq-div");

    accordion.forEach((item) => {
      document.addEventListener("keyup", (e) => {
        if (e.target === item && e.key == "Enter") {
          accordionHide();
          item.classList.toggle("accordion-active")
          console.log("Faq Enter Working!!")
        }
      })
      item.addEventListener("click", (e) => {
        accordionHide();
        item.classList.toggle("accordion-active")
      })
    })

  }
}

function accordionHide() {
  let accordionSec = document.querySelectorAll('.accordion-section');

  for (let i = 0; i < accordionSec.length; i++) {
    let accordion = accordionSec[i].querySelectorAll('.faq-div');

    accordion.forEach((item) => {
      item.classList.remove('accordion-active');
    });
  }
}
accordionMain();

// ----- Swiper Initialization

const swiperSocial = new Swiper('#swiper_social', {
  // Optional parameters
  loop: true,
  centeredSlides: $("#swiper_social").attr("data-center"),
  slidesPerView: $("#swiper_social").attr("data-count"),
  autoplay: true,
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    // when window width is >= 0px
    0: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 980px
    980: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: $("#swiper_social").attr("data-count"),
      spaceBetween: 20
    }
  },
  // If we need pagination
  pagination: {
    el: '#swiper_social .swiper-pagination',
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '#swiper_social .swiper-button-next',
    prevEl: '#swiper_social .swiper-button-prev',
  },
});


function megaMenuMain() {

  let menuItems = document.querySelectorAll("#header_menu > li, #header_mobile > li")

  function showMega(index) {
    let megaDiv = document.querySelector("#mega_menu_list")
    let megaItem
    if (megaDiv) {
      megaItem = megaDiv.querySelectorAll(`.mega-menu-desktop[data-mega="${index}"]`)

      for (let j = 0; j < megaItem.length; j++) {
        if (index) {
          return megaItem[j];
        }
      }
    }
  }

  function megaItems() {

    let megaItems = document.querySelectorAll(".parent-link > .child-menu-1.has-submenu");

    for (let p = 0; p < megaItems.length; p++) {
      megaItems[p].addEventListener("click", (e) => {
        megaItems[p].querySelector(".child-link").classList.add("child-active")

        let menuBack = megaItems[p].querySelector(".child-link .menu-back svg");

        if (e.target == menuBack) {
          megaItems[p].querySelector(".child-link").classList.remove("child-active")
        }

      })

      megaItems[p].addEventListener("keyup", (e) => {
        if (e.key == "Enter" || e.key == " ") {
          megaItems[p].querySelector(".child-link").classList.add("child-active")

          let menuBack = megaItems[p].querySelector(".child-link .menu-back");

          if (e.target == menuBack) {
            megaItems[p].querySelector(".child-link").classList.remove("child-active")
          }
        }
      })

    }

  }

  megaItems();

  function showMobileMega(index) {
    let megaDiv = document.querySelector("#mega_menu_mobile")

    if (megaDiv) {
      let megaItem = megaDiv.querySelectorAll(`.mega-menu-mobile[data-mega="${index}"]`)

      for (let j = 0; j < megaItem.length; j++) {
        let megaClose = megaItem[j].querySelector(".menu-back svg");

        if (index) {
          if (megaClose) {
            megaClose.addEventListener("click", (e) => {
              megaItem[j].classList.remove("mega-menu-active")
            })
          }
          return megaItem[j];
        }
      }
    }
  }


  for (let i = 0; i < menuItems.length; i++) {
    let index = menuItems[i].getAttribute("data-mega");

    switch (index) {
      case "1":
        if (showMega("1")) {
          menuItems[i].classList.add("mega-item-active");
        }
        break;
      case "2":
        if (showMega("2")) {
          menuItems[i].classList.add("mega-item-active");
        }
        break;
      case "3":
        if (showMega("3")) {
          menuItems[i].classList.add("mega-item-active");
        }
        break;
      case "4":
        if (showMega("4")) {
          menuItems[i].classList.add("mega-item-active");
        }
        break;
      case "5":
        if (showMega("5")) {
          menuItems[i].classList.add("mega-item-active");
        }
        break;
      case "6":
        if (showMega("6")) {
          menuItems[i].classList.add("mega-item-active");
        }
        break;

      default:
        break;
    }

    menuItems[i].addEventListener("click", (e) => {
      let mobileIndex = e.target.getAttribute("data-mega");


      switch (mobileIndex) {
        case "1":
          if (showMobileMega("1")) {
            showMobileMega("1").classList.add("mega-menu-active");
          }
          break;
        case "2":
          if (showMobileMega("2")) {
            showMobileMega("2").classList.add("mega-menu-active");
          }
          break;
        case "3":
          if (showMobileMega("3")) {
            showMobileMega("3").classList.add("mega-menu-active");
          }
          break;
        case "4":
          if (showMobileMega("4")) {
            showMobileMega("4").classList.add("mega-menu-active");
          }
          break;
        case "5":
          if (showMobileMega("5")) {
            showMobileMega("5").classList.add("mega-menu-active");
          }
          break;
        case "6":
          if (showMobileMega("6")) {
            showMobileMega("6").classList.add("mega-menu-active");
          }
          break;

        default:
          break;
      }

    })


    menuItems[i].addEventListener("mouseenter", (e) => {

      let menuIndex = e.target.getAttribute("data-mega");

      switch (menuIndex) {
        case "1":

          if (showMega("1")) {
            showMega("1").classList.add("mega-menu-active");
          }

          break;
        case "2":

          if (showMega("2")) {
            showMega("2").classList.add("mega-menu-active");
          }

          break;

        case "3":

          if (showMega("3")) {
            showMega("3").classList.add("mega-menu-active");
          }

          break;
        case "4":

          if (showMega("4")) {
            showMega("4").classList.add("mega-menu-active");
          }

          break;
        case "5":

          if (showMega("5")) {
            showMega("5").classList.add("mega-menu-active");
          }

          break;
        case "6":

          if (showMega("6")) {
            showMega("6").classList.add("mega-menu-active");
          }

          break;

        default:
          break;
      }
    })

    menuItems[i].addEventListener("mouseleave", (e) => {

      let menuIndex = e.target.getAttribute("data-mega");

      switch (menuIndex) {
        case "1":

          if (showMega("1")) {
            showMega("1").classList.remove("mega-menu-active");
          }

          break;
        case "2":

          if (showMega("2")) {
            showMega("2").classList.remove("mega-menu-active");
          }

          break;

        case "3":

          if (showMega("3")) {
            showMega("3").classList.remove("mega-menu-active");
          }

          break;
        case "4":

          if (showMega("4")) {
            showMega("4").classList.remove("mega-menu-active");
          }

          break;
        case "5":

          if (showMega("5")) {
            showMega("5").classList.remove("mega-menu-active");
          }

          break;
        case "6":

          if (showMega("6")) {
            showMega("6").classList.remove("mega-menu-active");
          }

          break;

        default:
          break;
      }
    })

    menuItems[i].addEventListener("keyup", (e) => {

      let menuIndex = e.target.closest("li[data-mega]").getAttribute("data-mega");

      if (e.key == " ") {
        switch (menuIndex) {
          case "1":

            if (showMega("1")) {
              showMega("1").classList.add("mega-menu-active");
              showMega("1").focus();
            }

            break;
          case "2":

            if (showMega("2")) {
              showMega("2").classList.add("mega-menu-active");
              showMega("2").focus();
            }

            break;

          case "3":

            if (showMega("3")) {
              showMega("3").classList.add("mega-menu-active");
              showMega("3").focus();
            }

            break;
          case "4":

            if (showMega("4")) {
              showMega("4").classList.add("mega-menu-active");
              showMega("4").focus();
            }

            break;
          case "5":

            if (showMega("5")) {
              showMega("5").classList.add("mega-menu-active");
              showMega("5").focus();
            }

            break;
          case "6":

            if (showMega("6")) {
              showMega("6").classList.add("mega-menu-active");
              showMega("6").focus();
            }

            break;

          default:
            break;
        }
      }
    })

    document.addEventListener("keyup", (e) => {
      if (e.key == "Escape") {
        document.querySelectorAll(".mega-menu-desktop").forEach(item => {
          item.classList.remove("mega-menu-active");
        })
      }
    })
  }

}

megaMenuMain();


$(function () {
  $('#create_customer').submit(function (e) {
    if ($('input[name="customer[password]"]').val() != $('input[name="customer[password_confirmation]"]').val()) {
      e.preventDefault();
      alert('Passwords do not match.');
    }
  });
});


// Page Loader


window.addEventListener("load", (e) => {
  let pageLoader = document.querySelector("#page_loader")
  if (pageLoader) {
    pageLoader.classList.add("hide")
  }
})


// Aria Accessibility 

let allButtons = document.querySelectorAll("button");

if (allButtons) {
  allButtons.forEach(button => {
    if (!button.hasAttribute("aria-label") || button.getAttribute("aria-label") == "") {
      if (button.querySelector(".aria-label")) {
        button.setAttribute("aria-label", button.querySelector(".aria-label").innerText)
      } else if (button.innerText) {
        button.setAttribute("aria-label", button.innerText)
      } else {
        button.setAttribute("aria-label", "button")
      }
    }
  })
}

let allLinks = document.querySelectorAll("a");

if (allLinks) {
  allLinks.forEach(link => {
    if (!link.hasAttribute("aria-label") || link.getAttribute("aria-label") == "") {
      if (link.querySelector(".aria-label")) {
        link.setAttribute("aria-label", link.querySelector(".aria-label").innerText)
      } else if (link.innerText) {
        link.setAttribute("aria-label", link.innerText)
      } else {
        link.setAttribute("aria-label", "link")
      }
    }
  })
}

let ariaControls = document.querySelectorAll("[aria-controls]")

if (ariaControls) {
  ariaControls.forEach(el => {
    let modalEl = document.querySelector(`#${el.getAttribute('aria-controls')}`)
    el.setAttribute("aria-expanded", "false")
    el.addEventListener("click", (e) => {
      if (el.getAttribute("aria-expanded") == "true") {
        el.setAttribute("aria-expanded", "false")
      } else {
        el.setAttribute("aria-expanded", "true")
      }
    })
    el.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        if (el.getAttribute("aria-expanded") == "true") {
          el.setAttribute("aria-expanded", "false")
        } else {
          el.setAttribute("aria-expanded", "true")
        }
        if (modalEl) {
          modalEl.setAttribute("tabindex", 0)
          console.log(modalEl)
          modalEl.focus()
        }
      }
    })
    document.addEventListener("keyup", (e) => {
      if (e.key == "Escape") {
        el.setAttribute("aria-expanded", "false")
      }
    })
  })
}


//  Video Poster

let videoPoster = document.querySelectorAll("video[poster]")

if (videoPoster) {
  videoPoster.forEach(videoEl => {
    videoEl.querySelector("img").setAttribute("loading", "lazy")
    videoEl.querySelector("img").setAttribute("alt", "video_thumbnail")
  })
}

// Add to Cart Tab Hover

let productItems = document.querySelectorAll(".product_item_main")

if (productItems) {
  productItems.forEach(item => {
    item.addEventListener("keyup", (e) => {
      if (e.key == "Tab") {
        item.querySelector(".product-button").style.transform = "translateY(0)"
        item.querySelector(".product-button").style.opacity = "1"
        item.querySelector(".product-button").style.visibility = "visible"
        item.querySelector(".icon-wrap").style.opacity = "1"
        item.querySelector(".icon-wrap").style.visibility = "visible"
      }
    })
    let productBtn = item.querySelector(".product-button")

    productBtn.addEventListener("keyup", (e) => {
      if (e.key == "Enter" || e.key == " ") {
        let productAdd = productBtn.querySelector(".product-add a")
        if (productAdd) {
          productAdd.click()
        } else {
          productBtn.querySelector("a").click()
        }
      }
    })

  })
}

// Zoom on Image Hover

//  Zoom on Image Hover


$(".zoom-image")
  // tile mouse actions
  .on("mouseover", function () {
    $(this)
      .children("img")
      .css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
  })
  .on("mouseout", function () {
    $(this)
      .children("img")
      .css({ transform: "scale(1)" });
  })
  .on("mousemove", function (e) {
    $(this)
      .children("img")
      .css({
        "transform-origin":
          ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
          "% " +
          ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
          "%"
      });
  });


// AR Button

function setupShopifyXr() {
  if (!window.ShopifyXR) {
    document.addEventListener('shopify_xr_initialized', function () {
      setupShopifyXr();
    });
  } else {
    document.querySelectorAll('[id^="ProductJSON-"]').forEach((modelJSON) => {
      window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
      modelJSON.remove();
    });
    window.ShopifyXR.setupXRElements();
  }
}

window.Shopify.loadFeatures([
  {
    name: 'shopify-xr',
    version: '1.0',
    onLoad: setupShopifyXr,
  },
]);