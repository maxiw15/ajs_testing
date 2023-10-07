import CardWidget from "./CardWidget";

describe("CardWidget", () => {
  let cardWidget;
  let parentEl;

  beforeEach(() => {
    parentEl = document.createElement("div");
    cardWidget = new CardWidget(parentEl);
    cardWidget.bindToDOM();
  });

  afterEach(() => {
    parentEl.innerHTML = "";
  });

  test("bindToDOM method should render the card widget", () => {
    expect(parentEl.querySelector(".form-inline")).toBeDefined();
  });

  test("checkCardNumber method should return true for a valid card number", () => {
    const cardNumber = "4111111111111111";
    expect(cardWidget.checkCardNumber(cardNumber)).toBe(true);
  });

  test("checkCardNumber method should return false for an invalid card number", () => {
    let cardNumber = "1234567890123456";
    expect(cardWidget.checkCardNumber(cardNumber)).toBe(false);
  });

  test("checkCardSystem method should return .visa", () => {
    let cardNumber = "4485188458300703";
    expect(cardWidget.checkCardSystem(cardNumber)).toBe(".visa");
  });

  test("checkCardSystem method should return .master", () => {
    let cardNumber = "5334667991314271";
    expect(cardWidget.checkCardSystem(cardNumber)).toBe(".master");
  });

  test("checkCardSystem method should return .amex", () => {
    let cardNumber = "343128531315765";
    expect(cardWidget.checkCardSystem(cardNumber)).toBe(".amex");
  });

  test("checkCardSystem method should return .jcb", () => {
    let cardNumber = "3535047058821199";
    expect(cardWidget.checkCardSystem(cardNumber)).toBe(".jcb");
  });


  test("checkCardSystem method should return .mir", () => {
    let cardNumber = "2202770212727079";
    expect(cardWidget.checkCardSystem(cardNumber)).toBe(".mir");
  });
});
