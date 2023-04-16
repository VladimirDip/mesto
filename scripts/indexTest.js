import { initialCards } from './data.js';
import * as allSelectors from './variables.js';
import Card from './card.js';
import { selectorPopUpOpenImage } from './variables.js';

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
  newDataFromForm['name'] = placeInput.value;
  newDataFromForm['link'] = linkInput.value;
  const newCardFromForm = createCard(newDataFromForm);
  cardsBlock.prepend(newCardFromForm);

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
getTextFromPageToPopUp();

//--------------Open popup Edit Profile----------------//
allSelectors.buttonEditProfile.addEventListener('click', () => {
  const popupEditProfile = document.querySelector(
    `[data-target="button-edit-profile"]`
  );

  const currentInputsFormPopUp = Array.from(
    popupEditProfile.querySelectorAll('.popup__input-form')
  );
  const popupForm = popupEditProfile.querySelector('.popup__form');

  const currentButtonPopUp = popupEditProfile.querySelector('.popup__button');
  // console.log(el);
  hideAllInputError(popupForm, currentInputsFormPopUp, configSelectors);
  getTextFromPageToPopUp();
  toggleButtonState(
    currentInputsFormPopUp,
    currentButtonPopUp,
    configSelectors
  );
  openPopUp(popupEditProfile);
});
//-------------- end Open popup Edit Profile----------------//

//--------------Open popup New Card----------------//
allSelectors.buttonNewCard.addEventListener('click', () => {
  const popupEditProfile = document.querySelector(
    `[data-target="button-add-new-card"]`
  );

  const currentInputsFormPopUp = Array.from(
    popupEditProfile.querySelectorAll('.popup__input-form')
  );
  const popupForm = popupEditProfile.querySelector('.popup__form');

  const currentButtonPopUp = popupEditProfile.querySelector('.popup__button');
  // console.log(el);
  hideAllInputError(popupForm, currentInputsFormPopUp, configSelectors);
  toggleButtonState(
    currentInputsFormPopUp,
    currentButtonPopUp,
    configSelectors
  );
  openPopUp(popupEditProfile);
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
