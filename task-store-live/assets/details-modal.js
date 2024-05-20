class DetailsModal extends HTMLElement {
  constructor() {
    super();
    this.detailsContainer = this.querySelector('details');
    this.summaryToggle = this.querySelector('summary');

    this.detailsContainer.addEventListener('keyup', (event) => event.code.toUpperCase() === 'ESCAPE' && this.close());
    this.summaryToggle.addEventListener('click', this.onSummaryClick.bind(this));
    this.querySelector('button[type="button"]').addEventListener('click', this.close.bind(this));

    this.summaryToggle.setAttribute('role', 'button');
  }

  isOpen() {
    return this.detailsContainer.hasAttribute('open');
  }

  onSummaryClick(event) {
    event.preventDefault();
    event.target.closest('details').hasAttribute('open') ? this.close() : this.open(event);
  }

  onBodyClick(event) {
    if (!this.contains(event.target) || event.target.classList.contains('modal-overlay')) this.close(false);
  }

  open(event) {
    this.onBodyClickEvent = this.onBodyClickEvent || this.onBodyClick.bind(this);
    event.target.closest('details').setAttribute('open', true);
    document.body.addEventListener('click', this.onBodyClickEvent);
    document.body.classList.add('overflow-hidden');

    trapFocus(
      this.detailsContainer.querySelector('[tabindex="-1"]'),
      this.detailsContainer.querySelector('input:not([type="hidden"])')
    );
  }

  close(focusToggle = true) {
    removeTrapFocus(focusToggle ? this.summaryToggle : null);
    this.detailsContainer.removeAttribute('open');
    document.body.removeEventListener('click', this.onBodyClickEvent);
    document.body.classList.remove('overflow-hidden');
  }
}

customElements.define('details-modal', DetailsModal);



const quoteModal = () => {
  let elements = document.querySelectorAll(".quote_details_modal")
  elements.forEach(modal => {
    let summary = modal.querySelector('summary');
    let closeButton = modal.querySelector('.form-close-button')
    let body = document.querySelector('body')
    summary.addEventListener('click', () => {
      let isOpen = body.classList.contains('overflowHidden')
      isOpen ? body.classList.remove('overflowHidden') : body.classList.add('overflowHidden');
    })
    window.addEventListener("keyup", (e) => {
      if (e.key == "Escape") {
        modal.removeAttribute("open")
      }
    })
    closeButton.addEventListener('click', () => {
      modal.removeAttribute("open")
      body.classList.remove('overflow-hidden-tablet')
      body.classList.remove('overflowHidden')
    })

  })
}

quoteModal()