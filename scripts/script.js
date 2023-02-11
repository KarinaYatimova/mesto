const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const template = document.querySelector('#card-template').content.querySelector('.element__item');
const cardContainer = document.querySelector('.element');
const submitButton = document.querySelector('.popup__save-button');

const popupWatchImage = document.querySelector('.popup_watch_image');
const popupImage = document.querySelector('.popup__image');
const popupPlacename = document.querySelector('.popup__image-placename');
const popupImageTitle = document.querySelector('.element__title');
const popupImageBtnClose = document.querySelector('.popup__close-image');

const popup = document.querySelector('.popup');

const popupBtnOpen = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup_edit_profile');
const popupBtnClose = document.querySelector('.popup__close');

const popupAddBtnOpen = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add_card');
const popupAddBtnClose = document.querySelector('.popup__close-card');

const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const placenameInput = document.querySelector('input[name="placename"]');
const linkInput = document.querySelector('input[name="link"]');

renderCards(initialCards);

submitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const placename = placenameInput.value;
  const link = linkInput.value;
  const card = createCard({name: placename, link: link});

  cardContainer.prepend(card);

  closePopup(popupAddCard);

  placenameInput.value = '';
  linkInput.value = '';
});

function renderCards(initialCards) {
  const cards = initialCards.map((item) => {
    return createCard(item);
  });

  cardContainer.prepend(...cards);
}

function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.name;

  card.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  card.querySelector('.element__remove-button').addEventListener('click', () => {
    card.remove();
  });

  card.querySelector('.element__image').addEventListener('click', function() {
    popupWatchImage.classList.add('popup_opened');

    popupImage.src = item.link;
    popupPlacename.textContent = item.name;
    popupPlacename.alt = item.name;
  });

  return card;
}

function editPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

popupBtnOpen.addEventListener('click', function() {
  openPopup(popupContainer);
  editPopup();
});

popupAddBtnOpen.addEventListener('click', function () {
  openPopup(popupAddCard);
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupBtnClose.addEventListener('click', function () {
  closePopup(popupContainer);
});

popupAddBtnClose.addEventListener('click', function () {
  closePopup(popupAddCard);
});

popupImageBtnClose.addEventListener('click', function () {
  closePopup(popupWatchImage);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupContainer);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
