// Function to check if an element is visible in the viewport
function isVisible(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  return (elemTop >= 0) && (elemBottom <= window.innerHeight);
}

// Define the event handler function
async function handleScroll() {
  // Remove the event listener to ensure this function only executes once
  document.removeEventListener("scroll", handleScroll);

  let loader = document.querySelector(".infinite_loader");

  // Check if loader element is visible
  if (isVisible(loader)) {
    const response = await fetch(loader.dataset.nextPageUrl);
    const data = await response.text();
    const parser = new DOMParser();
    const newDocument = parser.parseFromString(data, "text/html");
    const productGrid = newDocument.querySelector("#product-grid");

    // Append new content to the product grid
    document.querySelector("#product-grid").insertAdjacentHTML("beforeend", productGrid.innerHTML);

    // Replace loader with the new loader from the fetched content
    const newLoader = newDocument.querySelector("#infinite-scroll");
    loader.replaceWith(newLoader);

    // Trigger custom event for pagination
    const event = new CustomEvent("paginate.next");
    newLoader.dispatchEvent(event);


    // Quickview
    let newBtns = document.querySelectorAll(".quickview_btn")
    quickViewBtns(newBtns);

    // Variant buttons
    let newCards = document.querySelectorAll(".card-wrapper")
    cardVariants(newCards)

    // Quantity Count
    let quantityCounters = document.querySelectorAll(".quantity-counter")
    quantityCount(quantityCounters);

    // addForms
    let addForms = document.querySelectorAll(".add_form form[action='/cart/add']")
    addForm(addForms);


  }

  // Re-attach the scroll event listener after the asynchronous operations have completed
  document.addEventListener("scroll", handleScroll);
}

// Attach the scroll event listener
document.addEventListener("scroll", handleScroll);
