export default class Card {
  constructor(cardData, templateSelector, popUpOpenImage, handlerDeleteClick) {
    this._cardData = cardData;
    // console.log(this._cardData);
    this._templateSelector = templateSelector;
    this._popUpOpenImage = popUpOpenImage;
    this._handlerDeleteClick = handlerDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._likeTarget = this._element.querySelector(".card__like");
    this._deleteImageButton = this._element.querySelector(".card__delete");
    this._imageTarget = this._element.querySelector(".card__image");
    this._imageTarget.src = this._cardData.link;
    this._imageTarget.alt = this._cardData.name;
    this._element.querySelector(".card__title").textContent =
      this._cardData.name;

    this._setEventListenerCards();
    return this._element;
  };

  _handleLikeClick = () => {
    this._likeTarget.classList.toggle("card__like_active");
  };

  // _handleDeleteButton = (evt) => {
  //   console.log(evt);
  //   const parentDeleteButton = evt.target.closest(".card");
  //   parentDeleteButton.remove();
  // };

  _handleOpenImagePopup = () => {
    this._cardData = { name: this._cardData.name, link: this._cardData.link };

    this._popUpOpenImage(this._cardData);
  };

  _setEventListenerCards() {
    this._likeTarget.addEventListener("click", () => this._handleLikeClick());

    this._deleteImageButton.addEventListener("click", (evt) =>
      this._handlerDeleteClick(evt)
    );

    this._imageTarget.addEventListener("click", this._handleOpenImagePopup);
  }
}
