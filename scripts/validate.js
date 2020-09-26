const enableValidation = (params) => {

};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__textinput',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__textinput_type_error',
  errorClass: 'form__error_visible'
});
