import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._popupBtnSubmit = this._form.querySelector('.popup__save');

    this._buttonText = this._popupBtnSubmit.textContent;
  }

  //процесс сохранения
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupBtnSubmit.textContent = 'Сохранение...';
    } else {
      this._popupBtnSubmit.textContent = this._buttonText;
    }
  }

  //данные формы
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  //вставляем данные в инпуты
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  //слушатель формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //закрытие и сброс
  close() {
    super.close();
    this._form.reset()
  }
}
