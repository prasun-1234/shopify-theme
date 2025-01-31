function cartDrawerMoneyFormat(cents, format) {
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

async function cartFunctions() {

  // Quantity Update

  const cartDrawerBtns = document.querySelectorAll('.quantity-counter-drawer button');
  let drawerForm = document.querySelector('.cart-drawer-form');

  cartDrawerBtns.forEach((btn) => {
    const isPlus = btn.classList.contains("increase");
    const input = btn.parentElement.querySelector("input")
    const max = input.getAttribute("max")
    const key = btn.closest(".cart-item-drawer").getAttribute("data-key")
    input.addEventListener("keyup", (e) => {
      changeItemQuantity(key, input.value)
    })
    btn.addEventListener('click', (e) => {
      const value = Number(input.value)

      if (isPlus) {
        const addValue = value + 1
        const newValue = Math.min(max, addValue)
        input.value = newValue
        changeItemQuantity(key, newValue)
      } else if (value > 0) {
        const newValue = value - 1
        input.value = newValue
        changeItemQuantity(key, newValue)
      }

    });
  });

  let cartDrawerGoal = document.querySelector(".cart-drawer-goal")
  let goalDrawerMsg = ""
  let goalDrawerProgress = ""
  let drawerFreeDel = ""
  if (cartDrawerGoal) {
    drawerFreeDel = cartDrawerGoal.getAttribute("data-free")
    goalDrawerMsg = cartDrawerGoal.querySelector(".drawer-goal-msg")
    goalDrawerProgress = cartDrawerGoal.querySelector("progress")
  }

  document.querySelectorAll(".drawer-trash-item").forEach(remove => {
    remove.addEventListener("click", (e) => {
      e.preventDefault();
      const item = remove.closest(".cart-item-drawer")
      const key = item.getAttribute("data-key")

      axios.post("/cart/change.js", {
        id: key,
        quantity: 0
      }).then(res => {
        if (res.data.items.length === 0) {
          document.querySelector(".cart-drawer-header").remove();
          document.querySelector(".cart-drawer-form").remove();
          cartCountUpdate(res.data.item_count);
          document.querySelector(".cart-drawer-empty").style.display = "flex";
          document.querySelector(".cart-drawer-empty").classList.add("drawer_empty_main")
          document.querySelectorAll(".cart-icon-status").forEach(icon => {
            icon.classList.add("hidden")
          })
        } else {
          const format = document.querySelector(".cart_drawer_main [data-money-format]").getAttribute("data-money-format")
          const itemsQuantity = res.data.item_count
          cartCountUpdate(res.data.item_count);
          const itemsSubtotalPrice = cartDrawerMoneyFormat(res.data.items_subtotal_price, format)
          const totalDiscount = cartDrawerMoneyFormat(res.data.total_discount, format)
          const totalPrice = cartDrawerMoneyFormat(res.data.total_price, format)
          document.querySelector(".cart-drawer-empty").classList.remove("drawer_empty_main")
          freeDeliveryDrawer(res.data.total_price, format)
          document.querySelector("#drawer-total-price").textContent = totalPrice
          document.querySelector("#drawer-total-discount").textContent = totalDiscount
          item.remove();
        }
      })
    })
  })

  function freeDeliveryDrawer(totalPrice, format) {
    if (cartDrawerGoal) {
      if (totalPrice >= drawerFreeDel) {
        goalDrawerMsg.innerHTML = "You've got free shipping"
        goalDrawerProgress.value = totalPrice
      } else {
        let goalDiff = drawerFreeDel - totalPrice
        goalDrawerMsg.innerHTML = `You're only ${cartDrawerMoneyFormat(goalDiff, format)} away from free shipping.`
        goalDrawerProgress.value = totalPrice
      }
    }
  }

  function debounce(func, wait, immediate) {
    let timeout;
    return function () {
      let context = this, args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  let noteDrawer = document.querySelector(".cart_drawer_main [name='note']")
  if (noteDrawer) {
    noteDrawer.addEventListener("keyup", debounce((e) => {
      axios.post("/cart/update.js", {
        note: e.target.value
      })
    }, 500))

  }

  function changeItemQuantity(key, quantity) {
    axios.post("/cart/change.js", {
      id: key,
      quantity
    }).then(res => {
      const format = document.querySelector(".cart_drawer_main [data-money-format]").getAttribute("data-money-format")

      cartCountUpdate(res.data.item_count);
      const totalDiscount = cartDrawerMoneyFormat(res.data.total_discount, format)
      const totalPrice = cartDrawerMoneyFormat(res.data.total_price, format)
      const item = res.data.items.find(item => item.key === key)
      freeDeliveryDrawer(res.data.total_price, format)
      document.querySelector("#drawer-total-price").textContent = totalPrice
      document.querySelector("#drawer-total-discount").textContent = totalDiscount
      let itemDiv = document.querySelector(`.cart-item-drawer[data-key="${key}"]`)
      let itemPrice
      if (item) {
        itemPrice = cartDrawerMoneyFormat(item.final_line_price, format)
        document.querySelector(`[data-key="${key}"] .drawer_line_item_price`).textContent = itemPrice
      } else {
        itemDiv.remove()
      }
      if (res.data.items.length === 0) {
        document.querySelector(".cart-drawer-header").remove();
        document.querySelector(".cart-drawer-form").remove();
        cartCountUpdate(res.data.item_count);
        document.querySelector(".cart-drawer-empty").style.display = "flex";
        document.querySelector(".cart-drawer-empty").classList.add("drawer_empty_main")
        document.querySelectorAll(".cart-icon-status").forEach(icon => {
          icon.classList.add("hidden")
        })
      }

    })
  }

  function lineItemPrice() {

    let cartItems = document.querySelectorAll(".cart-item-drawer")

    cartItems.forEach(item => {
      let key = item.getAttribute("data-key")
      let quantity = item.querySelector(".quantity-counter-drawer input").value

      changeItemQuantity(key, quantity)

    })

  }

  lineItemPrice();

  if (document.querySelector("#cartDrawer")) {
    let cartClose = document.querySelector("#cartClose")
    let cartBtn = document.querySelectorAll(".cart_drawer_btn")
    let cartDrawer = document.querySelector("#cartDrawer")
    if (cartBtn) {
      cartClose.addEventListener("click", (e) => {
        cartDrawer.classList.remove("cart_active")
      })
      document.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          cartDrawer.classList.remove("cart_active")
        }
      })
    }
  }

}

