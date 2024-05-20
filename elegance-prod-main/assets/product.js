var productVar,
    timeout,
    isSticky = true,
    productRecommendation = {
        init: function () {
            $(".product-recommendations").length > 0 &&
                $.ajax({
                    type: "GET",
                    url: `/recommendations/products?section_id=product-recommendations&limit=4&product_id=${$(".product-recommendations").attr("data-product-id")}`,
                    dataType: "html",
                    success: function (o) {
                      if($(o).html().trim() != '')
                      {
                        $(".product-recommendations").html(`<div class="pure-g">${$(o).html()}</div>`);
                        $(".related-product").show();
                        var selectors = {
                          button: '.collection-info [button-wishlist]',
                        };
                        var buttons = document.querySelectorAll(selectors.button) || [];
  						if (buttons.length) setupButtons(buttons);
                        let compare_products = [];
                        $(".add-to-compare").click(function () {
                          $(".compare-bar").addClass("show-compare-bar"),
                            $.getJSON(`/products/${$(this).attr("data-product")}.js`, function (e) {
                            $(".compare-bar-content-left ul").append(`<li><img alt="Product Image" src="${e.featured_image}"><span class="p-remove"><span></span></span></li>`),
                              compare_products.push(e);
                            let o,
                                t,
                                a = ["Name", "Description"],
                                n = [];
                            for (let e = 0; e < compare_products.length; e++) {
                              let o = {};
                              if (((o.Name = compare_products[e].title), (o.Description = compare_products[e].description), compare_products[e].options.findIndex((e) => "Title" === e.name) < 0))
                                for (let t = 0; t < compare_products[e].options.length; t++)
                                  a.includes(compare_products[e].options[t].name) || a.push(compare_products[e].options[t].name), (o[compare_products[e].options[t].name] = compare_products[e].options[t].values);
                              (o.Image = compare_products[e].featured_image), (o.Price = Shopify.formatMoney(compare_products[e].price)), n.push(o);
                            }
                            a.push("Price");
                            for (let e = 0; e < a.length; e++) o = `${o}<th>${a[e]}</th>`;
                            $(".product-compare-header").html(o);
                            for (let e = 0; e < n.length; e++) {
                              (t = `${(t = `${(t = `${t}<tr>`)}<td class="product-show"><img alt="Product Show" src="${n[e].Image}"><span>${n[e].Name}</span></td>`)}<td>${n[e].Description}</td>`);
                              for (let o = 2; o < a.length - 1; o++) t = a[o] in n[e] ? `${t}<td>${n[e][a[o]]}</td>` : `${t}<td>N/A</td>`;
                              t = `${t}<td>${n[e].Price}</td></tr>`;
                            }
                            $(".product-list").html(t);
                          });
                        });
                        $(".compare-close").click(function () {
                          $(".compare-bar").removeClass("show-compare-bar");
                        });
                        $(".comp-btn").click(function () {
                          $(".product-modal").addClass("show-product-modal");
                        });
                      	animationsScrollMagic();
                      }
                    },
                });
        },
    },
    sizeChart = {
        init: function () {
            $(".size-chart-selector").click(function () {
                $(".size-chart-modal").addClass("show-modal");
            }),
                $(".close-modal").click(function () {
                    $(".size-chart-modal").removeClass("show-modal");
                });
        },
    },
    productAccordian = {
        init: function () {
            $(".slide").hide(),
                $("#accordion")
                    .find("div[role|='button']")
                    .click(function () {
                        $("#accordion").find("div[role|='button']").removeClass("active"), $(".slide").slideUp("fast"), $(this).next(".slide").is(":hidden") && ($(this).next(".slide").slideDown("fast"), $(this).toggleClass("active"));
                    });
        },
    };
