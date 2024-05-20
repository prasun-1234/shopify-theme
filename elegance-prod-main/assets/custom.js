function cartMoneyFormat(cents, format) {
    if (typeof cents == 'string') { cents = cents.replace('.', ''); }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || this.money_format);

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) { return 0; }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.'),
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

for (
    var galleryThumbs,
    quickViewSwiper,
    quickViewGalleryThumbs,
    ClickedElement,
    screensize,
    root = document.documentElement,
    body = document.body,
    pages = document.querySelectorAll(".story-hero-image"),
    tiles = document.querySelectorAll(".story-zoom-image"),
    i = 0;
    i < tiles.length;
    i++
)
    addListeners(tiles[i], pages[i]);
i = 115;
var loopTime,
    seconds = 0,
    timerStarted = !1;
function timer() {
    t = setTimeout(add, 1e3);
}
function add() {
    ++seconds >= 60 && (seconds = 0), timer();
}
function myLoop() {
    setTimeout(function () {
        $(".circle-svg__circle-1").attr("stroke-dashoffset", i),
            timerStarted || ((timerStarted = !0), timer()),
            --i >= 0
                ? myLoop()
                : ((i = 115),
                    myLoop(),
                    clearTimeout(t),
                    (timerStarted = !1),
                    (seconds = 0),
                    setTimeout(function () {
                        homeSlider.slideNext();
                    }, 200));
    }, loopTime);
}
function addListeners(e, o) {
    e.addEventListener("click", function () {
        ClickedElement = "tile";
    }),
        o.addEventListener("click", function () {
            ClickedElement = "page";
        });
}
function animateHero(e, o) {
    var t = e.cloneNode(!0),
        a = calculatePosition(e),
        n = calculatePosition(o);
    "tile" == ClickedElement ? o.classList.add("open") : e.classList.remove("open"), TweenLite.set([e, o], { visibility: "hidden" }), TweenLite.set(t, { position: "absolute", margin: 0 }), body.appendChild(t);
    var i = {
        x: n.left - a.left,
        y: n.top - a.top,
        width: n.width,
        height: n.height,
        autoRound: !1,
        ease: Power1.easeOut,
        onComplete: function () {
            TweenLite.set(o, { visibility: "visible" }), body.removeChild(t);
        },
    };
    TweenLite.set(t, a), TweenLite.to(t, 0.3, i);
}
function calculatePosition(e) {
    var o = e.getBoundingClientRect(),
        t = window.pageYOffset || root.scrollTop || body.scrollTop || 0,
        a = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0,
        n = root.clientTop || body.clientTop || 0,
        i = root.clientLeft || body.clientLeft || 0;
    return { top: Math.round(o.top + t - n), left: Math.round(o.left + a - i), height: o.height, width: o.width };
}
$(".clear-btn").click(function () {
    $(".compare-bar-content-left .p-remove").each(function () {
        $(this).click();
    }),
        $(".compare-bar").removeClass("show-compare-bar");
    compare_products = [];
    $('.add-to-compare').each(function (index, element) {
        $(element).prop('disabled', false);
    });
    $('.compare-bar-content-left ul').html('');
}),
    $(".mobile-menu-close").click(function () {
        $(".header_main").removeClass("header-mobile-open");
    }),
    $(".circle-svg__circle-1").length > 0 && myLoop();
var homeSlider,
    myVar,
    scrollBar;
