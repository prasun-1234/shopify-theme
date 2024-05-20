function cartMoneyFormat(cents, format) {
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

let sellingPlanSelectors = document.querySelectorAll('[name="selling-plan"]');
sellingPlanSelectors.forEach(function (element, index) {
  element.addEventListener('change', function (e) {
    let data = {
      line: e.target.dataset.line,
      quantity: e.target.dataset.quantity,
      id: e.target.value,
    };
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Refresh page, or re-render cart
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});


// Quantity Update
const cartBtns = document.querySelectorAll('.quantity-counter-main .button');
const cartInputs = document.querySelectorAll('#inventoryQuantityData');
let form = document.querySelector('.cart-form-main');
cartInputs.forEach(input => {
  let maxMsg = document.createElement("small")
  maxMsg.textContent = "Max limit"
  input.parentElement.append(maxMsg)
  let key = input.parentElement.closest(".cart-item-main").getAttribute("data-key")
  input.addEventListener("change", (e) => {
    changeItemQuantity(key, e.target.value)
  })
})

cartBtns.forEach((btn) => {
  const input = btn.parentElement.querySelector("input")

  btn.addEventListener('click', (e) => {
    const isPlus = btn.classList.contains("plus");
    const value = Number(input.value)
    let max = input.getAttribute("max")
    const key = btn.closest(".cart-item-main").getAttribute("data-key")

    if (isPlus) {
      let newValue = ""
      if (value < max) {
        newValue = value + 1
      } else {
        input.parentElement.querySelector("small").style.opacity = "1"
        newValue = max
      }
      input.value = newValue
      changeItemQuantity(key, newValue)
    } else if (value > 0) {
      const newValue = value - 1
      if (input.parentElement.querySelector("small")) {
        input.parentElement.querySelector("small").style.opacity = "0"
      }
      input.value = newValue
      changeItemQuantity(key, newValue)
    }
  });
});




let cartGoal = document.querySelector(".cart-goal")
let goalMsg = ""
let goalProgress = ""
let freeDel = ""
if (cartGoal) {
  freeDel = cartGoal.getAttribute("data-free")
  goalMsg = cartGoal.querySelector(".goal-msg")
  goalProgress = cartGoal.querySelector("progress")
}

document.querySelectorAll(".trash-item").forEach(remove => {
  remove.addEventListener("click", (e) => {
    e.preventDefault();
    const item = remove.closest(".cart-item-main")
    const key = item.getAttribute("data-key")

    axios.post("/cart/change.js", {
      id: key,
      quantity: 0
    }).then(res => {
      if (res.data.items.length === 0) {
        document.querySelector(".cart-header").remove();
        document.querySelector(".cart-form-main").remove();
        document.querySelector(".cart-empty").style.display = "flex";
      } else {
        const format = document.querySelector("[data-money-format]").getAttribute("data-money-format")
        const itemsQuantity = res.data.item_count
        const itemsSubtotalPrice = cartMoneyFormat(res.data.items_subtotal_price, format)
        const totalDiscount = cartMoneyFormat(res.data.total_discount, format)
        const totalPrice = cartMoneyFormat(res.data.total_price, format)
        freeDelivery(res.data.total_price, format)
        document.querySelector("#total-price").textContent = totalPrice
        document.querySelector("#total-discount").textContent = totalDiscount
        document.querySelector('#original-total-price').textContent = cartMoneyFormat(res.data.original_total_price, format);

        if (document.querySelector("#discount-amount")) {
          document.querySelectorAll("#discount-amount li").forEach(listItem => {
            let itemTotalDiscountArray = []
            let discountTitle = listItem.getAttribute("data-title")
            const itemDiscounts = res.data.cart_level_discount_applications.filter(item => item.discount_application.title == discountTitle)
            itemDiscounts.forEach((discount, index) => {
              itemTotalDiscountArray.push(discount.discount_application.total_allocated_amount)
            })
            let itemTotalDiscountAmt = itemTotalDiscountArray.reduce((a, b) => a + b, 0)
            let itemTotalDiscount = cartMoneyFormat(itemTotalDiscountAmt, format)
            listItem.querySelector("span").textContent = itemTotalDiscount
          })
        }
        item.remove();
      }
    })
  })
})

function freeDelivery(totalPrice, format) {
  if (cartGoal) {
    if (totalPrice >= freeDel) {
      goalMsg.innerHTML = "You've got free shipping"
      goalProgress.value = totalPrice
    } else {
      let goalDiff = freeDel - totalPrice
      goalMsg.innerHTML = `You're only ${cartMoneyFormat(goalDiff, format)} away from free shipping.`
      goalProgress.value = totalPrice
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

let note = document.querySelector("[name='note']")

if (note) {
  note.addEventListener("keyup", debounce((e) => {
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
    if (res.data.items.length === 0) {
      console.log(res.data.items.length)
      document.querySelector(".cart-header").remove();
      document.querySelector(".cart-form-main").remove();
      document.querySelector(".cart-empty").style.display = "flex";
    } else {
      const format = document.querySelector("[data-money-format]").getAttribute("data-money-format")
      const totalDiscount = cartMoneyFormat(res.data.total_discount, format)
      const totalPrice = cartMoneyFormat(res.data.total_price, format)
      const item = res.data.items.find(item => item.key === key)
      let itemPrice
      if (item) {
        itemPrice = cartMoneyFormat(item.final_line_price, format)
        document.querySelector(`[data-key="${key}"] .line_item_price`).textContent = itemPrice
      } else {
        document.querySelector(`.cart-item-main[data-key="${key}"]`).remove()
      }
      freeDelivery(res.data.total_price, format)
      document.querySelector("#total-price").textContent = totalPrice
      document.querySelector("#total-discount").textContent = totalDiscount
      document.querySelector('#original-total-price').textContent = cartMoneyFormat(res.data.original_total_price, format);

      if (document.querySelector("#discount-amount")) {
        document.querySelectorAll("#discount-amount li").forEach(listItem => {
          let itemTotalDiscountArray = []
          let discountTitle = listItem.getAttribute("data-title")
          const itemDiscounts = res.data.cart_level_discount_applications.filter(item => item.discount_application.title == discountTitle)
          itemDiscounts.forEach((discount, index) => {
            itemTotalDiscountArray.push(discount.discount_application.total_allocated_amount)
          })
          let itemTotalDiscountAmt = itemTotalDiscountArray.reduce((a, b) => a + b, 0)
          let itemTotalDiscount = cartMoneyFormat(itemTotalDiscountAmt, format)
          listItem.querySelector("span").textContent = itemTotalDiscount
        })
      }

    }

  })
}



function lineItemPrice() {

  let cartItems = document.querySelectorAll(".cart-item-main")

  cartItems.forEach(item => {
    let key = item.getAttribute("data-key")
    let quantity = item.querySelector(".quantity-counter-main input").value

    changeItemQuantity(key, quantity)

  })

}

lineItemPrice();




