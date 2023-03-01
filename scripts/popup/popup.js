const buttonElem = document.querySelector('.profile__edit');
const popElem = document.querySelector('.popup')
const popClose = document.querySelector('.popup__close')
const submitFormButton = document.querySelector('.popup__button')

let classesPopUp = popElem.classList
let formElement = document.querySelector('.popup__form')

let nameInput = formElement.querySelector('input[name="name"]')
let descriptionInput = formElement.querySelector('input[name="description"]')


const handlerFormSubmit = (evt) => {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let descriptionInputValue = descriptionInput.value;

    if (validateSubmitForm()) {
        let profileName = document.querySelector('.profile__name');
        let profileDescription = document.querySelector('.profile__description');

        profileName.textContent = nameInputValue;
        profileDescription.textContent = descriptionInputValue;

    }
}


const closePopUp = event => {
    const target = event.target;
    if (target === popElem || target === popClose || target === submitFormButton) {
        classesPopUp.remove('popup_active');
    }
}


const openPopUp = () => {
    putInPopUp();

    if (classesPopUp.contains('popup_active')) {
        classesPopUp.remove('popup_active');
    } else {
        classesPopUp.add('popup_active');
    }
}


const putInPopUp = () => {
    if (isEmptyFieldForm()) {
        let profileName = document.querySelector('.profile__name').textContent;
        let profileDescription = document.querySelector('.profile__description').textContent;

        nameInput.value = profileName;
        descriptionInput.value = profileDescription;
    } else {
        return false
    }
}


const isEmptyFieldForm = () => {
    return nameInput.value.length === 0 && descriptionInput.value.length === 0
}


const validateSubmitForm = () => {
    if (isEmptyFieldForm()) {
        alert('Вы не ввели значения');
        return false
    } else {
        return true
    }
}


buttonElem.addEventListener('click', openPopUp);
popElem.addEventListener('click', closePopUp);
formElement.addEventListener('submit', handlerFormSubmit);
