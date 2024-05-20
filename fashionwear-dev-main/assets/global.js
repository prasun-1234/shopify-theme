// Page Loader

window.addEventListener("load", (e) => {
  let pageLoader = document.querySelector("#page_loader")
  if (pageLoader) {
    pageLoader.classList.add("hidden")
    pageLoader.classList.remove("flex")
  }
})


// Format Money
let formatMoney = function (cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.', ''); }
  let value = '';
  let placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  let formatString = (format || this.money_format);

  function defaultOption(opt, def) {
    return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number / 100.0).toFixed(precision);

    let parts = number.split('.'),
      dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
      cents = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

class LocalizationForm extends HTMLElement {
  constructor() {
    super();
    this.elements = {
      input: this.querySelector('input[name="language_code"], input[name="country_code"]'),
      button: this.querySelector('button'),
      panel: this.querySelector('ul'),
    };
    this.elements.button.addEventListener('click', this.openSelector.bind(this));
    this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
    this.addEventListener('keyup', this.onContainerKeyUp.bind(this));

    this.querySelectorAll('a').forEach((item) => item.addEventListener('click', this.onItemClick.bind(this)));
  }

  hidePanel() {
    this.elements.button.setAttribute('aria-expanded', 'false');
    this.elements.panel.setAttribute('hidden', true);
  }

  onContainerKeyUp(event) {
    if (event.code.toUpperCase() !== 'ESCAPE') return;

    this.hidePanel();
    this.elements.button.focus();
  }

  onItemClick(event) {
    event.preventDefault();
    const form = this.querySelector('form');
    this.elements.input.value = event.currentTarget.dataset.value;
    if (form) form.submit();
  }

  openSelector() {
    this.elements.button.focus();
    this.elements.panel.toggleAttribute('hidden');
    this.elements.button.setAttribute(
      'aria-expanded',
      (this.elements.button.getAttribute('aria-expanded') === 'false').toString()
    );
  }

  closeSelector(event) {
    const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
    if (event.relatedTarget === null || shouldClose) {
      this.hidePanel();
    }
  }
}


let goTopBtn = document.querySelector(".go_to_top")

if (goTopBtn) {
  goTopBtn.addEventListener("click", (e) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  })
}
// Swiper 

let productSlider = document.querySelectorAll(".productSwiper");


if (productSlider) {
  sliderNum = 1
  productSlider.forEach(slider => {
    sliderNum++

    slider.setAttribute("id", `product-swiper-${sliderNum}`)
    let sliderId = slider.getAttribute("id")

    const productSwiper = new Swiper(`#${sliderId}`, {
      slidesPerView: document.getElementById(`${sliderId}`).getAttribute('data-col'),
      spaceBetween: 20,
      pagination: {
        el: `#${sliderId} .swiper-pagination`,
        clickable: true
      },
      allowTouchMove: false,
      navigation: {
        nextEl: `#${sliderId} .swiper-button-next`,
        prevEl: `#${sliderId} .swiper-button-prev`,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: document.getElementById(`${sliderId}`).getAttribute('data-col'),
          spaceBetween: 20,
        },
      },
    });

  })
}

if (document.querySelector(".productZoomSwiper")) {
  const productZoomSwiper = new Swiper(`.productZoomSwiper`, {
    slidesPerView: 2,
    spaceBetween: 20,
    allowTouchMove: false,
    navigation: {
      nextEl: '.productZoomSwiper .swiper-button-next',
      prevEl: '.productZoomSwiper .swiper-button-prev',
    },
    pagination: {
      el: '.productZoomSwiper .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      }
    },
  });
}
if (document.querySelectorAll(".testimonial")) {
  var swiper = new Swiper('.testimonial', {
    speed: 1000,
    pagination: {
      el: '.testimonial .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.testimonial .swiper-button-next',
      prevEl: '.testimonial .swiper-button-prev',
    },
  });
}

let blogSwiper = document.querySelectorAll('.homeBlogSwiper');

if (blogSwiper) {
  sliderNum = 0
  blogSwiper.forEach(slider => {
    sliderNum++
    slider.setAttribute("id", `blog-swiper-${sliderNum}`)
    let sliderId = slider.getAttribute("id")

    window.addEventListener("load", (e) => {
      const blogSwiper = new Swiper(`#${sliderId}`, {
        slidesPerView: document.getElementById(`${sliderId}`).getAttribute('data-count'),
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.blog-btn .swiper-button-next',
          prevEl: '.blog-btn .swiper-button-prev',
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: document.getElementById(`${sliderId}`).getAttribute('data-count'),
            spaceBetween: 20,
          },
        }
      });
    })

  })
}

