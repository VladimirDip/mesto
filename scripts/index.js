import Card from './card.js';
import { FormValidator, configSelectors } from './validate.js';
import { initialCards } from './data.js';

import * as allSelectors from './variables.js';
import { selectorPopUpOpenImage } from './variables.js';

const forms = {};

allSelectors.formElements.forEach((item) => {
  // console.log(item.getAttribute('name'));
  const form = new FormValidator(configSelectors, item);
  const name = item.getAttribute('name');
  form.enableValidation();
  forms[name] = form;
});
// console.log(forms);

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    // console.log('click');
    closePopUp();
  }
};

const closePopUp = () => {
  const targetPopUp = document.querySelector('.popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  if (targetPopUp) {
    targetPopUp.classList.remove('popup_opened');
  }
};

const openPopUp = (popup) => {
  document.addEventListener('keydown', closeByEscape);
  popup.classList.add('popup_opened');
};

const openPopupImage = (data) => {
  allSelectors.imagePopUp.src = data.link;
  allSelectors.imagePopUp.alt = data.name;
  allSelectors.titlePopUp.textContent = data.name;
  openPopUp(selectorPopUpOpenImage);
};

//handler is working with profile form
const handlerFormSubmitProfile = (evt) => {
  evt.preventDefault();

  const nameInputValue = allSelectors.nameInput.value;
  const descriptionInputValue = allSelectors.descriptionInput.value;

  allSelectors.profileName.textContent = nameInputValue;
  allSelectors.profileDescription.textContent = descriptionInputValue;

  closePopUp();
};

//handler is working with add-new-card form
const handlerFormSubmitAddNewCard = (evt) => {
  evt.preventDefault();
  //write a new card and then prepend
  const newDataFromForm = {};
  newDataFromForm['name'] = allSelectors.placeInput.value;
  newDataFromForm['link'] = allSelectors.linkInput.value;
  const newCardFromForm = new Card(newDataFromForm, '#card', openPopupImage);
  allSelectors.cardsBlock.prepend(newCardFromForm.generateCard());

  //update inputs after last operation
  evt.target.reset();

  closePopUp();
};

//get text from HTML and put in form
const getTextFromPageToPopUp = () => {
  allSelectors.nameInput.value = allSelectors.profileName.textContent;
  allSelectors.descriptionInput.value =
    allSelectors.profileDescription.textContent;
};
// getTextFromPageToPopUp();

//--------------Open popup Edit Profile----------------//
allSelectors.buttonEditProfile.addEventListener('click', () => {
  const popupEditProfile = document.querySelector(
    `[data-target="button-edit-profile"]`
  );
  getTextFromPageToPopUp();
  forms['popup-edit-profile'].resetValidation();
  openPopUp(popupEditProfile);
});
//-------------- end Open popup Edit Profile----------------//

//--------------Open popup New Card----------------//
allSelectors.buttonNewCard.addEventListener('click', () => {
  const popupNewCard = document.querySelector(
    `[data-target="button-add-new-card"]`
  );
  forms['popup-add-new-card'].resetValidation();
  openPopUp(popupNewCard);
});
//-------------- end Open popup New Card----------------//

//--------------listeners----------------//
allSelectors.popUpContainer.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup_opened')
  ) {
    closePopUp();
  }
});
allSelectors.formElementEditProfile.addEventListener(
  'submit',
  handlerFormSubmitProfile
);
allSelectors.formElementNewCard.addEventListener(
  'submit',
  handlerFormSubmitAddNewCard
);
//--------------end listeners----------------//

initialCards.forEach((item) => {
  const card = new Card(item, '#card', openPopupImage);
  const cardElement = card.generateCard();

  allSelectors.cardsBlock.append(cardElement);
});
