import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._acceptButton = this._popup.querySelector('.popup__save');
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._acceptButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }
}
