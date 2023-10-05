import isValidInn from "./validator";

export default class CardWidget {
  constructor(ParentEl) {
    this.parentEl = ParentEl;
    this.onSubmit = this.onSubmit.bind(this);
  }
  static get markup() {
    return `
    <div class="col-md-5">
        <h3>Check your credit card number</h3>
        <ul class="cards list-unstyled">
            <li><span class="card visa" title="Visa">Visa</span></li>
            <li><span class="card master" title="Mastercard">Mastercard</span></li>
            <li><span class="card amex" title="American Express">American Express</span></li>
            <li><span class="card discover" title="Discover">Discover</span></li>
            <li><span class="card jcb" title="JCB">JCB</span></li>
            <li><span class="card diners_club" title="Diners Club">Diners Club</span></li>
        </ul>
        <form id="form" class="form-inline">
        <div class="form-group">
            <input class="form-control col-md-6" id="cardNumber" name="card_number" type="text" placeholder="Credit card number">
             <button class="submit">Click to Validate</button>
        </div>
        </form>
    </div>
        `;
  }

  static get submitSelector() {
    return "#form";
  }

  static get inputSelector() {
    return "#cardNumber";
  }

  static get selector() {
    return "#form";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardWidget.markup;
    //
    this.element = this.parentEl.querySelector(CardWidget.selector);
    // this.submit = this.element.querySelector(CardWidget.submitSelector);
    this.input = this.element.querySelector(CardWidget.inputSelector);
    console.log(this.element);
    this.element.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.input.value;
    console.log(value);
  }
}
