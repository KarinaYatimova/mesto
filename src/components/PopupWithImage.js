import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupPlace = this._popup.querySelector('.popup__image-placename');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupPlace.textContent = name;
    this._popupPlace.alt = name;
    super.open();
  }
}
