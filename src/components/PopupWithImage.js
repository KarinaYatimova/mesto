import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupPlace = this._popup.querySelector('.popup__image-placename');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupPlace.textContent = name;
    super.open();
  }
}
