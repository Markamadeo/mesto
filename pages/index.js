import { initialCards, paramsForValidationOfForm, form, profileEditButton, profileAddingButton, editForm, popupAddingForm, addingForm, fotoViewer, fotoViewerImg, fotoCaption, editFormFullName, editFormDescription, fullNameOnPage, descriptionOnPage, addingFormName, addingFormLinkAdress, submitButton } from '../utils/constants.js';

import { createNewCard } from '../utils/utils.js'
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';

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
  addingForm.reset();
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('form__submit-button_disabled');
  addEscapeEventForForm();
  togglePopupStatus(popupAddingForm);
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

// const addCardToGallery = (cardElement) => {
//   gallery.prepend(cardElement);
// }

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

  const card = createNewCard(dataInput, '#gallery-item', openViewerForm);
  galleryItems.addItem(card);
  togglePopupStatus(findParentForm(event.target));
};

// const renderGalleryItems = () => {
//   initialCards.forEach((item) => {
//     const card = createNewCard(item, '#gallery-item', openViewerForm);
//     addCardToGallery(card);
//   });
// };

const galleryItems = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      return createNewCard(item, '#gallery-item', openViewerForm);
    }
  },

  '.gallery'
);


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

const formEditValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_edit');
formEditValidator.enableValidation();
const formAddingValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_adding');
formAddingValidator.enableValidation();

profileEditButton.addEventListener('click', openEditForm);
profileAddingButton.addEventListener('click', openAddingForm);
editForm.addEventListener('submit', submitEditForm);
popupAddingForm.addEventListener('submit', submitAddingForm);

galleryItems.renderItems();
// renderGalleryItems();