slider = {
    init: function () {
        var e;
        slider.home(), slider.product(), slider.featuredProduct(), (e = new Swiper(".story-hero-wrapper", { slidesPerView: 3, speed: 2400, autoplay: !1 }));
        let o = { x: 1e3 },
            t = { x: 0, ease: Power2.easeOut };
        TweenMax.fromTo($(".story-hero-image:eq(2)"), 0.6, o, t),
            TweenMax.fromTo($(".story-hero-image:eq(1)"), 0.8, o, t),
            (t = {
                x: 0,
                ease: Power2.easeOut,
                onComplete: function () {
                    e = new Swiper(".story-hero-wrapper", {
                        slidesPerView: 3,
                        speed: 2400,
                        loop: !0,
                        autoplay: { delay: 0 },
                        breakpoints: { 1028: { slidesPerView: 3, spaceBetween: 20 }, 480: { slidesPerView: 2, spaceBetween: 20 }, 320: { slidesPerView: 1, spaceBetween: 20 } },
                    });
                },
            }),
            TweenMax.fromTo($(".story-hero-image:eq(0)"), 1, o, t),
            $(".story-hero-wrapper").on("mouseenter", function (o) {
                e.autoplay.stop();
            }),
            $(".story-hero-wrapper").on("mouseleave", function (o) {
                e.autoplay.start();
            });
        var swiper = new Swiper(".demo-slider ", { direction: "horizontal", slidesPerView: 3, spaceBetween: 30, mousewheelControl: !0, pagination: { el: ".demo-slider .swiper-pagination", clickable: !0 } }),
            abtext = new Swiper(".ab-text-slider", { slidesPerView: "auto", speed: 500, loop: !0, autoplay: { delay: 8e3 }, navigation: { nextEl: ".ab-text-slider .swiper-button-next", prevEl: ".ab-text-slider .swiper-button-prev" } });

    },
    home: function () {
        $(".home-slider").length &&
            ((homeSlider = new Swiper(".home-slider", {
                slidesPerView: 1,
                parallax: true,
                speed: 1200,
                loop: true,
                pagination: { el: ".home-slider .swiper-pagination-el", type: "fraction" },
                navigation: { nextEl: ".home-slider .swiper-button-next", prevEl: ".home-slider .swiper-button-prev" },
                on: {
                    init: function () {
                        setTimeout(function () {
                            $(".swiper-pagination-el").addClass("swiper-pagination");
                        }, 500);
                    },
                },
            })).on("slideChange", function () {
                changeAutoplay();
            }),
                homeSlider.init()),
            $(".testimonial-section").length > 0 &&
            new Swiper(".testimonial-section .single-slide", {
                slidesPerView: "auto",
                loop: !0,
                pagination: { el: ".testimonial-section .swiper-pagination", clickable: !0 },
                navigation: { nextEl: ".testimonial-section .swiper-button-next", prevEl: ".testimonial-section .swiper-button-prev" },
                breakpoints: { 1920: { slidesPerView: 1, spaceBetween: 30 }, 1028: { slidesPerView: 1, spaceBetween: 30 }, 480: { slidesPerView: 2, spaceBetween: 20 }, 320: { slidesPerView: 1, spaceBetween: 10 } },
            }),
            $(".testimonial-section").length > 0 &&
            new Swiper(".testimonial-section .multi-slide", {
                slidesPerView: "auto",
                loop: !0,
                pagination: { el: ".testimonial-section .swiper-pagination", clickable: !0 },
                navigation: { nextEl: ".testimonial-section .swiper-button-next", prevEl: ".testimonial-section .swiper-button-prev" },
                breakpoints: { 1920: { slidesPerView: 2, spaceBetween: 30 }, 1028: { slidesPerView: 2, spaceBetween: 30 }, 480: { slidesPerView: 2, spaceBetween: 20 }, 320: { slidesPerView: 1, spaceBetween: 10 } },
            }),
            new Swiper(".template-index .logo-slider", {
                slidesPerView: $(".template-index .logo-slider").attr("data-count"),
                speed: 1200,
                loop: true,
                autoplay: { delay: 2000 },
                pagination: { el: ".home-slider .swiper-pagination", type: "fraction" },
                navigation: { nextEl: ".home-slider .swiper-button-next" },
                breakpoints: { 1024: { slidesPerView: $(".template-index .logo-slider").attr("data-count"), spaceBetween: 30 }, 480: { slidesPerView: 1, spaceBetween: 10 }, 0: { slidesPerView: 1, spaceBetween: 10 } },
            })
    },
    product: function () {
        (galleryThumbs = new Swiper("body .gallery-thumbs", { slidesPerView: 4, spaceBetween: 10, freeMode: !0, watchSlidesVisibility: !0, watchSlidesProgress: !0 })),
            (swiper = new Swiper("body .gallery-top", {
                slidesPerView: "auto",
                touchRatio: 1,
                allowTouchMove: !1,
                followFinger: !1,
                shortSwipes: !0,
                longSwipes: !1,
                pagination: { el: ".gallery-top .swiper-pagination", clickable: !0 },
                navigation: { nextEl: ".gallery-top .swiper-button-next", prevEl: ".gallery-top .swiper-button-prev" },
                thumbs: { swiper: galleryThumbs },
                on: {
                    init: function () {
                        setTimeout(function () {
                            singleProduct.changeSliderImage($("#product-select option:selected").attr("data-image")),
                                $(".swiper-container.gallery-top").css("opacity", "1"),
                                setTimeout(function () {
                                    $(".swiper-container.gallery-thumbs").css("opacity", "1");
                                }, 200);
                        }, 200);
                    },
                },
            })),
            new Swiper("body .product-images-small", {
                slidesPerView: "auto",
                touchRatio: 1,
                allowTouchMove: !1,
                followFinger: !1,
                shortSwipes: !0,
                longSwipes: !1,
                navigation: { nextEl: ".single-product-mob .swiper-button-next", prevEl: ".single-product-mob .swiper-button-prev" },
            });
    },
    instagram: function () {
        $(".swiper-instagram").each(function () {
            new Swiper(".swiper-instagram", {
                slidesPerView: "auto",
                loop: !0,
                slidesPerView: 4,
                pagination: { el: $(this).find(".swiper-instagram .swiper-pagination"), clickable: !0 },
                navigation: { nextEl: $(this).find(".swiper-instagram .swiper-button-next"), prevEl: $(this).find(".swiper-instagram .swiper-button-prev") },
            });
        });
    },
    featuredProduct: function () {
        var Swipes = new Swiper(".featured-product-section .swiper-container", { loop: !0, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, pagination: { el: ".featured-product-section .swiper-pagination" } });
    }
},
    singleProduct = {
        init: function () {
            singleProduct.changeVariant(), singleProduct.showOnlyAvailableOptionsWithCurrentOption();
        },
        changeVariant: function () {
            let e = "";
            $(document).on("change", ".single-option-selector", function () {
                (e = ""),
                    singleProduct.setOption($(this)),
                    (variant_selector = singleProduct.variantSelector($(this))),
                    singleProduct.selectProductVariant(variant_selector, $(this)),
                    $(this).closest(".single-product").find(".stock-avail").hide();
            }),
                $(document).on("change", ".radio-wrapper .single-radio-selector", function () {
                    (e = ""),
                        $(this).closest(".variant-option-select").find(".single-radio-selector").removeClass("variant-select option-selected"),
                        $(this).addClass("variant-select option-selected"),
                        (e = singleProduct.selectedRadioValue(e, $(this))),
                        (e = singleProduct.selectedColor(e, $(this))),
                        (0 != $(this).closest(".variant-option-select").index() && 1 != $(this).closest(".variant-option-select").index()) ||
                        singleProduct.showOnlyAvailableOptionsWithCurrentOption($(this), $(this).closest(".variant-option-select").index()),
                        (e = singleProduct.getOptionSelector($(this))),
                        singleProduct.selectProductVariant(e, $(this)),
                        $(this).closest(".single-product").find(".stock-avail").hide();
                }),
                $(document).on("click", ".color-block .change-product-color", function () {
                    singleProduct.setOption($(this)),
                        (variant_selector = singleProduct.variantSelector($(this))),
                        singleProduct.selectProductVariant(variant_selector, $(this)),
                        $(this).closest(".single-product").find(".stock-avail").hide();
                });
        },
        getOptionSelector: function (e) {
            let o = e.closest(".single-product"),
                t = "";
            return (
                o.find(".option-selected").each(function (e, o) {
                    (t = `${t}[data-${$(o).attr("data-option")}='${$(o).attr("data-value")}']`);
                }),
                t
            );
        },
        selectProductVariant: function (e, o) {
            let t = o.closest(".single-product"),
                a = t.find(`#product-select option${e}`).val();
            let n = t.find(`#product-select option[value='${a}']`);
            t.find("#product-select option:selected").prop("selected", !1),
                t.find(`#product-select option[value='${a}']`).prop("selected", !0),
                t.find(".product-price").text(n.attr("data-price")),
                themFunction.inputNumberUpdate(t.find(".quantity-view .input-number"), n.attr("data-quantity")),
                themFunction.inputNumberReset(t.find(".quantity-view .input-number"), 1);
            var i = t.find('.option-selected[data-option="option1"]').attr("data-value"),
                l = t.find('.option-selected[data-option="option2"]').attr("data-value"),
                s = t.find('.option-selected[data-option="option3"]').attr("data-value");
            let r = i;
            null != l && "" != l && (r = `${i}, ${l}`),
                null != s && "" != s && (r = `${i}, ${l}, ${s}`),
                t.find(".varient-names").text(`${r}`),
                a && "true" == n.attr("data-available")
                    ? (t.find(".product-sold-out").hide(), t.find(".product-add").show(), t.find(".product-buy").show())
                    : (t.find(".product-add").hide(), t.find(".product-buy").hide(), t.find(".product-sold-out").show()),
                singleProduct.changeSliderImage(n.attr("data-image")),
                quickViewProduct.changeSliderImage(n.attr("data-quick-view-image"));
        },
        selectedColor: function (e, o) {
            if (o.closest(".single-product").find(".change-product-color").length > 0) {
                let t = o.closest(".single-product").find(".color-block .change-product-color.color-selected");
                e = `${e}[data-${t.attr("data-option")}='${t.attr("data-value")}']`;
            }
            return e;
        },
        selectedOptionValue: function (e, o) {
            if (o.closest(".single-product").find(".single-option-selector").length > 0) {
                let t = o.closest(".single-product").find(".single-option-selector");
                e = `${e}[data-${t.attr("data-option")}='${t.val()}']`;
            }
            return e;
        },
        selectedRadioValue: function (e, o) {
            if (o.closest(".single-product").find(".single-radio-selector").length > 0) {
                let t = o.closest(".single-product").find(".radio-wrapper .single-radio-selector.variant-select");
                e = `${e}[data-${t.attr("data-option")}='${t.val()}']`;
            }
            return e;
        },
        setOption: function (e) {
            $(e).closest(".variant-option-select").find(".option-selected").removeClass("option-selected color-selected"),
                $(e)[0].outerHTML.includes("select") && $(e).find("option:selected").addClass("option-selected"),
                $(e)[0].outerHTML.includes("button") && $(e).addClass("option-selected color-selected");
        },
        variantSelector: function (e) {
            let o = "";
            return (
                $(e)
                    .closest(".product-block-wrapper")
                    .find(".variant-option-select")
                    .each(function (e, t) {
                        let a = $(t).find(".option-selected").attr("data-option"),
                            n = $(t).find(".option-selected").attr("data-value");
                        (o = `${o}[data-${a}='${n}']`);
                    }),
                o
            );
        },
        showOnlyAvailableOptionsWithCurrentOption: function (e = null, o = null) {
            let t;
            var a, n;
            if (((t = null == e ? $(".single-product") : e.closest(".single-product")), 0 == o || null == o)) {
                o || (o = 0),
                    t.find(`.variant-option-select:eq(${o})`).hasClass("color-block")
                        ? ((a = `data-${t.find(`.variant-option-select:eq(${o}) .color-selected`).attr("data-option")}`),
                            (n = t.find(`.variant-option-select:eq(${o}) .color-selected`).attr("data-value")))
                        : t.find(`.variant-option-select:eq(${o})`).hasClass("radio-wrapper") &&
                        ((a = `data-${t.find(`.variant-option-select:eq(${o}) .variant-select`).attr("data-option")}`),
                            (n = t.find(`.variant-option-select:eq(${o}) .variant-select`).attr("data-value")));
                var i = [],
                    l = [],
                    s = [],
                    r = [];
                if (
                    (a &&
                        n &&
                        (t.find(`#product-select option[${a}='${n}']`).each(function (e, o) {
                            "true" == $(o).attr("data-available") &&
                                ($(o).attr("data-option2") && -1 === $.inArray($(o).attr("data-option2"), i) && i.push($(o).attr("data-option2")),
                                    $(o).attr("data-option3") && -1 === $.inArray($(o).attr("data-option3"), l) && l.push($(o).attr("data-option3")));
                        }),
                            t.find(`#product-select option[${a}='${n}']`).each(function (e, o) {
                                "false" == $(o).attr("data-available") &&
                                    ($(o).attr("data-option2") && -1 === $.inArray($(o).attr("data-option2"), s) && -1 === $.inArray($(o).attr("data-option2"), i) && s.push($(o).attr("data-option2")),
                                        $(o).attr("data-option3") && -1 === $.inArray($(o).attr("data-option3"), r) && -1 === $.inArray($(o).attr("data-option3"), l) && r.push($(o).attr("data-option3")));
                            })),
                        t.find(".variant-option-select:not(:first) .product-options").removeClass("option-available").addClass("notExist"),
                        t.find(".variant-option-select:not(:first) .product-options .options").prop("disabled", !0),
                        t.find(".variant-option-select:not(:first) .product-options .options").prop("checked", !1),
                        i.length > 0)
                ) {
                    for (let e = 0; e < i.length; e++) console.log(`${i[e]}`), t.find(`.variant-option-select:eq(1) [data-value='${i[e]}']`).closest(".product-options").addClass("option-available");
                    singleProduct.rearrangeAvailableOptions(1, t);
                }
                if (l.length > 0) {
                    for (let e = 0; e < l.length; e++) console.log(`${l[e]}']`), t.find(`.variant-option-select [data-value='${l[e]}']`).closest(".product-options").addClass("option-available");
                    singleProduct.rearrangeAvailableOptions(2, t);
                }
                if (s) {
                    for (let e = 0; e < s.length; e++) t.find(`.variant-option-select:eq(1) [data-value='${s[e]}']`).closest(".product-options").removeClass("notExist").removeClass("option-available").addClass("soldOut");
                    singleProduct.rearrangeAvailableOptions(1, t);
                }
                if (r) {
                    for (let e = 0; e < r.length; e++) t.find(`.variant-option-select:eq(2) [data-value='${r[e]}']`).closest(".product-options").removeClass("notExist").removeClass("option-available").addClass("soldOut");
                    singleProduct.rearrangeAvailableOptions(2, t);
                }
                c(t, 1);
            } else console.log(), console.log(`${o}`), c(t, o);
            function c(e, o) {
                if ((3 == e.find(".variant-option-select").length)) {
                    e.find(`.variant-option-select:eq(${o})`).hasClass("color-block")
                        ? ((a = `data-${e.find(`.variant-option-select:eq(${o}) .color-selected`).attr("data-option")}`), (n = e.find(`.variant-option-select:eq(${o}) .color-selected`).attr("data-value")))
                        : e.find(`.variant-option-select:eq(${o})`).hasClass("radio-wrapper") &&
                        ((a = `data-${e.find(`.variant-option-select:eq(${o}) .variant-select`).attr("data-option")}`), (n = e.find(`.variant-option-select:eq(${o}) .variant-select`).attr("data-value"))),
                        console.log(n);
                    let l = e.find(".variant-option-select:first .option-selected").attr("data-value");
                    var t = [],
                        i = [];
                    e.find(`#product-select option[data-option1='${l}'][${a}='${n}']`).each(function (e, o) {
                        "true" == $(o).attr("data-available")
                            ? $(o).attr("data-option3") && -1 === $.inArray($(o).attr("data-option3"), t) && t.push($(o).attr("data-option3"))
                            : $(o).attr("data-option3") && -1 === $.inArray($(o).attr("data-option3"), i) && i.push($(o).attr("data-option3"));
                    }),
                        e.find(".variant-option-select:last .product-options").removeClass("option-available").addClass("soldOut"),
                        e.find(".variant-option-select:last .options").prop("checked", !1),
                        e.find(".variant-option-select:last .options").prop("disabled", !0);
                    for (let o = 0; o < t.length; o++) console.log(`${t[o]}`), e.find(`.variant-option-select:last [data-value='${t[o]}']`).closest(".product-options").addClass("option-available");
                    singleProduct.rearrangeAvailableOptions(2, e);
                }
            }
        },
        rearrangeAvailableOptions: function (e, o) {
            o.find(`.variant-option-select:eq(${e})`).hasClass("color-block") &&
                (o.find(`.variant-option-select:eq(${e}) .options`).removeClass("color-selected option-selected"), o.find(`.variant-option-select:eq(${e}) .option-available:first .options`).addClass("color-selected option-selected")),
                o.find(`.variant-option-select:eq(${e})`).hasClass("radio-wrapper") &&
                (o.find(`.variant-option-select:eq(${e}) .options`).removeClass("variant-select option-selected"),
                    o.find(`.variant-option-select:eq(${e}) .options`).prop("checked", !1),
                    o.find(`.variant-option-select:eq(${e}) .option-available:first .options`).addClass("variant-select option-selected"),
                    o.find(`.variant-option-select:eq(${e}) .option-available .options`).prop("disabled", !1),
                    o.find(`.variant-option-select:eq(${e}) .option-available:first .options`).prop("checked", !0)),
                o.find(`.variant-option-select:eq(${e}) .option-available`).removeClass("notExist soldOut");
        },
        selectFirstAvailableOption: function (e) { },
        changeSliderImage: function (e) {
            if ($('.single-product').hasClass('p-template-one')) {
                $('.single-product .product-photos').each(function (index, element) {
                    if ($(element).find('img').attr('data-src').includes(e.split('?v')[0])) {
                        $('html, body').animate({
                            scrollTop: $(element).offset().top
                        }, 2000);
                    }
                });
            }
            else {
                $("body .single-product-left .gallery-top .swiper-slide").each(function (o, t) {
                    $(t).find("img").attr("src").includes(e.split("?v")[0]) && (console.log(o), console.log(galleryThumbs), galleryThumbs.slideTo(o, 1e3, !1), swiper.slideTo(o, 1e3, !1));
                });
            }
        },
        addToCart: function (e, o) {
            let t = $(o.target).closest(".single-product").find("#product-select").find(":selected").val(),
                a = $(o.target).closest(".single-product").find('input[name="quantity"]').val(),
                n = { items: [] };
            n.items.push({ quantity: a, id: t }),
                $(".additional-product").each(function (e, o) {
                    $(o).hasClass("selected") && n.items.push({ quantity: 1, id: $(o).attr("data-product") });
                }),
                "add-to-cart-ajax" == e
                    ? addToCartAjax(n, o, { cart_drawer: "open", purpose: "single-product" })
                    : "buy-now" == e
                        ? addToCartAjax(n, o, { redirect_to_checkout: !0, purpose: "single-product" })
                        : (window.location.href = `/cart/add?id=${t}&quantity=${a}`);
        },
    },
    quickViewProduct = {
        init: function () {
            setTimeout(function () {
                $(".quickview-modal").css("opacity", 1);
            }, 500),
                $(document).on("click", ".product-quickview", function (e) {
                    $(".quickview-modal").addClass("show-modal"), $(".quickview-modal .single-product .qv-product").hide(), $(".quickview-modal .quick-view-loader").show();
                    let o = $(e.target.closest(".product-quickview")).attr("data-handle");
                    var product_handle = $(e.target.closest(".product-quickview")).attr("data-handle");
                    t = `${$("body").attr("data-shop")}/collections?section_id=quick-view&call=ajax&product_id=${o}&cache=false`;
                    $.ajax({
                        type: "GET",
                        url: t,
                        dataType: "html",
                        success: function (e) {
                            $(".quickview-modal").html($(e).find(".quickview-modal").html());
                            $('body').addClass('no-scroll');
                            var productHandle = $(".quickview-modal").find('.wishlist-icon').attr('data-product-handle') || false;
                            $(".quickview-modal .wishlist-icon").click(function () {
                                $(this).toggleClass('active');
                                updateWishlist(productHandle);
                            });
                            if (wishlistContains(product_handle)) {
                                $(`.quickview-modal .wishlist-icon`).addClass('active');
                            }
                            else {
                                $(`.quickview-modal .wishlist-icon`).removeClass('active');
                            }
                            let o = $(".quickview-modal img"),
                                t = o.length;
                            quickViewProduct.loadProduct("quickview-modal");
                        },
                    });
                });
        },
        loadProduct: function (e) {
            if (
                ((qvproSlider = new Swiper("body .qv-product-images-small", {
                    slidesPerView: "auto",
                    touchRatio: 1,
                    followFinger: !1,
                    shortSwipes: !0,
                    longSwipes: !1,
                    navigation: { nextEl: ".single-product-mob .swiper-button-next", prevEl: ".single-product-mob .swiper-button-prev" },
                })),
                    setTimeout(function () {
                        quickViewSwiper = new Swiper(".quickview-modal .quick-view-gallery-top", {
                            slidesPerView: "auto",
                            loop: !0,
                            navigation: { nextEl: ".quickview-modal .single-product-right .swiper-button-next", prevEl: ".quickview-modal .single-product-right .swiper-button-prev" },
                            on: {
                                init: function () {
                                },
                            },
                        });
                    }, 500),
                    singleProduct.showOnlyAvailableOptionsWithCurrentOption(),
                    0 == $(document).find(`.${e} .single-product-left`).find(".quick-view-gallery-top").length)
            ) {
                var o = $(document).find(".qv-product .single-product-left img");
                var t = 0;
                o.load(function () {
                    ++t == o.length &&
                        (setTimeout(function () {
                            $(`.${e} .quick-view-loader`).removeClass("show-spinner"),
                                $(`.${e} .single-product .loader`).hide(),
                                $(`.${e} .single-product .product`).show(),
                                $(`.${e} .single-product .product-blocks`).css("opacity", 1),
                                $("body").addClass("no-scroll"),
                                slider.product();
                        }, 500));
                });
            } else
                $(`.${e} .quick-view-loader`).removeClass("show-spinner"),
                    $(`.${e} .single-product .loader`).hide(),
                    $(`.${e} .single-product .product`).show(),
                    $(`.${e} .single-product .product-blocks`).css("opacity", 1),
                    $("body").addClass("no-scroll"),
                    slider.product();
        },
        changeSliderImage: function (e) {
            $(".quickview-modal .single-product-left .quick-view-gallery-top .swiper-slide-active img").attr("src") != e &&
                ($(".quickview-modal .single-product-left .quick-view-gallery-thumbs .swiper-slide:not(.swiper-slide-duplicate)").each(function (o, t) {
                    $(t).find("img").attr("src").includes(e) && quickViewGalleryThumbs.slideTo(o, 1e3, !1);
                }),
                    $(".quickview-modal .single-product-left .quick-view-gallery-top .swiper-slide:not(.swiper-slide-duplicate)").each(function (o, t) {
                        $(t).find("img").attr("src").includes(e) && (quickViewSwiper.slideTo(o, 1e3, !1));
                    }));
        },
        unload: function (e) {
            console.log(e);
        },
    },
    themFunction = {
        init: function () {
            themFunction.currencyConverter(), themFunction.closeModal(), themFunction.calculateTime(), themFunction.inputNumber($(document).find(".input-number")), newsLetter.init();
            //           	themFunction.SocialFeed();
        },
        calculateTime: function () {
            if ($(".time-to-read").length > 0)
                for (var e, o, t, a, n = document.querySelectorAll("[data-words]"), i = document.querySelectorAll("[data-length-to-read]"), l = 0, s = 100, r = 60, c = 0; c < n.length; c++) {
                    var d = n[c].textContent.split(/\s/);
                    (l = 0), (s = 100), (r = 60), (l = d.length);
                    for (var p = 0; p < d.length; p++) ("" !== d[p] && "\n" !== d[p]) || l--;
                    (t = 1 === (e = Math.floor(l / s)) ? "min" : "mins"),
                        (a = 1 === (o = Math.floor(((l % s) / s) * r)) ? "sec" : "secs"),
                        (i[c].textContent = 0 === o ? e + " " + t : e + " " + t + " & " + o + " " + a);
                }
        },
        currencyConverter: function () {
            $(".shopify-currency-form select").on("change", function () {
                $(this).parents("form").submit();
            });
        },
        closeModal: function () {
            $(document).on("click", function (e) {
                let o = [
                    { open_class: "product-quickview", close_class: "quickview-modal .close-modal", inner_class: "quickview-modal .modal-content", modal_class: "quickview-modal", remove_class: "show-modal" },
                    { open_class: "open-drawer", close_class: "cart-drawer-close", inner_class: "cart-product", modal_class: "cart-drawer", remove_class: "cart-drawer-open" },
                    { open_class: "void", close_class: "popover .show-modal", inner_class: "popover .modal-content", modal_class: "popover", remove_class: "show-modal" },
                    { open_class: "compare-bar-content-right a", close_class: "show-product-modal .close-modal", inner_class: "product-modal .modal-body", modal_class: "product-modal", remove_class: "show-product-modal" },
                    {
                        open_class: "product-photos",
                        close_class: "single-product-zoom .remove",
                        inner_class: "p-zooms, .slider-product-zoom .swiper-button-next, .slider-product-zoom .swiper-button-prev, .slider-product-zoom .video",
                        modal_class: "single-product-zoom",
                        remove_class: "product-zoom-open",
                    },
                    {
                        'open_class': 'call-to-quote',
                        'close_class': 'catalogue-modal .close-modal',
                        'inner_class': 'catalogue-modal .modal-content',
                        'modal_class': 'catalogue-modal',
                        'remove_class': 'show-modal'
                    },
                    {
                        open_class: "small-box",
                        close_class: "location-currency-wrapper .tracker-close",
                        inner_class: "location-currency-wrapper",
                        modal_class: "location-currency-wrapper",
                        remove_class: "wrap-open",
                    }
                ];
                for (i = 0; i < o.length; i++)
                    ($(e.target).closest(`.${o[i].close_class}`).length > 0 || (0 == $(e.target).closest(`.${o[i].open_class}`).length && 0 == $(e.target).closest(`.${o[i].inner_class}`).length)) &&
                        (("quickview-modal" == o[i].modal_class && $(".cart-drawer").hasClass("cart-drawer-open")) || ($(document).find(`.${o[i].modal_class}`).removeClass(`${o[i].remove_class}`)),
                            "open-drawer" == o[i].open_class && $("body").removeClass("no-scroll"));
                0 == $(e.target).closest(".mobile-filter-icon").length && 0 == $(e.target).closest(".desktop-filter").length && $(document).find(".d-filter").removeClass("show-d-filter");
                for (i = 0; i < o.length; i++) {
                    if ($(e.target).closest('.add-to-compare').length == 0 && o[i].modal_class == 'product-modal') {
                        compare_products = [];
                        $('.add-to-compare').each(function (index, element) {
                            $(element).prop('disabled', false);
                        });
                        $('.compare-bar-content-left ul').html('');
                    }
                }
            });
        },
        SocialFeed: function (e, o) {
            if ($(".socialfeed-wrapper").length > 0) {
                $('.socialfeed-wrapper').each(function (index, element) {
                    $(element).find('.instagram_feed').append('<div class="instagram_feed_demo" style="display:none"></div>')
                    var feed = new Instafeed({
                        accessToken: $(element).find('.instagram_feed').attr('data-token'),
                        limit: parseInt($(element).find('.instagram_feed').attr('data-count')),
                        target: document.querySelectorAll(".instagram_feed_demo")[index],
                        success: function (result) {
                            console.log(result);
                            if (result.data.length > 0) {
                                let data = result.data;
                                let selector = 'instagram_feed .image-block:eq(0)';
                                for (let i = 0; i < data.length; i++) {
                                    $(element).find(`.${selector}`).append(`<a rel="nofollow" href="${data[i].permalink}" target="_blank"><img alt="social" data-src="${data[i].media_url}" data-sizes="auto" class="lazyload"></a>`);
                                }
                                $(element).find('.instagram_feed_demo').remove();
                            }
                        }
                    });
                    feed.run();
                });
            }
        },
        inputNumber: function () {
            $(document).on("click", ".input-number-decrement", function () {
                let e = $(this).closest(".quantity-view").find(".input-number"),
                    o = parseInt(e.attr("value")) - 1;
                parseInt(e.attr("max")), o >= parseInt(e.attr("min")) && (e.attr("value", o), "page" == $(".button-wrap").attr("data-cart")) && $("#product-select option:selected").val();
            }),
                $(document).on("click", ".input-number-increment", function () {
                    let e = $(this).closest(".quantity-view").find(".input-number"),
                        o = parseInt(e.attr("value")) + 1,
                        t = parseInt(e.attr("max"));
                    parseInt(e.attr("min")), o <= t && (e.attr("value", o), "page" == $(".button-wrap").attr("data-cart")) && $("#product-select option:selected").val();
                });
        },
        inputNumberUpdate: function (e, o) {
            e.attr("max", o);
        },
        inputNumberReset: function (e, o) {
            e.attr("value", o);
        },
    },
    newsLetter = {
        init: function () {
            $(document).find(".popover").length > 0 &&
                ($(".popover-settings").removeClass("display-hide"),
                    newsLetter.open(),
                    $(".popover .close-modal").click(function () {
                        newsLetter.close();
                    })),
                $(document).on("click", ".newsletter-submit", function (e) {
                    e.preventDefault();
                    var o = $(this).closest(".contact-form");
                    $.ajax({
                        type: "POST",
                        async: !0,
                        url: "/contact",
                        data: o.serialize(),
                        dataType: "json",
                        error: function (e) {
                        },
                        success: function (e) {
                            o.find(".newsletter-form").hide(), o.find(".newsletter-form-submit-success").show();
                        },
                    });
                });
        },
        open: function () {
            $(".popover-settings").each(function (e, o) {
                let t = $(o),
                    a = t.attr("data-id");
                if (("once_per_day" == t.attr("data-frequent"))) {
                    let e = sessionStorage.getItem(`${a}-popover`);
                    null == e && (newsLetter.show(o), sessionStorage.setItem(`${a}-popover`, "hide"));
                } else newsLetter.show(o);
            });
        },
        show: function (e) {
            let o = $(e);
            if (("enable_time_appear" == o.attr("data-appear"))) {
                let t = 1e3 * parseInt(o.attr("data-time"));
                setTimeout(function () {
                    $("body .popover.show-modal").length <= 0 &&
                        !$("body .nav-bar-mobile").hasClass("nav-bar-mobile-open") &&
                        ($(".search-wrapper").hasClass("show-search") ||
                            ($(e).find(".popover .modal-content").addClass($(e).find(".popover .modal-content").attr("data-class")), $(e).find(".popover").addClass("show-modal"), $("body").addClass("no-scroll")));
                }, t);
            } else
                $(document).scroll(function () {
                    var e = document.documentElement,
                        o = document.body,
                        t = "scrollTop",
                        a = "scrollHeight",
                        n = ((e[t] || o[t]) / ((e[a] || o[a]) - e.clientHeight)) * 100;
                    (n = parseInt(n)),
                        $(".popover-settings").each(function (e, o) {
                            "enable_pagescroll_appear" == $(o).attr("data-appear") &&
                                parseInt($(o).attr("data-position")) == n &&
                                0 == $(o).hasClass("already-showed") &&
                                $("body .popover.show-modal").length <= 0 &&
                                !$("body .nav-bar-mobile").hasClass("nav-bar-mobile-open") &&
                                ($(o).find(".popover .modal-content").addClass($(o).find(".popover .modal-content").attr("data-class")),
                                    $(o).find(".popover").addClass("show-modal"),
                                    $("body").addClass("no-scroll"),
                                    $(o).addClass("already-showed"));
                        });
                });
        },
        close: function () {
            $(".popover").removeClass("show-modal"), $("body").removeClass("no-scroll");
        },
    },
    cartDrawer = {
        init: function () {
            if ($(".open-drawer").length > 0) {
                function e(e) {
                    $(document).find(`.product-collection[data-id=${e}] .product-item-add-to-cart`).is(":hidden") &&
                        ($(document).find(`.product-collection[data-id=${e}] .stock-avail`).hide(),
                            $(document).find(`.product-collection[data-id=${e}] .product-item-add-to-cart .spinner`).css({ opacity: 0, visibility: "hidden" }),
                            $(document).find(`.product-collection[data-id=${e}] .product-item-add-to-cart`).show()),
                        $(document).find(".single-product .stock-avail").hide();
                }
                $(".open-drawer").click(function () {
                    cartDrawer.open();
                }),
                    $(document).on('click', '.cart-plus', function (o) {
                        let id = $(this).attr("data-id"),
                            quantity = $(o.target).closest(".quantity-view").find(".input-number").val();
                        cartDrawer.update(id, quantity);
                    }),
                    $(document).on('click', '.cart-minus', function (o) {
                        let id = $(this).attr("data-id"),
                            quantity = $(o.target).closest(".quantity-view").find(".input-number").val();
                        cartDrawer.update(id, quantity);
                    }),
                    $(document).on("click", ".cart-drawer .remove-product, .mini-cart .remove-product", function (o) {
                        let id = $(this).attr("data-id"),
                            quantity = 0;
                        cartDrawer.update(id, quantity);
                    });
            }
        },
        open: function (e = null) {
            let o = `${$("body").attr("data-shop")}/products?section=cart-drawer`;
            $.ajax({
                type: "GET",
                url: o,
                dataType: "html",
                success: function (o) {
                    $(".spinner").hide(),
                        $(".cart-product").html($(o).find(".cart-product").html()),
                        $(".cart-drawer").addClass("cart-drawer-open"),
                        $(document).find('.cart-body').removeClass('cart-disabled'),
                        e &&
                        ($(e.target).find(".spinner").css({ opacity: 0, visibility: "hidden" }),
                            $(e.target).find(".add-to-cart-loader").css({ opacity: 0, visibility: "hidden" }),
                            $(e.target).next(".add-to-cart-loader").css({ opacity: 0, visibility: "hidden" }),
                            $(e.target).prop("disabled", !1)),
                        $("body").addClass("no-scroll"),
                        ShowMiniCart();
                },
            });
        },
        update: function (e, o) {
            let t = e,
                a = o;
            $(document).find('.cart-body').addClass('cart-disabled');
            $.ajax({
                type: "POST",
                url: "/cart/change.js",
                data: { quantity: a, id: t },
                dataType: "json",
                success: function (e) {
                    let o = `${$("body").attr("data-shop")}/products?section=cart-drawer`;
                    $.ajax({
                        type: "GET",
                        url: o,
                        dataType: "html",
                        success: function (o) {
                            if (e.item_count > 0) {
                                if (a == 0) {
                                    $(document).find(`.remove-product[data-id='${t}']`).closest(".cart-row-block").addClass("removed");
                                    setTimeout(function () {
                                        $(document)
                                            .find(`.remove-product[data-id='${t}']`)
                                            .closest(".cart-row-block")
                                            .slideUp(400, function () {
                                                $('.sub-total').html($(o).find(".sub-total").html());
                                                $(document).find('.cart-body').removeClass('cart-disabled');
                                            });
                                    }, 500);
                                }
                                else {
                                    const format = document.querySelector("[data-drawer-format]").getAttribute("data-drawer-format")
                                    $('#drawer-original-total-price').html($(o).find("#drawer-original-total-price").html());
                                    $('#drawer-total-discount').html($(o).find("#drawer-total-discount").html());
                                    $('#drawer-total-price').html($(o).find("#drawer-total-price").html());

                                    const item = e.items.find(item => item.id.toString() === t)
                                    let itemOriginalPrice = cartMoneyFormat(item.original_line_price, format)
                                    let itemFinalPrice = cartMoneyFormat(item.final_line_price, format)
                                    if (document.querySelector(`[data-cart-key="${t}"] .drawer_original_item_price`)) {
                                        document.querySelector(`[data-cart-key="${t}"] .drawer_original_item_price`).textContent = itemOriginalPrice
                                    }
                                    document.querySelector(`[data-cart-key="${t}"] .drawer_final_item_price`).textContent = itemFinalPrice
                                    $(document).find('.cart-body').removeClass('cart-disabled');
                                }
                            }
                            else {
                                cartDrawer.open();
                            }
                        }
                    });
                    updateCartNumber();
                },
                error: function (e) {
                },
            });
        },
        unload: function (e) {
            console.log(e);
        },
    },
    announcement = {
        init: function () {
            announcement.show(), announcement.close();
        },
        show: function () {
            "false" != sessionStorage.getItem("show_announcement") && $(".announcement-section").show();
        },
        close: function () {
            $(".announcement-section .close").click(function () {
                $(this).fadeOut("normal", function () {
                    $(".hn-content").fadeOut("normal", function () {
                        $(".announcement-section").addClass("closebar");
                    });
                });
            });
        },
    },
    predictiveSearch = {
        init: function () {
            if (userAgent.isMobile()) {
                $('.search-result-wrapper').removeClass('search-result-wrapper-desktop');
                $('.search-result-wrapper').addClass('search-result-wrapper-mobile');
            }
            if (
                ($(".search-user").click(function () {
                    $(this).parent().toggleClass("open"), $(`${search_field}`).closest(".search-form").find(".search").hasClass("open") || predictiveSearch.clearSearch();
                }),
                    predictiveSearch.class(),
                    $(`${search_field}`).length > 0)
            ) {
                var e = null;
                $(`${search_field}`).on("keyup", function () {
                    var o = this.value;
                    clearTimeout(e),
                        (e = setTimeout(function () {
                            let e = o;
                            "" != e && e.length > 2 ? ($(`${search_form}`).addClass("search-remove"), predictiveSearch.getProducts(e)) : ($(`${search_form}`).removeClass("search-remove"), predictiveSearch.hideSearch());
                        }, 500));
                }),
                    $(`${search_field}`).focusout(function () {
                        $(document).on("click", function (e) {
                            $(e.target).closest(`${search_result_wrapper_class}`).length <= 0 && predictiveSearch.hideSearch();
                        });
                    }),
                    $("#search-remove").on("click", function () {
                        predictiveSearch.clearSearch(), predictiveSearch.hideSearch(), $(".search-form").removeClass("search-remove");
                    });
            }
        },
        class: function () {
            (search_header_class = "search-form"),
                (search_result_wrapper_class = "search-result-wrapper-desktop"),
                (search_field = `.${search_header_class} #search-field`),
                userAgent.isMobile() && ((search_header_class = "search-form"), (search_result_wrapper_class = "search-result-wrapper-mobile")),
                (search_field = `.${search_header_class} #search-field`),
                (search_result_wrapper_class = `.search-result-wrapper.${search_result_wrapper_class}`),
                (search_form = `.${search_header_class} .search-form`);
        },
        getProducts: function (e) {
            $(`${search_result_wrapper_class} .search-availaible`).hide(),
                $(`${search_result_wrapper_class}`).show(),
                $(`.${search_header_class} .search-spinner`).addClass("show-spinner"),
                jQuery
                    .getJSON("/search/suggest.json", { q: e, resources: { type: $(`${search_field}`).attr("data-type"), limit: 4, options: { unavailable_products: "last", fields: "title,product_type,variants.title", prefix: "last" } } })
                    .done(function (e) {
                        predictiveSearch.loadProducts(e);
                    });
        },
        loadProducts: function (e) {
            $(`${search_result_wrapper_class} ul li`).not(":last-child").remove(), $(`${search_result_wrapper_class} .search-item`).hide();
            let o = e.resources.results.products,
                t = e.resources.results.pages,
                a = e.resources.results.collections,
                n = e.resources.results.articles,
                i = !0;
            if (o.length > 0) {
                let e = "";
                o.forEach(function (o, t) {
                    (e += predictiveSearch.getHtml(e, "show-search-products", t, o));
                }),
                    predictiveSearch.loadHtml(e, "show-search-products"),
                    (i = !1);
            }
            if (t && t.length > 0) {
                let e = "";
                t.forEach(function (o, t) {
                    (e += predictiveSearch.getHtml(e, "show-search-pages", t, o));
                }),
                    predictiveSearch.loadHtml(e, "show-search-pages"),
                    (i = !1);
            }
            if (a && a.length > 0) {
                let e = "";
                a.forEach(function (o, t) {
                    (e += predictiveSearch.getHtml(e, "show-search-collections", t, o));
                }),
                    predictiveSearch.loadHtml(e, "show-search-collections"),
                    (i = !1);
            }
            if (n && n.length > 0) {
                let e = "";
                n.forEach(function (o, t) {
                    (e += predictiveSearch.getHtml(e, "show-search-blogs", t, o));
                }),
                    predictiveSearch.loadHtml(e, "show-search-blogs"),
                    (i = !1);
            }
            i
                ? ($(`${search_result_wrapper_class} .search-availaible`).hide(), $(`${search_result_wrapper_class} .no-product-found`).show())
                : ($(`${search_result_wrapper_class} .no-product-found`).hide(), $(`${search_result_wrapper_class} .search-availaible`).show()),
                $(`.${search_header_class} .search-spinner`).removeClass("show-spinner");
        },
        getHtml: function (e, o, t, a) {
            if (
                ("featured_image" in a &&
                    (a.featured_image.url
                        ? $(`${search_result_wrapper_class} .${o}`).find(".clone img").attr("src", a.featured_image.url)
                        : ($(`${search_result_wrapper_class} .${o}`).find(".clone img").attr("src", ""), $(`${search_result_wrapper_class} .${o}`).find(".clone img").attr("alt", a.featured_image.alt))),
                    "author" in a && $(`${search_result_wrapper_class} .${o}`).find(".clone .product-details .blog-author").text(a.author),
                    "published_at" in a)
            ) {
                let e = new Date(a.published_at);
                var n = ("0" + e.getDate()).slice(-2),
                    i = e.toLocaleString("default", { month: "long" }) + " " + n + ", " + e.getFullYear().toString().substr(2, 2);
                $(`${search_result_wrapper_class} .${o}`).find(".clone .product-details .blog-published-date").text(i);
            }
            return (
                $(`${search_result_wrapper_class} .${o}`).find(".clone .product-details .title").text(a.title),
                $(`${search_result_wrapper_class} .${o}`).find(".clone .product-details .price").text(Shopify.formatMoney(a.price)),
                $(`${search_result_wrapper_class} .${o}`).find(".clone a").attr("href", a.url),
                $(`${search_result_wrapper_class} .${o}`).find(".clone")[0].outerHTML
            );
        },
        loadHtml: function (e, o) {
            $(`${search_result_wrapper_class} .${o} ul`).prepend(e),
                $(`${search_result_wrapper_class} .${o} ul li`).not(":last-child").removeClass("clone"),
                $(`${search_result_wrapper_class} .${o} ul li`).not(":last-child").show(),
                $(`${search_result_wrapper_class} .${o} .no-product-found`).hide(),
                $(`${search_result_wrapper_class} .${o}`).show();
        },
        hideSearch: function () {
            $(`${search_result_wrapper_class}`).hide();
        },
        clearSearch: function () {
            $(`${search_field}`).val("");
        },
    },
    userAgent = {
        isMobile: function () {
            return !(
                !/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
                    navigator.userAgent
                ) &&
                !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    navigator.userAgent.substr(0, 4)
                )
            );
        },
    };
