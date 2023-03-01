const like = document.querySelectorAll('.card__like')
console.log(like)


const activationLike =() => {
     like.forEach((elem => {
        elem.addEventListener('click', function () {
            elem.classList.toggle('card__like_active')
        })
    }));
}


activationLike()

