if(document.querySelector("#cartDrawer")){
    let cartClose = document.querySelector("#cartClose")
    let cartBtn = document.querySelectorAll(".cart_drawer_btn")
    let cartDrawer = document.querySelector("#cartDrawer")
    if(cartBtn){
        cartBtn.forEach(btn=>{
          btn.addEventListener("click",(e)=>{
              cartDrawer.classList.toggle("hidden")
          })
        })
        cartClose.addEventListener("click",(e)=>{
            cartDrawer.classList.add("hidden")
        })
        document.addEventListener("keyup",(e)=>{
          if(e.key === "Escape" ) {
            cartDrawer.classList.add("hidden")
          }
        })    
    }
}

// Page Loader

window.addEventListener("load",(e)=>{
    let pageLoader = document.querySelector("#page_loader")
    if(pageLoader){
      pageLoader.classList.add("hidden")
      pageLoader.classList.remove("flex")
    }
  })

// Format Money

let formatMoney = function(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.',''); }
    let value = '';
    let placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    let formatString = (format || this.money_format);
  
    function defaultOption(opt, def) {
       return (typeof opt == 'undefined' ? def : opt);
    }
  
    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal   = defaultOption(decimal, '.');
  
      if (isNaN(number) || number == null) { return 0; }
  
      number = (number/100.0).toFixed(precision);
  
      let parts   = number.split('.'),
          dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
          cents   = parts[1] ? (decimal + parts[1]) : '';
  
      return dollars + cents;
    }
  
    switch(formatString.match(placeholderRegex)[1]) {
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

  if(goTopBtn){
    goTopBtn.addEventListener("click",(e)=>{
      document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
    })
  }
  // Swiper 

let productSlider = document.querySelectorAll(".productSwiper");


  if(productSlider){
    sliderNum = 1
    productSlider.forEach(slider=>{
      sliderNum++
 
      slider.setAttribute("id",`product-swiper-${sliderNum}`)
      let sliderId = slider.getAttribute("id")

      const productSwiper = new Swiper(`#${sliderId}`, {
       slidesPerView: document.getElementById(`${sliderId}`).getAttribute('data-col'),
       spaceBetween: 20,
       allowTouchMove:false,
       navigation: {
         nextEl: '.productSwiper > .product-btn .swiper-button-next',
         prevEl: '.productSwiper > .product-btn .swiper-button-prev',
       },
      //  autoplay: {
      //    delay: 3000,
      //  },
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

  let blogSwiper = document.querySelectorAll('.homeBlogSwiper');

  if(blogSwiper){
    sliderNum = 0
    blogSwiper.forEach(slider=>{
      sliderNum++
      slider.setAttribute("id",`blog-swiper-${sliderNum}`)
      let sliderId = slider.getAttribute("id")
    
window.addEventListener("load",(e)=>{
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

 // Swiper

 let itemSlideActive = false

 document.querySelectorAll(".productSwiper .swiper-slide").forEach(slide=>{
   slide.addEventListener("mouseenter",(e)=>{
    //  itemSlideActive = {
    //   delay:2000
    //  }
     
    })
    slide.addEventListener("mouseleave",(e)=>{
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
if(collectionSection){
  collectionSection.forEach(section => {
    let productSingle = section.querySelectorAll('.product_item_main[data-slider]')
    productSingle.forEach((item,index) => {  
        item.querySelectorAll("input[type='radio']").forEach((radio) => {
          radio.addEventListener('change', () => {      
            if(productItemSlider){
             productItemSlider[index].slideTo(0)
            }
          })
        })    
    })
  })
}


let chartBtn = document.querySelector(".chart_btn")
if(chartBtn){
  let chartModal = document.querySelector(".chart_modal")
  let chartClose = document.querySelector(".chart_close")
  chartBtn.addEventListener("click",(e)=>{
      chartModal.classList.add("chart_active")
  })
  chartClose.addEventListener("click",(e)=>{
    chartModal.classList.remove("chart_active")
})
}

let secondaryIcon = document.querySelectorAll(".newIcon");

if(secondaryIcon){
  secondaryIcon.forEach(icon=>{
    let iconSrc = icon.getAttribute("data-icon")
    let string = `{% render '${iconSrc}' %}`
    icon.innerHTML = string;
  })
}


// SEO & Accessibility

let img = document.querySelectorAll("img");

if(img){
  img.forEach(image=>{
    if(image.hasAttribute("alt") && image.getAttribute("alt") == ""){
      image.setAttribute("alt","image")
    }
  })
}

let allBtn = document.querySelectorAll("button");

if(allBtn){
  allBtn.forEach(button=>{
    let text = button.innerText;
    if(!button.hasAttribute("aria-label") || button.getAttribute("aria-label") == ""){
      if(text){
        button.setAttribute("aria-label",text)
      }else if(button.querySelector(".aria-label")){
        button.setAttribute("aria-label",button.querySelector(".aria-label").innerText)
      }else{
        button.setAttribute("aria-label","button")
      }
    }
  })
}

let link = document.querySelectorAll("a");

if(link){
  link.forEach(anchor=>{
    let text = anchor.innerText;
    if(!anchor.hasAttribute("aria-label") || anchor.getAttribute("aria-label") == ""){
      if(text){
        anchor.setAttribute("aria-label",text)
      }else if(anchor.querySelector(".aria-label")){       
        anchor.classList.add("inline-flex")    
        anchor.setAttribute("aria-label",anchor.querySelector(".aria-label").innerText)
      }else{
        anchor.setAttribute("aria-label","link")
      }
    }
    if(anchor.querySelector("button")){
      anchor.querySelector("button").setAttribute("tabindex","-1")
    }
    if(!anchor.hasAttribute("href") || anchor.getAttribute("href") == ""){
      anchor.setAttribute("href","#")
    }
  })
}

let ariaDropdown = document.querySelectorAll("[aria-controls]")

if(ariaDropdown){
  ariaDropdown.forEach(dropdown=>{
    dropdown.setAttribute("aria-expanded","false")
    dropdown.addEventListener("click",(e)=>{
      if(dropdown.hasAttribute("aria-expanded") || dropdown.getAttribute("aria-expanded") == ""){
        if(dropdown.getAttribute("aria-expanded") == "true"){
          dropdown.setAttribute("aria-expanded","false")
        }else{
          dropdown.setAttribute("aria-expanded","true")        
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
    if(entry.isIntersecting) observer.unobserve(entry.target)
  })
})
animationSection.forEach(section => {
  observer.observe(section);
})