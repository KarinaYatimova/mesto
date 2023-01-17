let popupBtnOpen = document.querySelector('.profile__edit-button');
let popupContainer = document.querySelector('.popup');
let popupBtnClose = document.querySelector('.popup__close');

popupBtnOpen.addEventListener('click', openPopup);
popupBtnClose.addEventListener('click', closePopup);

function openPopup() {
  popupContainer.classList.add('popup_opened');
}

function closePopup() {
  popupContainer.classList.remove('popup_opened');
}

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="job"]');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupContainer.classList.remove('popup_opened')
}

formElement.addEventListener('submit', handleFormSubmit);

