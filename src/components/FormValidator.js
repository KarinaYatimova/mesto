export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  resetValidation() {
    this._toggleButtonState(); //управляем кнопкой

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) //очищаем ошибки
    });
  }

  disableSubmitButton = () => {
    this._buttonElement.setAttribute('disabled', 'disabled');
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  enableSubmitButton = () => {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(this._buttonElement);
    } else {
      this.enableSubmitButton(this._buttonElement);
    }
  }

  _setEventListeners = () => {
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners()
  }
}
