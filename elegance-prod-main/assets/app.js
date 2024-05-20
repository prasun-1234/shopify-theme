var isAnimationEnabled;
var checkIfScrollmagicLoaded;
function checkIfScrollmagicIsLoaded() {
  if (typeof isScrollmagicLoaded != undefined) {
    clearInterval(checkIfScrollmagicLoaded);
    scriptLoadListener.isCriticalJsLoaded = 'thirdPartJsLoaded';
  }
}


function loadScript(url, callback = null) {

  var script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function () {
      callback(url);
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function loadJsFiles(libraries, part = null) {
  for (var i = 0; i < libraries.length; i++) {
    loadScript(libraries[i], function (jsFile) {
      //initialization code
      if (jsFile.includes('lazysizes')) {
        document.getElementsByTagName("BODY")[0].classList.remove("page-load");
        scriptLoadListener.isCriticalJsLoaded = 'criticalJsLoaded';
      }
    });
    if (i == libraries.length - 1 && part != null) {
      if (part == 2) {
        scriptLoadListener.isCriticalJsLoaded = 'secondPartJsLoaded';
      }
      if (part == 3) {
        scriptLoadListener.isCriticalJsLoaded = 'thirdPartJsLoaded';
      }
      if (part == 4) {
        scriptLoadListener.isCriticalJsLoaded = 'fourthPartJsLoaded';
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  scriptLoadListener = {
    criticalJsLoaded: '',
    criticalJsListener: function (val) { },

    set isCriticalJsLoaded(val) {
      this.criticalJsLoaded = val;
      this.criticalJsListener(val);
    },
    get isCriticalJsLoaded() {
      return this.criticalJsLoaded;
    },
    registerListener: function (listener) {
      this.criticalJsListener = listener;
      this.secondPartJsListener = listener;
    }
  }

  scriptLoadListener.registerListener(function (val) {
    if (val == 'criticalJsLoaded') {
      let libraries = [
        "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/swiper.min.js?v=15914358464971598381649421955",
        "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/CSSPlugin.js?v=53845888360408729691649421930",
        "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/isotope-masonry.js?v=96875624313649522131649421936"
      ];
      loadJsFiles(libraries, 2);
    }
    if (val == 'secondPartJsLoaded' && isAnimationEnabled) {
      let libraries = [
        "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/tweenlite.js?v=131372992613236259441649421958"
      ];
      loadJsFiles(libraries, 3);
    }
    if ((val == 'thirdPartJsLoaded') || (val == 'secondPartJsLoaded' && !isAnimationEnabled)) {
      let libraries = [
        "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/instafeed.js?v=12929635516789783481649421935",
        "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/functions.js?v=13655776072429980431649421934",
        "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/custom.js?v=58919423971751874921649421932",
        "//cdn.shopify.com/shopifycloud/shopify/assets/themes_support/api.jquery-e94e010e92e659b566dbc436fdfe5242764380e00398907a14955ba301a4749f.js"
      ];
      loadJsFiles(libraries, 4);
    }
  });

  if (document.getElementsByTagName("BODY")[0].getAttribute('data-animation') == 'true') {
    isAnimationEnabled = true;
  }
  else {
    isAnimationEnabled = false;
  }

  let libraries = [
    "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/ls.bgset.min.js?v=49817290196325828191649421941",
    "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/lazysizes.min.js?v=99318634871119774751649421938",
    "//cdn.shopify.com/s/files/1/0441/3027/1389/t/11/assets/tweenmax.min.js?v=160489296794911516481649421958",
  ];
  loadJsFiles(libraries);

  document.addEventListener('readystatechange', function (ev) {
  });
});
// jQuery('li.cart-icon').click(function(){
//     jQuery('.cart-drawer').addClass('cart-drawer-open');
// });

// jQuery('.cart-drawer-close').click(function(){
//     jQuery('.cart-drawer').removeClass('cart-drawer-open');
// });