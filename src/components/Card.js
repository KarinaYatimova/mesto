export default class Card {
  constructor({ cardData, userId, templateSelector, handleCardClick, handleLikeClick, handleDeleteCardClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._userId = userId;
    this._id = cardData._id
    this._ownerId = cardData.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
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

    this._elementCardTitle = this._element.querySelector('.element__title');
    this._elementCardImage = this._element.querySelector('.element__image');

    this._elementCardTitle.textContent = this._name;
    this._elementCardImage.src = this._link;
    this._elementCardImage.alt = this._name;

    this._likeButton = this._element.querySelector('.element__like-button');
    this._removeButton = this._element.querySelector('.element__remove-button');
    this._conterLike = this._element.querySelector('.element__like-counters');

    this._setEventListeners();
    this._removeIcon();
    this._isLiked();
    this.setLikes(this._likes);

    return this._element;
  }

  setLikes(likes) {
    this._likes = likes;
    this._conterLike.textContent = this._likes.length;
    if (this._isLiked()) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }

  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this, this._isLiked())
    });

    this._removeButton.addEventListener('click', () => {
      this._handleDeleteCardClick(this)
    });
  }

  _removeIcon() {
    if (this._userId !== this._ownerId) {
      this._removeButton.remove();
    }
  }
}


