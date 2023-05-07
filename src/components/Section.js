export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    // this._itemsInitialCard = items;

    this.renderer = renderer;
  }

  setCardFromArray(items) {
    items.forEach((element) => {
      this.addItem(this.renderer(element));
    });
  }

  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
