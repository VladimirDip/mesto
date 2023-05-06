import Card from './scripts/components/Card.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import FormValidator from './scripts/components/FormValidator.js';

import { initialCards } from './scripts/data.js';
import {
  buttonEditProfile,
  buttonNewCard,
  formElements,
  dataInfo,
  configSelectors,
  selectionCardPlace,
  popupEditProfileSelector,
  popupImageSelector,
  cardsBlockSelector,
  popupAddNewCardSelector,
  forms,
} from './scripts/utils/variables.js';

const userInfo = new UserInfo(dataInfo);
const popupImage = new PopupWithImage(popupImageSelector);

//--------------Create new section on page----------------//
const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, selectionCardPlace, popupImage.open);
      return card.generateCard();
    },
  },
  cardsBlockSelector
);
section.setCardFromArray();
//--------------end Create new section on page----------------//

//--------------Create our popup classes----------------//

const popupProfile = new PopupWithForm(popupEditProfileSelector, (evt) => {
  evt.preventDefault();
  console.log(popupProfile.getInputsValue());
  userInfo.setUserInfo(popupProfile.getInputsValue());
  popupProfile.close();
});

const popupAddCard = new PopupWithForm(popupAddNewCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputsValue()));
  popupAddCard.close();
});
//--------------End Create our popup classes----------------//

//--------------Create validation on our forms----------------//

formElements.forEach((item) => {
  // console.log(item.getAttribute('name'));
  const form = new FormValidator(configSelectors, item);
  const name = item.getAttribute('name');
  form.enableValidation();
  forms[name] = form;
  // console.log(form);
});
//--------------End Create validation on our forms----------------//

//--------------Open popup Edit Profile----------------//
buttonEditProfile.addEventListener('click', () => {
  forms['popup-edit-profile'].resetValidation();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
});
//-------------- end Open popup Edit Profile----------------//

//--------------Open popup New Card----------------//
buttonNewCard.addEventListener('click', () => {
  forms['popup-add-new-card'].resetValidation();
  popupAddCard.open();
});
//-------------- end Open popup New Card----------------//

//--------------listeners----------------//
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
//--------------end listeners----------------//
