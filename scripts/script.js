import { initialCards, paramsForValidationOfForm } from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const gallery = document.querySelector('.gallery');
const form = document.querySelectorAll('.form');
const profileEditButton = document.querySelector('.profile__edit-botton');
const profileAddingButton = document.querySelector('.profile__add-botton');
const editForm = document.querySelector('.form_type_edit');
const addingForm = document.querySelector('.form_type_adding');
const fotoViewer = document.querySelector('.form_type_foto-viewer');
const fotoViewerImg = document.querySelector('.form__foto-viewer-img');
const fotoCaption = document.querySelector('.form__foto-viewer-description');
const editFormFullName = document.querySelector('.form__textinput_type_edit-full-name');
const editFormDescription = document.querySelector('.form__textinput_type_edit-description');
const fullNameOnPage = document.querySelector('.profile__full-name');
const descriptionOnPage = document.querySelector('.profile__description');
const addingFormName = document.querySelector('.form__textinput_type_adding-name');
const addingFormLinkAdress = document.querySelector('.form__textinput_type_adiing-link-adress');
const formsValidator = new FormValidator (paramsForValidationOfForm);

const togglePopupStatus = (elem) => {
  elem.classList.toggle('form_status_active');
};

const findParentForm = elem => elem.closest('.form');

const openEditForm = () => {
  addEscapeEventForForm();
  editFormFullName.value = fullNameOnPage.textContent;
  editFormDescription.value = descriptionOnPage.textContent;
  togglePopupStatus(editForm);
  editFormFullName.focus();
};

const openAddingForm = () => {
  addEscapeEventForForm();
  togglePopupStatus(addingForm);
};

const openViewerForm = (name, link) => {
  addEscapeEventForForm();
  fotoViewerImg.setAttribute('src', link);
  fotoViewerImg.setAttribute('alt', name);
  fotoCaption.textContent = name;
  togglePopupStatus(fotoViewer);
};

const closeForm = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('form__close-button')) {
    togglePopupStatus(event.target.closest('.form'));
  };
};

const submitEditForm = (event) => {
  fullNameOnPage.textContent = editFormFullName.value;
  descriptionOnPage.textContent = editFormDescription.value;
  togglePopupStatus(findParentForm(event.target));
};

const submitAddingForm = (event) => {
  const dataInput = {
    name: addingFormName.value,
    link: addingFormLinkAdress.value
  };

  const card = new Card(dataInput, '#gallery-item', openViewerForm);
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
  event.target.closest('.form__container').reset();
  togglePopupStatus(findParentForm(event.target));
};

const renderGalleryItems = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '#gallery-item', openViewerForm);
    const cardElement = card.generateCard();
    gallery.append(cardElement);
  });
};

const handlerEsc = (event) => {
  if (event.key === 'Escape') {
    Array.from(form).forEach(formElement => {
      if (formElement.classList.contains('form_status_active')) {
        togglePopupStatus(formElement);
      }
    });
    document.removeEventListener('keydown', handlerEsc);
  }
};

const addEscapeEventForForm = () => {
  document.addEventListener('keydown', handlerEsc);
};

form.forEach((form) => {
  form.addEventListener('click', closeForm);
});

formsValidator.enableValidation();
profileEditButton.addEventListener('click', openEditForm);
profileAddingButton.addEventListener('click', openAddingForm);
editForm.addEventListener('submit', submitEditForm);
addingForm.addEventListener('submit', submitAddingForm);

renderGalleryItems();
