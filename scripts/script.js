const popupBtnOpen = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup');
const popupBtnClose = document.querySelector('.popup__close');
// Находим форму в DOM
const formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="job"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

function openPopup() {
  popupContainer.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popupContainer.classList.remove('popup_opened');
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

popupBtnOpen.addEventListener('click', openPopup);
popupBtnClose.addEventListener('click', closePopup);
