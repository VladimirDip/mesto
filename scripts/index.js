// const popElem = document.querySelector('.popup')

// const buttonAddNewCard = document.querySelector('.profile__add-new-card')
// console.log(buttonAddNewCard)


//variable for working with cards
const cardTemplate = document.querySelector('#card').content
const cardsBlock = document.querySelector('.cards')


let formElementEditProfile = document.querySelector('[name="popup-edit-profile"]')
let formElementNewCard = document.querySelector('[name="popup-add-new-card"]')

let nameInput = formElementEditProfile.querySelector('input[name="name"]')
let descriptionInput = formElementEditProfile.querySelector('input[name="description"]')
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

//array cards
const initialCards = [
    {
        name: 'Tokio',
        link: 'https://images.unsplash.com/photo-1677947244400-8d7cae6166bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Budapest',
        link: 'https://images.unsplash.com/photo-1678107374646-8ff0a2396302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    },
    {
        name: 'Cooking untensils',
        link: 'https://images.unsplash.com/photo-1678097337340-ec9c74ebf147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Flowers',
        link: 'https://images.unsplash.com/photo-1678043639199-1c3f826cd95a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
    },
    {
        name: 'Hamburg streets',
        link: 'https://images.unsplash.com/photo-1669884100358-0950856fca7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Little bird',
        link: 'https://images.unsplash.com/photo-1678048632412-f18bbbd3662a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
]

//fill page new cards from array only. It isn't main logic
initialCards.forEach((item) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)

    cardElement.querySelector('.card__image').src = item.link
    cardElement.querySelector('.card__image').alt = item.name
    cardElement.querySelector('.card__title').textContent = item.name

    cardsBlock.append(cardElement)
});

//handler is working with profile form
const handlerFormSubmitProfile = (evt) => {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let descriptionInputValue = descriptionInput.value;

    profileName.textContent = nameInputValue;
    profileDescription.textContent = descriptionInputValue;

    closePopUp()
}

const placeInput = formElementNewCard.querySelector('input[name="name"]')
const linkInput = formElementNewCard.querySelector('input[name="link-image"]')


//handler is working with add-new-card form
const handlerFormSubmitAddNewCard = (evt) => {
    evt.preventDefault();

    let placeInputValue = placeInput.value;
    let linkInputValue = linkInput.value;

    console.log(placeInputValue, linkInputValue)

    // let newCard = {};
    // newCard['place'] = placeInputValue;
    // newCard['link'] = linkInputValue;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
    cardElement.querySelector('.card__image').src = linkInputValue
    cardElement.querySelector('.card__image').alt = placeInputValue
    cardElement.querySelector('.card__title').textContent = placeInputValue

    cardsBlock.prepend(cardElement)

    closePopUp()


}

const closePopUp = () => {
    let targetPopUp = document.querySelector('.popup_opened')
    targetPopUp.classList.remove('popup_opened');
}

const openPopUp = (targetElement) => {
    console.log(targetElement)
    if (targetElement.classList.contains('edit-profile-popup')) {
        GetTextFromPageToPopUp();
    }

    targetElement.classList.toggle('popup_opened')
}

//get text from HTML and put in form
const GetTextFromPageToPopUp = () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

const buttonsForOpenPopUp = document.querySelectorAll('[data-button]')
//open the popup which placed into button
buttonsForOpenPopUp.forEach((el) => {
    el.addEventListener('click', (e) => {
        let dataButton = e.currentTarget.getAttribute('data-button');
        // console.log(dataButton)
        let popup = document.querySelector(`[data-target="${dataButton}"]`);
        // console.log(some)
        openPopUp(popup);
    })
})

const buttonsClosePopUp = document.querySelectorAll('.popup__close')
//close the popup which have 'popup_opened' class
buttonsClosePopUp.forEach((el) => {
    el.addEventListener('click', (e) => {
        const currentPopUp = e.currentTarget.parentElement.parentElement
        if (currentPopUp.classList.contains('popup_opened')) {
            console.log(currentPopUp);
            closePopUp(currentPopUp);
        }
    })
})


let likes = document.querySelectorAll('.card__like')
likes.forEach((el) => {
    el.addEventListener('click', (e) => {
        // console.log(e.currentTarget)
        e.currentTarget.classList.toggle('card__like_active')
    })
})

// const activationLike = () => {
//     let like = document.querySelectorAll('.card__like')
//     like.forEach((elem => {
//         elem.addEventListener('click', function () {
//             elem.classList.toggle('card__like_active');
//         })
//     }));
// };



formElementEditProfile.addEventListener('submit', handlerFormSubmitProfile);

formElementNewCard.addEventListener('submit', handlerFormSubmitAddNewCard);
// activationLike();

