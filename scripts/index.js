import Card from './card.js';
import { configSelectors, FormValidator } from './formValidator.js';
import { initialCards } from './data.js';

import {
  buttonEditProfile,
  buttonNewCard,
  cardsBlock,
  descriptionInput,
  formElementEditProfile,
  formElementNewCard,
  formElements,
  imagePopUp,
  linkInput,
  nameInput,
  placeInput,
  popUpContainer,
  popupEditProfile,
  popupNewCard,
  profileDescription,
  profileName,
  selectorPopUpOpenImage,
  titlePopUp,
} from './variables.js';

const forms = {};

const createCard = (paramsCards, selectorCardPlace, popupImage) => {
  const card = new Card(paramsCards, selectorCardPlace, popupImage);
  return card.generateCard();
};

formElements.forEach((item) => {
  // console.log(item.getAttribute('name'));
  const form = new FormValidator(configSelectors, item);
  const name = item.getAttribute('name');
  form.enableValidation();
  forms[name] = form;
  // console.log(form);
});
// console.log(forms);

const checkOpenPopup = () => {
  return document.querySelector('.popup_opened');
};

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const targetOpenPopup = checkOpenPopup();
    // console.log('click');
    closePopUp(targetOpenPopup);
  }
};
const closeByClickEmptyArea = (evt) => {
  const targetOpenPopup = checkOpenPopup();
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup_opened')
  ) {
    closePopUp(targetOpenPopup);
  }
};

const closePopUp = (popup) => {
  // console.log(popup);
  document.removeEventListener('keydown', closeByEscape);
  popup.classList.remove('popup_opened');
  popUpContainer.removeEventListener('click', closeByClickEmptyArea);
};

const openPopUp = (popup) => {
  // console.log(popup);
  document.addEventListener('keydown', closeByEscape);
  popup.classList.add('popup_opened');
  popUpContainer.addEventListener('click', closeByClickEmptyArea);
};

const openPopupImage = (data) => {
  imagePopUp.src = data.link;
  imagePopUp.alt = data.name;
  titlePopUp.textContent = data.name;

  openPopUp(selectorPopUpOpenImage);
};

//handler is working with profile form
const handlerFormSubmitProfile = (evt) => {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const descriptionInputValue = descriptionInput.value;

  profileName.textContent = nameInputValue;
  profileDescription.textContent = descriptionInputValue;
  closePopUp(popupEditProfile);
};

//handler is working with add-new-card form
const handlerFormSubmitAddNewCard = (evt) => {
  evt.preventDefault();
  //write a new card and then prepend
  const newDataFromForm = {};
  newDataFromForm['name'] = placeInput.value;
  newDataFromForm['link'] = linkInput.value;
  const newCard = createCard(newDataFromForm, '#card', openPopupImage);
  cardsBlock.prepend(newCard);

  //update inputs after last operation
  evt.target.reset();

  closePopUp(popupNewCard);
};

//get text from HTML and put in form
const getTextFromPageToPopUp = () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // console.log(descriptionInput.value);
  // console.log(nameInput.value);
};
getTextFromPageToPopUp();

//--------------Open popup Edit Profile----------------//
buttonEditProfile.addEventListener('click', () => {
  // console.log(forms);
  forms['popup-edit-profile'].resetValidation();
  openPopUp(popupEditProfile);
});
//-------------- end Open popup Edit Profile----------------//

//--------------Open popup New Card----------------//
buttonNewCard.addEventListener('click', () => {
  forms['popup-add-new-card'].resetValidation();
  openPopUp(popupNewCard);
});
//-------------- end Open popup New Card----------------//

//--------------listeners----------------//
// popUpContainer.addEventListener('click', closeByClickEmptyArea);
formElementEditProfile.addEventListener('submit', handlerFormSubmitProfile);
formElementNewCard.addEventListener('submit', handlerFormSubmitAddNewCard);
//--------------end listeners----------------//

initialCards.forEach((item) => {
  const newCard = createCard(item, '#card', openPopupImage);
  cardsBlock.append(newCard);
});