function checkIfJqueryLoaded() {
    (window.jQuery && "undefined" != typeof jQuery) &&
        (clearInterval(myVar),
            TweenMax.fromTo($(".page-loader"), 0.1, { opacity: 1, visibility: "visible" }, { opacity: 0, visibility: "hidden" }),
            slider.init({ type: "carousel", autoplay: 0, perView: 1, gap: 0 }),
            quickViewProduct.init(),
            themFunction.init(),
            cartDrawer.init(),
            announcement.init(),
            singleProduct.init(),
            predictiveSearch.init(),
            screensize = $(window).width(),
            jQuery(".simple-dropdown span").click(function () {
                jQuery(".dropdown-menu").addClass("menu-open");
            }),
            jQuery(".simple-dropdown-submenu span").click(function () {
                jQuery(".simple-dropdown-menu").addClass("menu-open");
            }),
            jQuery(".video-control-play, .video-overlay").click(function () {
                $("iframe").each(function (e, o) {
                    $(o).attr("src", $(o).attr("data-src"));
                });
                let e = $(this).closest(".video-section"),
                    o = e.attr("data-type"),
                    t = e.find(".load-video").attr("src");
                e.find(".video-image.box").css({ opacity: 0, visibility: "hidden" }),
                    e.find(".video-image .placeholder-background").css({ opacity: 0, visibility: "hidden" }),
                    e.find(".video-overlay").css({ opacity: 0, visibility: "hidden" }),
                    e.find(".video-control-play-wrapper").css({ opacity: 0, visibility: "hidden" }),
                    (t = "youtube" == o ? `${t}?autoplay=1&mute=1&enablejsapi=1` : `${t}?autoplay=1&loop=1&autopause=0`),
                    e.find(".load-video").attr("src", t);
            }),
            $("#button").on("click", function (e) {
                e.preventDefault(), $("html, body").animate({ scrollTop: 0 }, "300");
            }),
            $(document).on('click', '.small-box', function () {
                $('.location-currency-wrapper ').toggleClass('wrap-open');
            }),
            $(".show_password").click(function () {
                $(".contact").hide(), $(".password").show();
            }));
}