// Quantity Counter

function quantityCounter() {
  const quantityCounters = document.querySelectorAll('.quantity-counter');
  if (quantityCounters) {
    quantityCounters.forEach((counter) => {
      const button = counter.querySelectorAll('button');
      const increaseButton = counter.querySelector('.increase');
      const decreaseButton = counter.querySelector('.decrease');
      const quantityInput = counter.querySelector('.quantity');

      increaseButton.addEventListener('click', (e) => {
        let max = quantityInput.getAttribute("max")

        let quantity = parseInt(quantityInput.value);
        quantity = Math.min(max, quantity + 1);
        quantityInput.value = quantity;
        toggleButtonState(quantity, decreaseButton, increaseButton, max);

      });
      decreaseButton.addEventListener('click', (e) => {
        let max = quantityInput.getAttribute("max")

        let quantity = parseInt(quantityInput.value);
        quantity = Math.max(1, quantity - 1);
        quantityInput.value = quantity;
        toggleButtonState(quantity, decreaseButton, increaseButton, max);

      });


      quantityInput.addEventListener('change', () => {
        let max = quantityInput.getAttribute("max")
        toggleButtonState(parseInt(quantityInput.value), decreaseButton, increaseButton, max);
      });

      toggleButtonState(parseInt(quantityInput.value), decreaseButton, increaseButton);
    });
  }

  function toggleButtonState(quantity, decreaseButton, increaseButton, max) {
    decreaseButton.disabled = quantity <= 1;
    increaseButton.disabled = quantity > max;
  }
}

quantityCounter();

// Swiper

let itemSlideActive = false

document.querySelectorAll(".productSwiper .swiper-slide").forEach(slide => {
  slide.addEventListener("mouseenter", (e) => {
    //  itemSlideActive = {
    //   delay:2000
    //  }

  })
  slide.addEventListener("mouseleave", (e) => {
    itemSlideActive = false
  })
})

const productItemSlider = new Swiper('.productItemSlider', {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.productItemSlider .swiper-button-next',
    prevEl: '.productItemSlider .swiper-button-prev',
  }
})



let collectionSection = document.querySelectorAll(".featured-collection-main")
if (collectionSection) {
  collectionSection.forEach(section => {
    let productSingle = section.querySelectorAll('.product_item_main[data-slider]')
    productSingle.forEach((item, index) => {
      item.querySelectorAll("input[type='radio']").forEach((radio) => {
        radio.addEventListener('change', () => {
          if (productItemSlider) {
            productItemSlider[index + 1].slideTo(0)
          }
        })
      })
    })
  })
}


let chartBtn = document.querySelector(".chart_btn")
if (chartBtn) {
  let chartModal = document.querySelector(".chart_modal")
  let chartClose = document.querySelector(".chart_close")
  chartBtn.addEventListener("click", (e) => {
    chartModal.classList.add("chart_active")
  })
  chartClose.addEventListener("click", (e) => {
    chartModal.classList.remove("chart_active")
  })
}

let secondaryIcon = document.querySelectorAll(".newIcon");

if (secondaryIcon) {
  secondaryIcon.forEach(icon => {
    let iconSrc = icon.getAttribute("data-icon")
    let string = `{% render '${iconSrc}' %}`
    icon.innerHTML = string;
  })
}


// SEO & Accessibility

let img = document.querySelectorAll("img");

if (img) {
  img.forEach(image => {
    if (image.hasAttribute("alt") && image.getAttribute("alt") == "") {
      image.setAttribute("alt", "image")
    }
  })
}

let allBtn = document.querySelectorAll("button");

if (allBtn) {
  allBtn.forEach(button => {
    let text = button.innerText;
    if (!button.hasAttribute("aria-label") || button.getAttribute("aria-label") == "") {
      if (text) {
        button.setAttribute("aria-label", text)
      } else if (button.querySelector(".aria-label")) {
        button.setAttribute("aria-label", button.querySelector(".aria-label").innerText)
      } else {
        button.setAttribute("aria-label", "button")
      }
    }
  })
}

let link = document.querySelectorAll("a");

if (link) {
  link.forEach(anchor => {
    let text = anchor.innerText;
    if (!anchor.hasAttribute("aria-label") || anchor.getAttribute("aria-label") == "") {
      if (text) {
        anchor.setAttribute("aria-label", text)
      } else if (anchor.querySelector(".aria-label")) {
        anchor.classList.add("inline-flex")
        anchor.setAttribute("aria-label", anchor.querySelector(".aria-label").innerText)
      } else {
        anchor.setAttribute("aria-label", "link")
      }
    }
    if (anchor.querySelector("button")) {
      anchor.querySelector("button").setAttribute("tabindex", "-1")
    }
    if (!anchor.hasAttribute("href") || anchor.getAttribute("href") == "") {
      anchor.setAttribute("href", "#")
    }
  })
}

