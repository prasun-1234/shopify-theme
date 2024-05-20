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

const cartBtns = document.querySelectorAll('.quantity-view .button');
const cartInputs = document.querySelectorAll('.quantity-main');
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
    } else {
      const newValue = value - 1
      if (input.parentElement.querySelector("small")) {
        input.parentElement.querySelector("small").style.opacity = "0"
      }
      input.value = newValue
      changeItemQuantity(key, newValue)
    }
  });
});

document.querySelectorAll(".trash-item .remove-product").forEach(remove => {
  remove.addEventListener("click", (e) => {
    e.preventDefault();
    const item = remove.closest(".cart-item-main")
    const key = item.getAttribute("data-key")

    axios.post("/cart/change.js", {
      id: key,
      quantity: 0
    }).then(res => {
      if (res.data.items.length === 0) {
        document.querySelector(".cart-form-main").remove();
        document.querySelector(".cart-empty").style.display = "flex";
      } else {
        const format = document.querySelector("[data-money-format]").getAttribute("data-money-format")
        const totalDiscount = cartMoneyFormat(res.data.total_discount, format)
        const totalPrice = cartMoneyFormat(res.data.total_price, format)
        const originalPrice = cartMoneyFormat(res.data.original_total_price, format)

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

        document.querySelector("#total-discount").textContent = totalDiscount
        document.querySelector("#items-total-price").textContent = totalPrice
        document.querySelector("#original-total-price").textContent = originalPrice
        item.remove();
      }
    })
  })
})

function changeItemQuantity(key, quantity) {
  axios.post("/cart/change.js", {
    id: key,
    quantity
  }).then(res => {
    const format = document.querySelector("[data-money-format]").getAttribute("data-money-format")
    document.querySelectorAll(".cart-count").forEach(el => {
      el.innerHTML = res.data.item_count
    })
    if (res.data.items.length === 0) {
      document.querySelector(".cart-form-main").remove();
      document.querySelector(".cart-empty").style.display = "flex";
    } else {
      const totalDiscount = cartMoneyFormat(res.data.total_discount, format)
      const totalPrice = cartMoneyFormat(res.data.total_price, format)
      const originalPrice = cartMoneyFormat(res.data.original_total_price, format)
      const item = res.data.items.find(item => item.id.toString() === key)
      let itemPrice
      if (item) {
        itemPrice = cartMoneyFormat(item.final_line_price, format)
      }

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

      document.querySelector("#total-discount").textContent = totalDiscount
      document.querySelector("#items-total-price").textContent = totalPrice
      document.querySelector("#original-total-price").textContent = originalPrice
      if (quantity == 0) {
        document.querySelector(`[data-key="${key}"] .line_item_price`).closest(".cart-item-main").remove();
      } else {
        document.querySelector(`[data-key="${key}"] .line_item_price`).textContent = itemPrice
      }
    }
  }).catch(error => {
    console.log('Error:', error);

  });
}

function lineItemPrice() {

  let cartItems = document.querySelectorAll(".cart-item-main")

  cartItems.forEach(item => {
    let key = item.getAttribute("data-key")
    let quantity = item.querySelector(".quantity-main").value

    changeItemQuantity(key, quantity)

  })

}

lineItemPrice();