function changeAutoplay() {
    if ($(`.home-slider .swiper-slide:eq(${homeSlider.activeIndex})`).find(".slideshow-video .svideo").length > 0) {
        let e = document.querySelectorAll(".home-slider .swiper-slide");
        for (let o = 0; o < e.length; o++)
            if (o == homeSlider.activeIndex) {
                e[o].querySelector(".slideshow-video .svideo").play(),
                    (loopTime = 9 * parseInt(e[o].querySelector(".slideshow-video .svideo").duration));
                break;
            }
    } else {
        for (let e = 0; e < document.querySelectorAll(".home-slider .swiper-slide").length; e++) document.querySelectorAll(".home-slider .swiper-slide");
        loopTime = 50;
    }
}
function ready(e) {
    "interactive" === document.readyState
        ? e(document.readyState)
        : document.addEventListener
            ? document.addEventListener("DOMContentLoaded", e(document.readyState))
            : document.attachEvent("onreadystatechange", function () {
                "complete" === document.readyState && e(document.readyState);
            });
}
function myFunction() {
    $("body").addClass("page-load"), $("body").css("opacity", 1);
}
ready(function (e) {
    (myVar = setInterval(checkIfJqueryLoaded, 50));
}),
    (window.onbeforeunload = function (e) {
        $(document.activeElement).hasClass("no-page-load-animation") || TweenMax.fromTo($(".page-loader"), 0.1, { opacity: 0, visibility: "hidden" }, { opacity: 1, visibility: "visible" });
    }),
    $(document).on("click", "a", function (e) { });
