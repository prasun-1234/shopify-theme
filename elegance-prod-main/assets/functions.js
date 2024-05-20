var isFunctionJsFileLoaded = true;

function quickViewAddToCart(purpose, event) {
  let product = $('.quickview-modal #product-select').find(":selected").val();
  let quantity = $('.quickview-modal input[name="quantity"]').val();
  let productData = {
    quantity: quantity,
    id: product
  };
  if (purpose == 'add-to-cart') {
    addToCartAjax(productData, event, { 'cart_drawer': 'open', purpose: 'quick-view' });
  }
  else {
    addToCartAjax(productData, event, { 'redirect_to_checkout': true, purpose: 'quick-view' });
  }
}

function productItemAddToCart(product, event) {
  $(event.target).closest(".product-add").find(".spinner").show();
  let productData = {
    quantity: 1,
    id: product
  };
  $(event.target).find('.spinner').css({ 'opacity': 1, 'visibility': 'visible' });
  addToCartAjax(productData, event, { 'cart_drawer': 'open' });
}

function addToCartAjax(productData, event, options = null) {
  //add disable
  //   $(event.target).prop("disabled", true);
  //enable loader
  if ($(event.target).find('.add-to-cart-loader').length > 0) {
    $(event.target).find('.add-to-cart-loader').css({ 'opacity': 1, 'visibility': 'visible' });
  }
  if ($(event.target).next('.add-to-cart-loader').length > 0) {
    $(event.target).next('.add-to-cart-loader').css({ 'opacity': 1, 'visibility': 'visible' });
  }
  $(event.target).closest(".product-add").find(".spinner").show();
  if (options['purpose'] == 'quick-view') {
    $('.quickview-modal').find('.stock-avail').hide();
  }
  else {
    $('.single-product').find('.stock-avail').hide();
  }
  $.ajax({
    url: '/cart/add.js',
    type: 'POST',
    data: productData,
    dataType: 'json',
    success: function (res) {
      if (options['cart_drawer'] == 'open') {
        //         cartDrawer.open(event);       
        $(event.target).closest('.product-add').find(".spinner").hide();
        $(event.target).closest('.product-add').find('.added-span-product').show();
        setTimeout(function () {
          $(event.target).closest('.product-add').find('.added-span-product').hide();
        }, 5000);
        updateCartNumber();
      }
      if (options['redirect_to_cart'] == true) {
        setTimeout(function () {
          window.location.href = '/cart';
        }, 1000);
      }
      if (options['redirect_to_checkout'] == true) {
        setTimeout(function () {
          window.location.href = '/checkout';
        }, 1000);
      }
      else {
        if ($(".button-wrap").attr("data-cart") == "page") {
          window.location.href = `/cart`;
        }
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      //add or update attribute of added quantity for that product
      //quick view
      if (options['purpose'] == 'quick-view') {

        let id = $('.quickview-modal .single-product #product-select option:selected').val();
        let max = parseInt($('.quickview-modal .single-product .quantity-view .input-number').attr('max'));
        let in_cart = parseInt($(`.cart-drawer .cart-row-block .input-number[data-id='${id}']`).val());
        let left;
        left = 0;
        if (!isNaN(in_cart)) {
          left = max - in_cart;
        }

        let text = `Sorry ${left} stock available`;
        $(document).find('.quickview-modal .stock-avail').text(text);
        $(document).find('.quickview-modal .stock-avail').show();
        $('.single-product-buttons').find('a:not(.sold-out)').prop("disabled", false);
        $('.single-product-buttons').find('.spinner').css({ 'opacity': 0, 'visibility': 'hidden' });
      }
      else if (options['purpose'] == 'collection-list') {
        $(event.target).hide();
        $(event.target).parent().find(".spinner").hide();
        $(event.target).next('.stock-avail').show();
      }
      else {
        $('.spinner').hide();

        let id = $('.single-product #product-select option:selected').val();
        let max = parseInt($('.single-product .quantity-view .input-number').attr('max'));
        let in_cart;
        if ($('.cart-drawer').length > 0) {
          in_cart = parseInt($(`.cart-drawer .cart-row-block .input-number[data-id='${id}']`).val());
        } else if ($('.mini-cart').length > 0) {
          in_cart = parseInt($(`.mini-cart .mini-cart-details .input-number[data-id='${id}']`).val());
          $('.product-add').find('.spinner').hide();
        } else {
          jQuery.getJSON('/cart.js', function (cart) {
            // now have access to Shopify cart object
            for (var item in cart.items) {
              if (cart.items[item].id == id) {
                in_cart = parseInt(cart.items[item].quantity);

                let left;
                left = 0;
                if (!isNaN(in_cart)) {
                  left = max - in_cart;
                }
                let text = `Sorry ${left} stock available`;
                $(document).find('.single-product-stock-avail.stock-avail').text(text);
                $(document).find('.single-product-stock-avail.stock-avail').show();
                //remove disabled attribute
                $('.product-add').find('input:not(.sold-out)').prop("disabled", false);
                //remove loader
                $('.product-add').find('.spinner').hide();
              }
            }
          });
        }
        if ($('.cart-drawer').length > 0 || $('.mini-cart').length > 0) {
          let left;
          left = 0;
          if (!isNaN(in_cart)) {
            left = max - in_cart;
          }
          let text = `Sorry ${left} stock available`;
          $(document).find('.single-product-stock-avail.stock-avail').text(text);
          $(document).find('.single-product-stock-avail.stock-avail').show();
          //remove disabled attribute
          $('.product-add').find('input:not(.sold-out)').prop("disabled", false);
          //remove loader
          $('.product-add').find('.spinner').hide();
        }
      }
    }
  });
}

function updateCartNumber() {
  $.ajax({
    type: 'GET',
    url: '/cart.js',
    dataType: "json",
    success: function (resultData) {
      $('.cart-icon .cart-count').text(resultData.item_count);
    }
  });
}

function sortBy(value) {
  let url;
  if (getParameterByName('sort_by', window.location.href) == undefined) {
    url = `${window.location.href}?sort_by=${value}`;
  }
  else {
    url = updateQueryStringParameter(window.location.href, 'sort_by', value);
  }
  if (occurrences(url, "?") > 1) {
    url = replaceLast(url, '?', '&');
  }
  collectionFilterNew.getData(url);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function replaceLast(x, y, z) {
  var a = x.split("");
  a[x.lastIndexOf(y)] = z;
  return a.join("");
}

function occurrences(string, subString, allowOverlapping) {

  string += "";
  subString += "";
  if (subString.length <= 0) return (string.length + 1);

  var n = 0,
    pos = 0,
    step = allowOverlapping ? 1 : subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

function selectAdditionalProduct(event) {
  $(event.target).closest('.additional-product').toggleClass('selected');
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  if (exdays != 0) {
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  else {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