if (document.querySelector("#cartDrawer")) {
  let cartBtn = document.querySelectorAll(".cart_drawer_btn")
  let cartDrawer = document.querySelector("#cartDrawer")
  if (cartBtn) {
    cartBtn.forEach(btn => {
      btn.addEventListener("click", (e) => {
        cartDrawer.classList.toggle("cart_active")
      })
    })
  }
}

cartFunctions();
// Update Cart Drawer

async function updateCartDrawer() {
  const res = await fetch("/?section_id=cart-drawer")
  const text = await res.text();

  const html = document.createElement("div")
  html.innerHTML = text

  let newBox = html.querySelector("#cartDrawer").innerHTML
  document.querySelector("#cartDrawer").innerHTML = newBox;

}

// Ajax Add to Cart

const addToCartForms = document.querySelectorAll("form[action='/cart/add']")

addToCartForms.forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form)
    });

    const res = await fetch("/cart.json")
    const cart = await res.json();

    cartCountUpdate(cart.item_count);

    form.querySelector(".product-add .text").innerText = "Added to Cart!"
    setTimeout(() => {
      form.querySelector(".product-add .text").innerText = "Add to Cart"
    }, 10000)

    await updateCartDrawer();

    await cartFunctions();

    document.querySelector("#cartDrawer").classList.add("cart_active")

    if (form.closest("#quickView")) {
      form.closest("#quickView").classList.remove("quickview_active")
    }

  })
})

function cartCountUpdate(count) {
  document.querySelectorAll(".cart_count").forEach(el => {
    if (count > 0) {
      el.textContent = count;
      el.classList.remove("hidden")
    } else {
      el.textContent = count;
      el.classList.add("hidden")
    }
  })
}