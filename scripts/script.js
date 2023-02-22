const cardTemplate = document.querySelector('#card-template').content.querySelector('.element__item');
const cardsContainer = document.querySelector('.element');
const cardFormSubmitButton = document.querySelector('.popup__save-button');

const popupWatchImage = document.querySelector('.popup_watch_image');
const popupImage = document.querySelector('.popup__image');
const popupPlace = document.querySelector('.popup__image-placename');
const popupImageTitle = document.querySelector('.element__title');
const popupImageBtnClose = document.querySelector('.popup__close-image');

const popupEditBtnOpen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_edit_profile');

const popupAddBtnOpen = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add_card');
const popupAddBtnClose = document.querySelector('.popup__close-card');

const closeButtons = document.querySelectorAll('.popup__close');

const profileForm = document.forms['infoForm'];

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const placeInput = document.querySelector('input[name="placename"]');
const linkInput = document.querySelector('input[name="link"]');

renderCards(initialCards);

function renderCards(initialCards) {
  const cards = initialCards.map(createCard);
  cardsContainer.prepend(...cards);
}

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__title').textContent = cardData.name;

  const link = card.querySelector('.element__image')
  link.src = cardData.link;
  link.alt = cardData.name;

  card.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  card.querySelector('.element__remove-button').addEventListener('click', () => {
    card.remove();
  });

  card.querySelector('.element__image').addEventListener('click', function() {
    openPopup(popupWatchImage);

    popupImage.src = cardData.link;
    popupPlace.textContent = cardData.name;
    popupPlace.alt = cardData.name;
  });

  return card;
}

function fillProfileFormInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(profilePopup);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup)
  }
}

function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget)
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('mousedown', closeByOverlay);

}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('mousedown', closeByOverlay);
}


cardFormSubmitButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const place = placeInput.value;
  const link = linkInput.value;

  const card = createCard({name: place, link: link});

  cardsContainer.prepend(card);

  closePopup(popupAddCard);

  placeInput.value = '';
  linkInput.value = '';

  cardFormSubmitButton.setAttribute('disabled', 'disabled');
  cardFormSubmitButton.classList.add('popup__save_inactive');
});

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit);

popupEditBtnOpen.addEventListener('click', function() {
  openPopup(profilePopup);
  fillProfileFormInputs();
});

popupAddBtnOpen.addEventListener('click', function () {
  openPopup(popupAddCard);
});




