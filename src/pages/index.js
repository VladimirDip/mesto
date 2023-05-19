import "./index.css";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupDelete from "../components/PopupDelete";
import Api from "../components/Api";
import { renderLoading } from "../utils/utils";

import {
  buttonEditProfile,
  buttonNewCard,
  buttonUpdateAvatar,
  cardsBlockSelector,
  configSelectors,
  dataInfo,
  formElements,
  forms,
  popupAddNewCardSelector,
  popupDeleteImageSelector,
  popupEditProfileSelector,
  popupImageSelector,
  popupUpdateProfileSelector,
  selectionCardPlace,
} from "../utils/variables.js";

const api = new Api({
  cohortId: "cohort-66",
  headers: {
    authorization: "77b8909a-b0f6-4cb0-9564-187fa24d0431",
    "Content-Type": "application/json",
  },
});

let cardList;

//--------------Create new section on page----------------//

const createCard = (name, link, likes, owner, _id, userId) => {
  const card = new Card(
    { name, link, likes, owner, _id, userId },
    selectionCardPlace,
    handlerCardClick,
    handlerDeleteClick,
    likeCard,
    unlikeCard
  );
  return card.generateCard();
};

const addCard = ({ name, link, likes, owner, _id }, method) => {
  const card = createCard(
    name,
    link,
    likes,
    owner,
    _id,
    userInfo.getUserInfo().indent
  );

  cardList.addItem(card, method);
};

const renderCard = (data) => {
  cardList = new Section(
    { items: data, renderer: addCard },
    cardsBlockSelector
  );
  cardList.setCardFromArray();
};
//--------------end Create new section on page----------------//

//--------------Methods for Api----------------//
const deleteCard = (indent, cardToDelete, submitButton) => {
  // console.log(submitButton);
  renderLoading(submitButton, "Удаление...");
  return api
    .deleteCard(indent)
    .then(() => {
      cardToDelete.remove();
      popupDeleteCard.close();
      renderLoading(submitButton, "Да");
    })
    .catch(console.error);
};

const likeCard = (indent, likes, likesCount) => {
  // console.log(indent);
  return api
    .likeCard(indent)
    .then((data) => {
      likes = data.likes;
      likesCount.textContent = likes.length;
    })
    .catch(console.error);
};

const unlikeCard = (indent, likes, likesCount) => {
  // console.log(indent);
  return api
    .unlikeCard(indent)
    .then((data) => {
      likes = data.likes;
      likesCount.textContent = likes.length;
    })
    .catch(console.error);
};

const avatarEditSubmit = ({ avatar_link: avatar }, submitButton) => {
  renderLoading(submitButton, "Сохранение...");
  // console.log("avatar => ", avatar);
  api
    .setUserAvatar(avatar)

    .then((res) => {
      // console.log(res);
      userInfo.setUserInfo(res);
      popupUpdateAvatar.close();
      renderLoading(submitButton, "Сохранить");
    })
    .catch(console.error);
};

const cardFormSubmit = ({ name: name, link: link }, submitButton) => {
  // console.log(submitButton);
  renderLoading(submitButton, "Создание...");
  api
    .addNewCard(name, link)
    .then(({ likes, owner, _id }) => {
      addCard({ name, link, likes, owner, _id }, "prepend");
      renderLoading(submitButton, "Создать");
      popupAddCard.close();
    })
    .catch(console.error);
};

const profileFormSubmit = (data, submitButton) => {
  console.log(submitButton);
  renderLoading(submitButton, "Сохранение...");
  api
    .setUserData(data)
    .then(({ name: name, about: description, ...rest }) => {
      userInfo.setUserInfo({ name, description, ...rest });

      popupProfile.close();
      renderLoading(submitButton, "Сохранить");
    })
    .catch(console.error);
};

//--------------End Methods for Api----------------//

//--------------Handlers----------------//

const handlerCardClick = (title, link) => {
  popupImage.open({ title, link });
};

function handlerDeleteClick(evt, indent) {
  popupDeleteCard.open(evt.target.closest(".card"), indent);
}

//--------------End Handlers----------------//

//--------------Create our popup classes----------------//

const popupProfile = new PopupWithForm(
  popupEditProfileSelector,
  profileFormSubmit
);

const popupAddCard = new PopupWithForm(popupAddNewCardSelector, cardFormSubmit);

const popupUpdateAvatar = new PopupWithForm(
  popupUpdateProfileSelector,
  avatarEditSubmit
);

const userInfo = new UserInfo(dataInfo);

const popupImage = new PopupWithImage(popupImageSelector);

const popupDeleteCard = new PopupDelete(popupDeleteImageSelector, deleteCard);

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

buttonUpdateAvatar.addEventListener("click", () => {
  forms["popup-update-avatar"].resetValidation();
  popupUpdateAvatar.open();
});

//--------------listeners----------------//
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupUpdateAvatar.setEventListeners();
popupDeleteCard.setEventListeners();
//--------------end listeners----------------//

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    const { name: name, about: description, _id, avatar } = userData;

    userInfo.setUserInfo({ name, description, _id, avatar });

    renderCard(cardsData);
  })
  .catch(console.error);
