import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {cardsContainer, popupAddBtnOpen, popupProfileEditBtnOpen, profileName, profileJob, profileAvatar, config, popupAvatarEditBtnOpen} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '6b5320c2-afc1-48b8-9236-9f6ddcfc22f0',
    'Content-Type': 'application/json'
  }
});

let userId = null;

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

//отвечает за просмотр изображения
const imagePopup = new PopupWithImage('.popup_watch_image');
imagePopup.setEventListeners();

//отвечает за подтверждение удаления карточки
const removeCardPopup = new PopupWithConfirmation('.popup_remove_card');
removeCardPopup.setEventListeners();

//запрос информации о пользователе
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId  = userData._id;
    userInfoPopup.setUserInfo(userData);
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const createCard = (cardData, userId) => {
  const card = new Card({
    cardData: cardData,
    userId: userId,
    templateSelector: '.card-template',
    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },
    handleLikeClick: (card, isLiked) => {
      if (isLiked) {
        api.removeLikeCard(card._id)
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        api.addLikeCard(card._id)
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    handleDeleteCardClick: (card) => {
      removeCardPopup.open();
      removeCardPopup.setSubmitAction(() => {
        api.removeCard(card._id)
        .then(() => {
          card.removeCard();
          removeCardPopup.close();
        })
        .catch((err) => {
          console.log(err);
        });
      })
    },
  });
  const cardElement = card.generateCard();

  return cardElement;
};

//отвечает за отрисовку элементов на странице
const cardsList = new Section({
  renderer: (item) => {
    const cards = createCard(item, userId);
    cardsList.addItem(cards);
  },
},
cardsContainer);

//добавление карточки
const newCardPopup = new PopupWithForm({
  popup: '.popup_add_card',
  handleFormSubmit: handleCardFormSubmit,
});
newCardPopup.setEventListeners();

function handleCardFormSubmit(formData) {
  newCardPopup.renderLoading(true);
  api
  .addNewCard(formData)
  .then((res) => {
    const card = createCard(res, userId);
    cardsList.addItem(card);
    newCardPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    newCardPopup.renderLoading(false)
  })
}

//отвечает за управление отображением информации о пользователе на странице
const userInfoPopup = new UserInfo({
  name: profileName,
  job: profileJob,
  avatar: profileAvatar,
});

//редактирование профиля
const editProfilePopup = new PopupWithForm({
  popup: '.popup_edit_profile',
  handleFormSubmit: handleProfileFormSubmit,
});
editProfilePopup.setEventListeners();

//проверить загрузку сохранения
function handleProfileFormSubmit(formData) {
  editProfilePopup.renderLoading(true)
  api
  .editUserInfo(formData)
  .then((res) => {
    userInfoPopup.setUserInfo(res);
    editProfilePopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    editProfilePopup.renderLoading(false)
  })
}

//редактирование аватара профиля
const editAvatarPopup = new PopupWithForm({
  popup: '.popup_edit_avatar',
  handleFormSubmit: handleAvatarFormSubmit,
});
editAvatarPopup.setEventListeners();

//проверить загрузку сохранения
function handleAvatarFormSubmit(formData) {
  editAvatarPopup.renderLoading(true)
  api
  .editUserAvatar(formData)
  .then((res) => {
    userInfoPopup.setUserInfo(res);
    editAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    editAvatarPopup.renderLoading(false)
  })
}

popupProfileEditBtnOpen.addEventListener('click', function() {
  const data = userInfoPopup.getUserInfo()
  editProfilePopup.setInputValues(data)
  editProfilePopup.open();
  formValidators['profile-form'].resetValidation()
});

popupAddBtnOpen.addEventListener('click', function() {
  newCardPopup.open();
  formValidators['card-form'].resetValidation()
});

popupAvatarEditBtnOpen.addEventListener('click', function() {
  editAvatarPopup.open();
  formValidators['avatar-form'].resetValidation()
})


