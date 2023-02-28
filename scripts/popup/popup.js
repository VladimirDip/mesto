const buttonElem = document.querySelector('.profile__edit');
const popElem = document.querySelector('.popup')
const popClose = document.querySelector('.popup__close')

//
// const closePopUp = event => {
//     const target = event.target
//
//     if(target === popElem || target === popClose ) {
//         popElem.style.visibility = 'hidden';
//         popElem.style.opacity = 0;
//
//     }
// }

const openPopUp = () => {
    let classesPopUp = popElem.classList
    if (classesPopUp.contains('popup_active')) {
        classesPopUp.remove('popup_active')
    } else {
        classesPopUp.add('popup_active')
    }
}

buttonElem.addEventListener('click', openPopUp)
// popElem.addEventListener('click', closePopUp)

console.log(buttonElem)