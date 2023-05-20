export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    // this._itemsInitialCard = items;
    // this._items = items;
    this._renderer = renderer;
  }

  setCardFromArray(items) {
    items.forEach(this._renderer);
  }

  addItem(item, method) {
    if (method === "prepend") {
      this._container.prepend(item);
    } else {
      this._container.append(item);
    }
  }
}