let ariaDropdown = document.querySelectorAll("[aria-controls]")

if (ariaDropdown) {
  ariaDropdown.forEach(dropdown => {
    dropdown.setAttribute("aria-expanded", "false");
    let dropdownId = dropdown.getAttribute("aria-controls")
    let dropdownDiv = document.querySelector(`#${dropdownId}`)
    // Accessible Mega Menu
    if (dropdown.classList.contains("aria-hidden")) {
      dropdown.classList.add("aria-hidden-active")
      dropdownDiv.querySelectorAll("a,button,iframe,input,textarea").forEach(item => {
        item.setAttribute("tabindex", "-1")
      })
      window.addEventListener("keyup", (e) => {
        if (e.key == "Escape") {
          dropdown.classList.add("aria-hidden-active")
          if (dropdown.classList.contains("aria-hidden-active")) {
            dropdownDiv.querySelectorAll("a,button,iframe,input,textarea").forEach(item => {
              item.setAttribute("tabindex", "-1")
            })
          }
        }
      })
    }

    dropdown.addEventListener("click", (e) => {
      if (dropdown.hasAttribute("aria-expanded") || dropdown.getAttribute("aria-expanded") == "") {
        if (dropdown.getAttribute("aria-expanded") == "true") {
          dropdown.setAttribute("aria-expanded", "false")
          if (dropdown.classList.contains("aria-hidden")) {
            dropdown.classList.add("aria-hidden-active")
          }
        } else {
          dropdown.setAttribute("aria-expanded", "true")
          if (dropdown.classList.contains("aria-hidden")) {
            dropdown.classList.remove("aria-hidden-active")
          }
        }

        // Accessible Mega Menu

        if (dropdown.getAttribute("id") == "nav_mobile_btn") {
          if (dropdown.classList.contains("aria-hidden-active")) {
            dropdownDiv.querySelectorAll("a,button").forEach(item => {
              item.setAttribute("tabindex", "-1")

            })
          } else {
            dropdownDiv.querySelectorAll("#nav_right a,#nav_right button").forEach(item => {

              item.setAttribute("tabindex", "-1")
            })
            let dropdownLeftItems = dropdownDiv.querySelectorAll("#nav_left a,#nav_left button")
            dropdownLeftItems.forEach((item, index) => {
              item.setAttribute("tabindex", "0")
              dropdownLeftItems[0].focus();
            })
          }
        } else {
          if (dropdown.classList.contains("aria-hidden-active")) {
            dropdownDiv.querySelectorAll("a,button,iframe,input,textarea,.filter-check-box,.checkbox-input,.filter-summary").forEach(item => {
              item.setAttribute("tabindex", "-1")

            })
          } else {
            let dropdownDivItems = dropdownDiv.querySelectorAll("a,button,iframe,input,textarea,.filter-check-box,.checkbox-input,.filter-summary")
            dropdownDivItems.forEach(item => {
              item.setAttribute("tabindex", "0")
              dropdownDivItems[0].focus();
            })
          }
        }

      }
    })

  })

}

// Intersection Observer

const animationSection = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle("sectionanimation", entry.isIntersecting)
    if (entry.isIntersecting) observer.unobserve(entry.target)
  })
})
animationSection.forEach(section => {
  observer.observe(section);
})


// Product Question Form

let questionBtn = document.querySelector(".question_btn");

if (questionBtn) {
  let questionForm = document.querySelector(".question_form")
  let questionClose = questionForm.querySelectorAll(".question_close")
  questionBtn.addEventListener("click", (e) => {
    questionForm.classList.add("modal_active")
  })

  questionClose.forEach(btn => {

    btn.addEventListener("click", (e) => {
      questionForm.classList.remove("modal_active")
    })
  })
  window.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      questionForm.classList.remove("modal_active")
    }
  })
}


// Input Secondary

let inputSecondary = document.querySelectorAll(".input_secondary")

if (inputSecondary) {
  inputSecondary.forEach(input => {
    let inputInner = input.querySelector("input")
    document.addEventListener("click", (e) => {
      if (e.target == inputInner) {
        input.style.outlineWidth = "1px"
      } else {
        input.style.outlineWidth = "0px"
      }
    })

  })
}

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


// Accessibility Focused

let isFocused = document.querySelectorAll(".isFocused");

