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
            <li><span class="card visa cdisabled" title="Visa">Visa</span></li>
            <li><span class="card master cdisabled" title="Mastercard">Mastercard</span></li>
            <li><span class="card amex cdisabled" title="American Express">American Express</span></li>
            <li><span class="card discover cdisabled" title="Discover">Discover</span></li>
            <li><span class="card jcb cdisabled" title="JCB">JCB</span></li>
            <li><span class="card mir cdisabled" title="Мир">Мир</span></li>
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

  static get inputSelector() {
    return "#cardNumber";
  }

  static get selector() {
    return "#form";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardWidget.markup;
    this.element = this.parentEl.querySelector(CardWidget.selector);
    this.input = this.element.querySelector(CardWidget.inputSelector);
    this.element.addEventListener("submit", this.onSubmit);
    this.images = this.parentEl.querySelectorAll(".card");
    this.status = document.querySelectorAll(".status");
  }
  checkCardNumber(value) {
    if (value.length < 13) return false;
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
      let cardNumber = parseInt(value[i], 10);

      if ((value.length - i) % 2 === 0) {
        cardNumber *= 2;
        if (cardNumber > 9) {
          cardNumber -= 9;
        }
      }

      sum += cardNumber;
    }

    return sum !== 0 && sum % 10 === 0;
  }

  checkCardSystem(value) {
    if (/^4\d{12}(?:\d{3})/.test(value)) {
      return ".visa";
    } else if (/(^5[1-5])\d{14}/.test(value)) {
      return ".master";
    } else if (/(^3[47])\d{13}/.test(value)) {
      return ".amex";
    } else if (/^(?:2131|1800|35\d{3})\d{11}/.test(value)) {
      return ".jcb";
    } else if (/(^2||6)\d{15}/.test(value)) {
      return ".mir";
    } else if (
      /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})/.test(
        value
      )
    ) {
      return ".discover";
    }

    return null;
  }

  changeCardImage(cardSystem) {
    for (const cardsListItem of this.images) {
      cardsListItem.classList.add("cdisabled");
    }
    document.querySelector(cardSystem).classList.remove("cdisabled");
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.input.value;
    if (this.checkCardNumber(value)) {
      this.status[0].textContent = "";
      this.changeCardImage(this.checkCardSystem(value));
    } else {
      this.status[0].textContent = "Вы ввели неверный номер карты";
      for (const cardsListItem of this.images) {
        cardsListItem.classList.add("cdisabled");
      }
    }
  }
}
