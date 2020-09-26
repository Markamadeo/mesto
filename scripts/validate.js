const showErrorMessage = (errorElement, params, inputElement) => {
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(params.errorClass);
};

const hideErrorMessage = (errorElement, params) => {
  errorElement.classList.remove(params.errorClass);
}

const checkInputValidity = (form, inputElement, params) => {
  const inputElementState = inputElement.validity.valid;
  const errorElement = form.querySelector(`#${inputElement.name}-error`);

  if (inputElementState) {
    hideErrorMessage(errorElement, params);
    inputElement.classList.remove('form__textinput_type_error');
  } else {
    showErrorMessage(errorElement, params, inputElement);
    inputElement.classList.add('form__textinput_type_error');
  }
};

const changeSubmitButtonStatus = (form, userInputs, params) => {
  const submitButton = form.querySelector(params.submitButtonSelector);

  const inputsValidationState = userInputs.map(input => {
    return input.validity.valid;
  });
  const formValid = !inputsValidationState.some(state => {
    return !state;
  });

  if (formValid) {
    submitButton.classList.remove(params.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.classList.add(params.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }
};

const setEventListeners = (form, params) => {
  const userInputs = Array.from(form.querySelectorAll(params.inputSelector));

  userInputs.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(form, inputElement, params);
      changeSubmitButtonStatus(form, userInputs, params);
    });
  });
};

const enableValidation = (params) => {
  const userForms = Array.from(document.querySelectorAll(params.formSelector));

  userForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(form, params);
  });
};

enableValidation({
  formSelector: '.form__container_type_submit-form',
  inputSelector: '.form__textinput',
  submitButtonSelector: '.form__submit-button',
  errorSelector: '.form_error',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__textinput_type_error',
  errorClass: 'form__error_visible'
});
