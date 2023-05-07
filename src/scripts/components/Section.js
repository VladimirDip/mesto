export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._itemsInitialCard = items;

    this.renderer = renderer;
  }

  setCardFromArray() {
    this._itemsInitialCard.forEach((element) => {
      this.addItem(this.renderer(element));
    });
  }

  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
