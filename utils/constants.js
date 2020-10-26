export const form = document.querySelectorAll('.form');
export const profileEditButton = document.querySelector('.profile__edit-botton');
export const profileAddingButton = document.querySelector('.profile__add-botton');
export const editForm = document.querySelector('.form_type_edit');
export const popupAddingForm = document.querySelector('.form_type_adding');
export const addingForm = document.querySelector('.form__container_type_adding');
export const fotoViewer = document.querySelector('.form_type_foto-viewer');
export const fotoViewerImg = document.querySelector('.form__foto-viewer-img');
export const fotoCaption = document.querySelector('.form__foto-viewer-description');
export const editFormFullName = document.querySelector('.form__textinput_type_edit-full-name');
export const editFormDescription = document.querySelector('.form__textinput_type_edit-description');
export const fullNameOnPage = document.querySelector('.profile__full-name');
export const descriptionOnPage = document.querySelector('.profile__description');
export const addingFormName = document.querySelector('.form__textinput_type_adding-name');
export const addingFormLinkAdress = document.querySelector('.form__textinput_type_adding-link-address');
export const submitButton = addingForm.querySelector('.form__submit-button_type_adding-add-button');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const paramsForValidationOfForm = {
  formSelector: '.form__container_type_submit-form',
  inputSelector: '.form__textinput',
  submitButtonSelector: '.form__submit-button',
  errorSelector: '.form_error',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__textinput_type_error',
  errorClass: 'form__error_visible'
};


