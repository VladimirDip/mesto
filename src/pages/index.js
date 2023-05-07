import "./index.css";

import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

import { initialCards } from "../data.js";
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
} from "../utils/variables.js";

const userInfo = new UserInfo(dataInfo);
const popupImage = new PopupWithImage(popupImageSelector);

//--------------Create new section on page----------------//
const section = new Section((element) => {
  const card = new Card(element, selectionCardPlace, popupImage.open);
  return card.generateCard();
}, cardsBlockSelector);

section.setCardFromArray(initialCards);
//--------------end Create new section on page----------------//

//--------------Handlers----------------//

const handlerProfile = (dataProfile) => {
  userInfo.setUserInfo({
    name: dataProfile.name,
    description: dataProfile.description,
  });
  // console.log(userInfo);
  popupProfile.close();
};

const handlerAddNewCard = (dataCard) => {
  section.addItem(
    section.renderer({ name: dataCard.name, link: dataCard.link })
  );
  popupAddCard.close();
};
//--------------End Handlers----------------//

//--------------Create our popup classes----------------//

const popupProfile = new PopupWithForm(
  popupEditProfileSelector,
  handlerProfile
);

const popupAddCard = new PopupWithForm(
  popupAddNewCardSelector,
  handlerAddNewCard
);
//--------------End Create our popup classes----------------//

//--------------Create validation on our forms----------------//

formElements.forEach((item) => {
  // console.log(item.getAttribute('name'));
  const form = new FormValidator(configSelectors, item);
  const name = item.getAttribute("name");
  form.enableValidation();
  forms[name] = form;
  // console.log(form);
});
//--------------End Create validation on our forms----------------//

//--------------Open popup Edit Profile----------------//
buttonEditProfile.addEventListener("click", () => {
  forms["popup-edit-profile"].resetValidation();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
});
//-------------- end Open popup Edit Profile----------------//

//--------------Open popup New Card----------------//
buttonNewCard.addEventListener("click", () => {
  forms["popup-add-new-card"].resetValidation();
  popupAddCard.open();
});
//-------------- end Open popup New Card----------------//

//--------------listeners----------------//
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
//--------------end listeners----------------//