isFocused.forEach(item => {
  item.querySelectorAll("a,button").forEach(el => {
    el.addEventListener("focus", (e) => {
      if (document.activeElement == e.target) {
        if (item.classList.contains("product_item_bottom")) {
          item.style.opacity = "1"
        } else if (item.classList.contains("collection_card_button")) {
          item.style.opacity = "1"
          item.style.transform = "scale(1)"
        } else {
          item.style.opacity = "1"
        }
      }
    })
  })
})


// complementary products
if (document.querySelector('.product-complementary')) {
  const handleIntersection = (entries, observer) => {
    if (!entries[0].isIntersecting) return;

    observer.unobserve(productRecommendationsSection);

    const url = productRecommendationsSection.dataset.url;

    fetch(url)
      .then(response => response.text())
      .then(text => {
        const html = document.createElement('div');
        html.innerHTML = text;
        const recommendations = html.querySelector('.product-complementary');

        if (recommendations && recommendations.innerHTML.trim().length) {
          productRecommendationsSection.innerHTML = recommendations.innerHTML;
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const productRecommendationsSection = document.querySelector('.product-complementary');
  const newObserver = new IntersectionObserver(handleIntersection, { rootMargin: '0px 0px 200px 0px' });

  newObserver.observe(productRecommendationsSection);
}



// Quantity Update
// const cartBtns = document.querySelectorAll('.quantity-counter-main .button');
// const cartInputs = document.querySelectorAll('#inventoryQuantityData');
// let form = document.querySelector('.cart-form-main');
// cartInputs.forEach(input => {
//   let maxMsg = document.createElement("small")
//   maxMsg.textContent = "Max limit"
//   input.parentElement.append(maxMsg)
//   let key = input.parentElement.closest(".cart-item-main").getAttribute("data-key")
//   input.addEventListener("change", (e) => {
//     changeItemQuantity(key, e.target.value)
//   })
// })

// cartBtns.forEach((btn) => {
//   const input = btn.parentElement.querySelector("input")

//   btn.addEventListener('click', (e) => {
//     const isPlus = btn.classList.contains("plus");
//     const value = Number(input.value)
//     let max = input.getAttribute("max")
//     const key = btn.closest(".cart-item-main").getAttribute("data-key")

//     if (isPlus) {
//       let newValue = ""
//       if (value < max) {
//         newValue = value + 1
//       } else {
//         input.parentElement.querySelector("small").style.opacity = "1"
//         newValue = max
//       }
//       input.value = newValue
//       changeItemQuantity(key, newValue)
//     } else if (value > 1) {
//       const newValue = value - 1
//       if (input.parentElement.querySelector("small")) {
//         input.parentElement.querySelector("small").style.opacity = "0"
//       }
//       input.value = newValue
//       changeItemQuantity(key, newValue)
//     }
//   });
// });

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

// Fliter click event

function filterButtonClick() {
  let filterBtns = document.querySelectorAll('.filter-check-box,.checkbox-input');

  if (filterBtns) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('keyup', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          btn.querySelector('input').click();
        }
      });
    });
  }
}

filterButtonClick();

function featuredSwiper() {
  let divs = document.querySelectorAll(".featured_product_section")

  divs.forEach((div, index) => {

    div.querySelector(".singleProductThumbs").setAttribute("data-index", index)
    div.querySelector(".singleProductSwiper").setAttribute("data-index", index)

    const swiperSingleThumbs = new Swiper(`.singleProductThumbs[data-index='${index}']`, {
      slidesPerView: div.querySelector(".singleProductThumbs").getAttribute("data-col"),
      spaceBetween: 10,
      freeMode: true,
      watchSlidesProgress: true,
    });
    const swiperSingle = new Swiper(`.singleProductSwiper[data-index='${index}']`, {
      slidesPerView: 1,
      spaceBetween: 20,
      observer: true,
      observeParents: true,
      loop: false,
      navigation: {
        nextEl: '.singleProductSwiper .swiper-button-next',
        prevEl: '.singleProductSwiper .swiper-button-prev',
      },
      autoplay: {
        delay: 3000,
      },
      thumbs: {
        swiper: swiperSingleThumbs,
      },
    });

    // Variant Option for Slider

    let variantBtns = div.querySelectorAll(".product_options input[type='radio']");
    let variantDropdowns = div.querySelectorAll('select.product-variant-dropdown');

    if (variantBtns && variantDropdowns) {
      variantBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          swiperSingle.slideTo(0);
        });
      });
      variantDropdowns.forEach((select) => {
        select.addEventListener('change', (e) => {
          swiperSingle.slideTo(0);
        });
      });
    }
  })
}

featuredSwiper();
