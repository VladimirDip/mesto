export default class Card {
  constructor(
    cardData,
    templateSelector,
    handlerCardClick,
    handlerDeleteClick,
    handlerLikeCard
  ) {
    this._image = cardData.link;
    this._title = cardData.name;
    this._owner = cardData.owner;
    this._id = cardData._id;
    // console.log("cardData => ", cardData);
    this._userId = cardData.userId;
    this._likes = cardData.likes;

    this._templateSelector = templateSelector;

    this._handlerCardClick = handlerCardClick;
    this._handlerDeleteClick = handlerDeleteClick;
    this._handlerLikeCard = handlerLikeCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  generateCard = () => {
    this._element = this._getTemplate();

    this._imageTarget = this._element.querySelector(".card__image");

    this._imageTarget.src = this._image;
    this._imageTarget.alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    this._likeTarget = this._element.querySelector(".card__like");

    this.setLikesInfo();

    if (this._owner._id === this._userId) {
      this._deleteButton = this._element.querySelector(".card__delete");
      this._deleteButton.classList.remove("card__delete_hidden");
    }

    this._setEventListenerCards();

    return this._element;
  };

  setLikesInfo = (dataCard) => {
    if (dataCard) {
      this._likes = dataCard.likes;
    }

    this._likesCount = this._element.querySelector(".card__like-count");
    this._likesCount.textContent = this._likes.length;

    this.isLiked = this._likes.find((elem) => elem._id === this._userId);

    if (this.isLiked) {
      this._likeTarget.classList.add("card__like_active");
    } else {
      this._likeTarget.classList.remove("card__like_active");
    }
  };

  _setEventListenerCards() {
    this._imageTarget.addEventListener("click", () => {
      this._handlerCardClick(this._title, this._image);
    });

    this._likeTarget.addEventListener("click", () => {
      this._handlerLikeCard(this);
    });

    if (this._owner._id === this._userId) {
      // console.log(this._owner);
      this._deleteButton.addEventListener("click", (evt) => {
        this._handlerDeleteClick(evt, this._id);
      });
    }
  }
}