var TxtType = function (e, o, t) {
    (this.toRotate = o), (this.el = e), (this.loopNum = 0), (this.period = parseInt(t, 10) || 2e3), (this.txt = ""), this.tick(), (this.isDeleting = !1);
};
function ShowMiniCart() {
    $(".mini-cart").length > 0 && $(".mini-cart").addClass("show-cart");
}
function showSpinner() {
    $(this).parent().find(".spinner").show();
}
function hideSpinner() {
    $(".spinner:visible").hide();
}
function HideMiniCart() {
    $(".mini-cart").length > 0 && $(".mini-cart").removeClass("show-cart");
}
(TxtType.prototype.tick = function () {
    var e = this.loopNum % this.toRotate.length,
        o = this.toRotate[e];
    this.isDeleting ? (this.txt = o.substring(0, this.txt.length - 1)) : (this.txt = o.substring(0, this.txt.length + 1)), (this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>");
    var t = this,
        a = 200 - 100 * Math.random();
    this.isDeleting && (a /= 2),
        this.isDeleting || this.txt !== o ? this.isDeleting && "" === this.txt && ((this.isDeleting = !1), this.loopNum++, (a = 500)) : ((a = this.period), (this.isDeleting = !0)),
        setTimeout(function () {
            t.tick();
        }, a);
}),
    (window.onload = function () {
        for (var e = document.getElementsByClassName("typewrite"), o = 0; o < e.length; o++) {
            var t = e[o].getAttribute("data-type"),
                a = e[o].getAttribute("data-period");
            t && new TxtType(e[o], JSON.parse(t), a);
        }
        var n = document.createElement("style");
        (n.type = "text/css"), (n.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}"), document.body.appendChild(n);
    }),
    jQuery("li.search-user").click(function () {
        jQuery(".search-wrapper").addClass("show-search"), jQuery("body").addClass("show-overlay-view");
        jQuery('#search-field').focus();
    }),
    jQuery(".search-remove").click(function () {
        jQuery(".search-wrapper").removeClass("show-search");
    }),
    jQuery(".product-buy a").click(function (e) {
        $(this).parent().find(".spinner").show();
    }),
    jQuery(document).on("click", ".size-block", function () {
        jQuery(".size-block").removeClass("option-selected"), $(this).addClass("option-selected");
    }),
    $(document).on("click", function (e) {
        0 === $(e.target).closest(".mini-cart").length && HideMiniCart();
    });
jQuery(".hamburger-menu").click(function () {
    jQuery(".header_main").addClass("header-mobile-open");
});

let compare_products = [];
$(".add-to-compare").click(function () {
    let add = true;
    let product_id = $(this).attr('data-id');
    compare_products.forEach(function (item, index) {
        if (item.id == product_id) {
            add = false;
        }
    });
    if (add) {
        $(`.add-to-compare[data-id='${product_id}']`).prop('disabled', true);
        $(".compare-bar").addClass("show-compare-bar");
        $.getJSON(`/products/${$(this).attr("data-product")}.js`, function (e) {
            $(".compare-bar-content-left ul").append(`<li><img alt="compare-products" src="${e.featured_image}"><span class="p-remove" data-id="${product_id}"><span></span></span></li>`),
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
                (t = `${(t = `${(t = `${t}<tr>`)}<td class="product-show"><img alt="compare-products" src="${n[e].Image}"><span>${n[e].Name}</span></td>`)}<td>${n[e].Description}</td>`);
                for (let o = 2; o < a.length - 1; o++) t = a[o] in n[e] ? `${t}<td>${n[e][a[o]]}</td>` : `${t}<td>N/A</td>`;
                t = `${t}<td>${n[e].Price}</td></tr>`;
            }
            $(".product-list").html(t);
        });
    }
}),
    $(".compare-close").click(function () {
        $(".compare-bar").removeClass("show-compare-bar");
        compare_products = [];
        $('.add-to-compare').each(function (index, element) {
            $(element).prop('disabled', false);
        });
        $('.compare-bar-content-left ul').html('');
    }),
    $(".comp-btn").click(function () {
        $(".product-modal").addClass("show-product-modal");
        $(".compare-bar").removeClass("show-compare-bar");
        setTimeout(() => {
            $('body').addClass('no-scroll');
        }, 500);
    }),
    $(".close-modal").click(function () {
        $(".product-modal").removeClass("show-product-modal");
        compare_products = [];
        $('.add-to-compare').each(function (index, element) {
            $(element).prop('disabled', false);
        });
        $('.compare-bar-content-left ul').html('');
    }),
    $(document).on("click", ".p-remove", function () {
        let e = $(this).closest("li").index();
        compare_products.splice($(this).closest("li").index(), 1);
        $(`.compare-bar-content-left li:eq(${e})`).remove();
        $(`.product-modal .product-list tr:eq(${e})`).remove();
        0 == $(".compare-bar-content-left li").length && $(".product-modal .product-compare-header").html("");
        $(`.add-to-compare[data-id='${$(this).attr('data-id')}']`).prop('disabled', false);
    })





// const cardImage = document.querySelector('.product-grid');
// const renderCard = () => {
// cardImage.classList.remove('loading');
// };
// setTimeout(() => {
//   renderCard();
// }, 5000);

function imgLoaded(imgElement) {
    return imgElement.complete && imgElement.naturalHeight !== 0;
}

// document.getElementById('vid').play();
// document.getElementById('vid').play();