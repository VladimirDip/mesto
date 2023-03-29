const cardTemplate = document.querySelector('#card').content;
const cardsBlock = document.querySelector('.cards');
const buttonsForOpenPopUp = document.querySelectorAll('[data-button]');
// const buttonsClosePopUp = document.querySelectorAll('.popup__close');

const formElementEditProfile = document.querySelector(
  '[name="popup-edit-profile"]'
);
const descriptionInput = formElementEditProfile.querySelector(
  'input[name="description"]'
);

const nameInput = formElementEditProfile.querySelector('input[name="name"]');
const formElementNewCard = document.querySelector(
  '[name="popup-add-new-card"]'
);
const placeInput = formElementNewCard.querySelector('input[name="name"]');
const linkInput = formElementNewCard.querySelector('input[name="link-image"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popUpOpenImage = document.querySelector('.open-image');
const imagePopUp = popUpOpenImage.querySelector('.popup__image');
const titlePopUp = popUpOpenImage.querySelector('.popup__title-image');

const popUpContainer = document.querySelector('.wrapper-popup');

//array cards
const initialCards = [
  {
    name: 'Tokio',
    link: 'https://images.unsplash.com/photo-1677947244400-8d7cae6166bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'Budapest',
    link: 'https://images.unsplash.com/photo-1678107374646-8ff0a2396302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
  {
    name: 'Cooking untensils',
    link: 'https://images.unsplash.com/photo-1678097337340-ec9c74ebf147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Flowers',
    link: 'https://images.unsplash.com/photo-1678043639199-1c3f826cd95a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
  },
  {
    name: 'Hamburg streets',
    link: 'https://images.unsplash.com/photo-1669884100358-0950856fca7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Little bird',
    link: 'https://images.unsplash.com/photo-1678048632412-f18bbbd3662a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];
//create a new card
const createCard = (item) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  return cardElement;
};

//fill page new cards from array only. It isn't main logic
initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardsBlock.append(newCard);
});

//handler is working with profile form
const handlerFormSubmitProfile = (evt) => {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const descriptionInputValue = descriptionInput.value;

  profileName.textContent = nameInputValue;
  profileDescription.textContent = descriptionInputValue;

  closePopUp();
};

//--------------check to include className into element----------------//
const hasClass = (elem, className) => {
  return elem.className.split(' ').indexOf(className) > -1;
};
//--------------end check to include className into element----------------//

//handler is working with add-new-card form
const handlerFormSubmitAddNewCard = (evt) => {
  evt.preventDefault();
  //write a new card and then prepend
  const newDataFromForm = {};
  newDataFromForm['name'] = placeInput.value;
  newDataFromForm['link'] = linkInput.value;
  const newCardFromForm = createCard(newDataFromForm);
  cardsBlock.prepend(newCardFromForm);

  //update inputs after last operation
  evt.target.reset();

  closePopUp();
};

const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    // console.log('click');
    closePopUp();
  }
};

const closePopUp = () => {
  const targetPopUp = document.querySelector('.popup_opened');
  document.removeEventListener('keydown', keyHandler);
  if (targetPopUp) {
    targetPopUp.classList.remove('popup_opened');
  }
};

const openPopUp = (popup) => {
  document.addEventListener('keydown', keyHandler);
  popup.classList.add('popup_opened');
};

//get text from HTML and put in form
const getTextFromPageToPopUp = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
};
getTextFromPageToPopUp();

//--------------wrapped all the buttons for listener----------------//
buttonsForOpenPopUp.forEach((el) => {
  el.addEventListener('click', (e) => {
    const dataButton = e.currentTarget.getAttribute('data-button');
    const popup = document.querySelector(`[data-target="${dataButton}"]`);
    const currentInputsFormPopUp = Array.from(
      popup.querySelectorAll('.popup__input-form')
    );
    const popupForm = popup.querySelector('.popup__form');

    const currentButtonPopUp = popup.querySelector('.popup__button');
    // console.log(el);
    hideAllInputError(popupForm, currentInputsFormPopUp, configSelectors);
    getTextFromPageToPopUp();
    toggleButtonState(
      currentInputsFormPopUp,
      currentButtonPopUp,
      configSelectors
    );
    openPopUp(popup);
  });
});
//--------------end wrapped all the buttons for listener----------------//

//--------------listeners----------------//
popUpContainer.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup_opened')
  ) {
    closePopUp();
  }
});
formElementEditProfile.addEventListener('submit', handlerFormSubmitProfile);
formElementNewCard.addEventListener('submit', handlerFormSubmitAddNewCard);
//--------------end listeners----------------//

//--------------like, delete open a card----------------//
cardsBlock.addEventListener('click', (e) => {
  if (hasClass(e.target, 'card__like')) {
    e.target.classList.toggle('card__like_active');
  }
  if (hasClass(e.target, 'card__delete')) {
    const parentDeleteButton = e.target.closest('.card');
    parentDeleteButton.remove();
  }
  if (hasClass(e.target, 'card__image')) {
    //get elements from card into HTML
    const getImages = e.target.getAttribute('src');
    const getTitle = e.target
      .closest('.card')
      .querySelector('.card__title').textContent;
    const getImagesAlt = e.target.getAttribute('alt');
    // console.log(getImages, getTitle, getImagesAlt)

    //write data to popup
    imagePopUp.src = getImages;
    imagePopUp.alt = getImagesAlt;
    titlePopUp.textContent = getTitle;

    openPopUp(popUpOpenImage);
  }
});
//--------------end like, delete open a card----------------//
