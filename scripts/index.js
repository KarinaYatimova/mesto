import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from "./cards.js";

const cardsContainer = document.querySelector('.element');
const cardFormSubmitButton = document.querySelector('.popup__save-button');

const popupWatchImage = document.querySelector('.popup_watch_image');
const popupImage = document.querySelector('.popup__image');
const popupPlace = document.querySelector('.popup__image-placename');

const popupEditBtnOpen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_edit_profile');

const popupAddBtnOpen = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add_card');

const closeButtons = document.querySelectorAll('.popup__close');

const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const placeInput = document.querySelector('input[name="placename"]');
const linkInput = document.querySelector('input[name="link"]');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//валидация профиля
const editProfileValidator = new FormValidator(config, profilePopup);
editProfileValidator.enableValidation();

//валидация создания карточки
const createCardValidator = new FormValidator(config, popupAddCard);
createCardValidator.enableValidation();

//создание карточки
const createCard = (item) => {
  const card = new Card(item, '.card-template', openCardPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cards = createCard(item)
  cardsContainer.prepend(cards);
});

//открытие большой картинки
function openCardPopup() {
  openPopup(popupWatchImage);

  popupImage.src = this._link;
  popupPlace.textContent = this._name;
  popupPlace.alt = this._name;
}

function fillProfileFormInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

//закрытие клавишей Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup)
  }
}

//закрытие по фону
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('mousedown', closeByOverlay);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('mousedown', closeByOverlay);
}

//добавление карточки
cardFormSubmitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const place = placeInput.value;
  const link = linkInput.value;

  const card = createCard({name: place, link: link});

  cardsContainer.prepend(card);

  closePopup(popupAddCard);

  cardForm.reset()
  createCardValidator._disableSubmitButton();
});

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

popupEditBtnOpen.addEventListener('click', function() {
  openPopup(profilePopup);
  fillProfileFormInputs();
});

popupAddBtnOpen.addEventListener('click', function () {
  openPopup(popupAddCard);
});

