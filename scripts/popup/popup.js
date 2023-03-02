const buttonElem = document.querySelector('.profile__edit');
const popElem = document.querySelector('.popup')
const popClose = document.querySelector('.popup__close')
const submitFormButton = document.querySelector('.popup__button')

let formElement = document.querySelector('.popup__form')

let nameInput = formElement.querySelector('input[name="name"]')
let descriptionInput = formElement.querySelector('input[name="description"]')

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let profileNameText = document.querySelector('.profile__name').textContent;
let profileDescriptionText = document.querySelector('.profile__description').textContent;


//handler is working with form
const handlerFormSubmit = (evt) => {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let descriptionInputValue = descriptionInput.value;

    profileName.textContent = nameInputValue;
    profileDescription.textContent = descriptionInputValue;

    closePopUp()
}


const closePopUp = () => {
    popElem.classList.remove('popup_opened');
}


const openPopUp = () => {
    putInPopUp();

    popElem.classList.toggle('popup_opened')

}

//get text from HTML and put in form
const putInPopUp = () => {
    nameInput.value = profileNameText;
    descriptionInput.value = profileDescriptionText;
}


buttonElem.addEventListener('click', openPopUp);
popClose.addEventListener('click', closePopUp);
formElement.addEventListener('submit', handlerFormSubmit);
