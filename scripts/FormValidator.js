export class FormValidator {
  constructor(params) {
    this._formSelector = params.formSelector;
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._errorSelector =  params.errorSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass =  params.errorClass;
  }

  _showErrorMessage = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideErrorMessage = (errorElement) => {
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity = (form, inputElement) => {
    const inputElementState = inputElement.validity.valid;
    const errorElement = form.querySelector(`#${inputElement.name}-error`);

    if (inputElementState) {
      this._hideErrorMessage(errorElement);
      inputElement.classList.remove(this._inputErrorClass);
    } else {
      this._showErrorMessage(errorElement, inputElement);
      inputElement.classList.add(this._inputErrorClass);
    }
  };

  _changeSubmitButtonStatus = (form, userInputs) => {
    const submitButton = form.querySelector(this._submitButtonSelector);

    const inputsValidationState = userInputs.map(input => {
      return input.validity.valid;
    });
    const formValid = !inputsValidationState.some(state => {
      return !state;
    });

    if (formValid) {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    }
  };

  setEventListeners = (form) => {
    const userInputs = Array.from(form.querySelectorAll(this._inputSelector));

    userInputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement);
        this._changeSubmitButtonStatus(form, userInputs);
      });
    });
  };

  enableValidation = () => {
    const userForms = Array.from(document.querySelectorAll(this._formSelector));
    userForms.forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      this.setEventListeners(form);
    });
  };
}

