import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {cardsContainer, profilePopup, popupAddBtnOpen, popupEditBtnOpen, popupAddCard, nameInput, jobInput, profileName, profileJob, config} from '../utils/constants.js';

//валидация профиля
const editProfileValidator = new FormValidator(config, profilePopup);
editProfileValidator.enableValidation();

//валидация создания карточки
const createCardValidator = new FormValidator(config, popupAddCard);
createCardValidator.enableValidation();

//отвечает за просмотр изображения
const imagePopup = new PopupWithImage('.popup_watch_image');
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
};

//создание карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '.card-template', handleCardClick);

  const cardElement = card.generateCard();
  return cardElement;
};

//отвечает за отрисовку элементов на странице
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cards = createCard(item);
    cardsList.addItem(cards);
  },
},
cardsContainer);

cardsList.renderItems();

//добавление карточки
const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_add_card',
  handleFormSubmit : (formData) => {
    cardFormSubmit(formData);
  }
});
newCardPopup.setEventListeners();

function cardFormSubmit(formData) {
  const card = createCard({
    name: formData['placename'],
    link: formData['link']
  });
  cardsList.addItem(card);
  newCardPopup.close();
};

//отвечает за управление отображением информации о пользователе на странице
const userInfoPopup = new UserInfo({
  name: profileName,
  job: profileJob
});

//редактирование профиля
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_edit_profile',
  handleFormSubmit: (formData) => {
    handleProfileFormSubmit(formData);
  }
});
editProfilePopup.setEventListeners();

function handleProfileFormSubmit(formData) {
  userInfoPopup.setUserInfo(formData['name'], formData['job']);
  editProfilePopup.close();
}

popupEditBtnOpen.addEventListener('click', function() {
  const userValues = userInfoPopup.getUserInfo()
  nameInput.value = userValues.name;
  jobInput.value = userValues.job;
  editProfilePopup.open();
});

popupAddBtnOpen.addEventListener('click', function () {
  newCardPopup.open();
});

