export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._elementCardTitle = this._element.querySelector('.element__title');
    this._elementCardImage = this._element.querySelector('.element__image');

    this._elementCardTitle.textContent = this._name;
    this._elementCardImage.src = this._link;
    this._elementCardImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);

    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._handleRemoveClick()
    });
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _handleRemoveClick() {
    this._element.remove();
  }
}