function checkIfJqueryLoaded() {
    if(window.jQuery && typeof isFunctionJsFileLoaded != "undefined" && typeof isSwiperLoaded != "undefined")
    {
      productCallback();
    }
}
function callParallax(o) {
    parallaxIt(o, ".product-block-image-wrapper img", -1e3);
}
function parallaxIt(o, t, e) {
    var i = $(".product-block-image-wrapper"),
        n = o.pageY - i.offset().top;
    TweenMax.to(t, 1, { y: ((n - i.height() / 2) / i.height()) * e, ease: Power2.easeOut });
}
function sticky_relocate() {
    $(document).find(".single-product form").offset().top;
    var o = $(".single-product"),
        t = ($(".single-product form"), o.offset().top),
        e = $(".related-product .collection-info").offset().top - $(".single-product-info").height();
    $(document).scroll(function () {
        if (screen.width > 768) {
            var o = $(this).scrollTop();
            (e = $(".related-product .collection-info").offset().top - $(".single-product-info").height()),
                o > t ? (jQuery(".single-product-info").addClass("stick"), o > e ? jQuery(".single-product-info").css("top", e - o) : jQuery(".single-product-info").css("top", 0)) : jQuery(".single-product-info").removeClass("stick");
        }
      	if($(document).find('.sticky-bar-wrapper').length > 0)
        {
          if(!isScrolledIntoView($(".single-product-info .top-btn-wrapper")))
          {
            $('.sticky-bar-wrapper').addClass('show-sticky-bar');
          }
          else
          {
            $('.sticky-bar-wrapper').removeClass('show-sticky-bar');
          }
        }
      	if(isSticky && $(window).scrollTop() >= $('.single-product-info form').offset().top + $('.single-product-info form').outerHeight() - window.innerHeight) {
          isSticky = false;
          $('.single-func-btns').removeClass('sticky-mob');
        }
      	if(isSticky == false && $(window).scrollTop() < $('.single-product-info form').offset().top + $('.single-product-info form').outerHeight() - window.innerHeight)
        {
          isSticky = true;
          $('.single-func-btns').addClass('sticky-mob');
        }
    });
}
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function productCallback() {
    clearInterval(productVar),
        setTimeout(function () {
            productRecommendation.init(),
                sizeChart.init(),
                productAccordian.init(),
//                 isAnimationEnabled ? animationsScrollMagic() : null,
                sticky_relocate(),
                (productZoomSlider = new Swiper(".slider-product-zoom", {
                    slidesPerView: "auto",
                    pagination: { el: ".slider-product-zoom .swiper-pagination", type: "fraction" },
                    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
                })),
                new Swiper(".product-slider-full", { slidesPerView: "auto", pagination: { el: ".product-slider-full .swiper-pagination", type: "fraction" }, navigation: { nextEl: ".product-single-next", prevEl: ".product-single-prev" } });
        }, 500),
        $(".review-block").click(function () {
            $("html,body").animate({ scrollTop: $(".review-section").offset().top }, "slow");
        }),
        jQuery(".product-photos").click(function () {
            productZoomSlider.slideTo($(this).index()),
                setTimeout(function () {
                    jQuery(".single-product-zoom").addClass("product-zoom-open");
                }, 300);
        }),
        jQuery(".p-zoom-item").click(function () {
            jQuery(this).toggleClass("p-zoom-in");
        }),
        jQuery(".remove").click(function () {
            setTimeout(function () {
                jQuery(".single-product-zoom").removeClass("product-zoom-open");
            }, 200);
        });
        jQuery(document).on('change', '.product-select-sticky', function(){
          jQuery('.sticky-bar-wrapper .input-number').attr('value', 1);
          jQuery('.sticky-bar-wrapper .input-number').attr('max', jQuery(this).find('option:selected').attr('data-quantity'));
          jQuery('.product-det p').text(jQuery(this).find('option:selected').attr('data-price'));
        });
        jQuery(document).on('click', '.sticky-add-to-cart', function(){
          let productData = {
            quantity: 1,
            id: jQuery('.sticky-bar-wrapper .product-select-sticky').val()
          };
          addToCartAjax(productData, event, {'cart_drawer': 'open'});
        });
  		jQuery(document).on('click', '.sticky-buy-now', function(){
          let productData = {
            quantity: 1,
            id: jQuery('.sticky-bar-wrapper .product-select-sticky').val()
          };
          addToCartAjax(productData, event, {'redirect_to_checkout': true, purpose: ''});
        });
  		jQuery(document).on('click', '.call-to-quote', function(){
          jQuery('.offer-modal').addClass('show-modal');
          jQuery('.catalogue-modal input[name="contact[product]"]').val($('.single-product-right h4').text().trim());
        });
//   		jQuery('.single-product-inner').on('scroll', function() {
//             if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
//                 console.log('end reached');
//             }
//         });
//   		$(window).bind('scroll', function() {
//             if($(window).scrollTop() >= $('.single-product-inner').offset().top + $('.single-product-inner').outerHeight() - window.innerHeight) {
//                 console.log('end reached');
//             }
//         });
}
function myImgscroll(o) {
    (o /= 3), $(".product-block-image-wrapper img").css({ transform: "translate(0%, " + -o + "%)" });
}
window.addEventListener("DOMContentLoaded", (o) => {
    productVar = setInterval(checkIfJqueryLoaded, 200);
});
