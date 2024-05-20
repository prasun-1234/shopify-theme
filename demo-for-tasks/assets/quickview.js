function quickMoneyFormat(cents, format) {
  if (typeof cents == "string") {
    cents = cents.replace(".", "");
  }
  let value = "";
  let placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  let formatString = format || this.money_format;

  function defaultOption(opt, def) {
    return typeof opt == "undefined" ? def : opt;
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    let parts = number.split("."),
      dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands),
      cents = parts[1] ? decimal + parts[1] : "";

    return dollars + cents;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
  }

  return formatString.replace(placeholderRegex, value);
}

let btns = document.querySelectorAll(".quickview_btn");

function quickViewBtns(buttons) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let quickViewModal = document.querySelector("#quickView");
      let product = btn.getAttribute("data-handle");
      if (product) {
        quickViewModal.classList.add("quickview_active");
        quickView(product);
      }
    });
  });
}

quickViewBtns(btns);

async function quickView(product_handle) {
  const response = await fetch("/products/" + product_handle + ".js");
  const product = await response.json();
  let quickViewModal = document.querySelector("#quickView");
  let format = quickViewModal.getAttribute("data-money-quickview");
  let form = quickViewModal.querySelector("form");
  let titleLink = quickViewModal.querySelector(".product_title_link");
  let title = quickViewModal.querySelector(".product_title");
  let description = quickViewModal.querySelector(".product_description");
  let img = quickViewModal.querySelector(".product_image");
  let price = quickViewModal.querySelector(".product_price");
  let stock = quickViewModal.querySelector(".product_stock");
  let quantity = quickViewModal.querySelector("#quickview_quantity");
  let inStock = quickViewModal.querySelector(".blink.in-stock");
  let noStock = quickViewModal.querySelector(".blink.out-stock");
  let variantSelect = quickViewModal.querySelector(
    ".product_options select[name='id']"
  );
  let isPreorder
  product.tags.forEach(tag=>{
    if(tag == "preorder"){
      isPreorder = true
    }
  })
  let compareAtPrice = "";
  let optionsList = quickViewModal.querySelector(".product_options_list");
  form.setAttribute("id", `product_form_${product.id}`);
  titleLink.setAttribute("href", product.url);
  title.innerText = product.title;
  quantity.setAttribute("max", 100);
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  description.innerText = removeTags(product.description);
  price.innerText = quickMoneyFormat(product.price, format);
  if (
    product.compare_at_price != product.price &&
    product.compare_at_price > 0
  ) {
    compareAtPrice = document.createElement("span");
    compareAtPrice.innerText = quickMoneyFormat(
      product.compare_at_price,
      format
    );
    compareAtPrice.setAttribute("class", "line-through opacity-70");
    price.prepend(compareAtPrice);
  }
  if (product.available == true) {
    stock.innerText = "In Stock";
  } else {
    stock.innerText = "Out of Stock";
  }
  let add = document.querySelector("#quickView .product-add");
  let buy = document.querySelector("#quickView .product-buy");
  let addText = add.querySelector(".text");
  let buyText = buy.querySelector(".text");
  if (product.available) {
    addText.textContent = "Add to Cart";
    buyText.textContent = "Buy Now";
    buy.disabled = false;
    add.disabled = false;
  } else {
    addText.textContent = "Out of Stock";
    add.disabled = true;
    buyText.textContent = "Out of Stock";
    buy.disabled = true;
  }
  if(isPreorder){
    addText.textContent = "Preorder"
    buy.style.display = "none"
  }else{
    addText.textContent = "Add to Cart"
    buy.style.display = "flex"
  }
  variantSelect.innerHTML = "";
  product.variants.forEach((variant) => {
    let option = document.createElement("option");
    option.setAttribute("value", variant.id);
    option.innerHTML = `${variant.title} - ${quickMoneyFormat(
      variant.price,
      format
    )}`;
    variantSelect.append(option);
  });
  optionsList.innerHTML = "";
  product.options.forEach((option) => {
    let field = document.createElement("fieldset");
    let title = document.createElement("legend");
    let optionVal = document.createElement("span");
    optionVal.classList.add("option_val");
    title.innerText = `${option.name}:`;
    title.append(optionVal);
    let list = document.createElement("ul");
    option.values.forEach((value) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `<div class="${
        option.name == "Color" ? "color_input radio_input" : "radio_input"
      }" tabindex="0"><input type="radio" value="${value}" id="quickview__${
        option.name
      }--${value}" name="${option.name}" /><label for="quickview__${
        option.name
      }--${value}">${value}</label></div>`;
      list.append(listItem);
    });
    field.append(title);
    field.append(list);
    optionsList.append(field);
  });
  document
    .querySelectorAll("#quickview_options input[type='radio']")
    .forEach((radio) => {
      radio.addEventListener("change", () => {
        let selectedOptions = [];

        document
          .querySelectorAll("#quickview_options input[type='radio']:checked")
          .forEach((radio) => {
            selectedOptions.push(radio.value);
          });

        // Match Variant with Selections

        let matchedVariant = product.variants.find((variant) => {
          let pass = true;

          for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions.indexOf(variant.options[i]) === -1) {
              pass = false;
              break;
            }
          }

          return pass;
        });
        // Change Product Variant ID

        radio.closest("fieldset").querySelector(".option_val").innerText =
          radio.value;
        if (matchedVariant) {
          document.querySelector("#quickview_product_id").value =
            matchedVariant.id;

          document.querySelector("#quickview_variant_select").value =
            matchedVariant.id;
        }

        // Change Variant Image

        if (matchedVariant && matchedVariant.featured_image) {
          img.setAttribute("src", matchedVariant.featured_image.src);
          img.setAttribute("alt", matchedVariant.featured_image.alt);
        }
        if (matchedVariant) {
          let urlParams = new URLSearchParams(window.location.search);
          urlParams.set("variant", matchedVariant.id);
          let newUrl = `${window.location.pathname}?${urlParams.toString()}`;
          window.history.replaceState(null, null, newUrl);
        }

        // Product Price

        if (matchedVariant) {
          price.innerText = quickMoneyFormat(matchedVariant.price, format);
          if (matchedVariant.compare_at_price) {
            compareAtPrice.innerText = formatMoney(
              matchedVariant.compare_at_price,
              format
            );
          }
        }



        // Change Variant
        if (matchedVariant) {
          if (matchedVariant.available) {
            stock.innerText = "In Stock";
            addText.textContent = "Add to Cart";
            buyText.textContent = "Buy Now";
            buy.disabled = false;
            add.disabled = false;
            inStock.style.display = "block";
            noStock.style.display = "none";
          } else {
            stock.innerText = "Out of Stock";
            addText.textContent = "Out of Stock";
            add.disabled = true;
            buyText.textContent = "Out of Stock";
            buy.disabled = true;
            noStock.style.display = "block";
            inStock.style.display = "none";
          }
        } else {
          stock.innerText = "Out of Stock";
          addText.textContent = "Out of Stock";
          add.disabled = true;
          buyText.textContent = "Out of Stock";
          buy.disabled = true;
          noStock.style.display = "block";
          inStock.style.display = "none";
        }
       
        if(isPreorder){
          addText.textContent = "Preorder"
          buy.style.display = "none"
        }else{
          addText.textContent = "Add to Cart"
          buy.style.display = "flex"
        }
      });
    });
  let productBuy = document.querySelector("#quickView .product-buy")
  if(productBuy){
    productBuy.addEventListener("click", (e) => {
      e.preventDefault();

      let form = document.querySelector("#quickView form");

      let input = document.createElement("input");
      input.value = "/checkout";
      input.type = "hidden";
      input.name = "return_to";

      form.appendChild(input);
      form.submit();
    });
  }

  img.setAttribute("src", `${product.featured_image}`);

  let stock_text = stock.innerHTML;
  if (stock_text == "In Stock") {
    inStock.style.display = "block";
    noStock.style.display = "none";
  } else if (stock_text == "Out of Stock") {
    noStock.style.display = "block";
    inStock.style.display = "none";
  }
}

let modalClose = document.querySelector("#quickView .modal-close");
modalClose.addEventListener("click", (e) => {
  let quickViewModal = document.querySelector("#quickView");
  quickViewModal.classList.remove("quickview_active");
  btns.forEach((btn) => {
    btn.setAttribute("aria-expanded", false);
  });
});

window.addEventListener("keyup", (e) => {
  let quickViewModal = document.querySelector("#quickView");
  if (
    e.key == "Escape" &&
    quickViewModal.classList.contains("quickview_active")
  ) {
    quickViewModal.classList.remove("quickview_active");
  }
});
