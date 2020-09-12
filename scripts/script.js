import { initialCards } from './data.js';

/* Edit form - START */
const editForm = document.querySelector('.edit-form');
const profileEditButton = document.querySelector('.profile__edit-botton');
const editFormFullName = document.querySelector('.edit-form__textinput_type_full-name');
const editFormDescription = document.querySelector('.edit-form__textinput_type_description');
const fullNameOnPage = document.querySelector('.profile__full-name');
const descriptionOnPage = document.querySelector('.profile__description');
const editFormContainer = document.querySelector('.edit-form__container');
const closeButton = document.querySelector('.edit-form__close-button');
const saveButton = document.querySelector('.edit-form__save-button');

const openEditForm = () => {
  editFormFullName.value = fullNameOnPage.textContent;
  editFormDescription.value = descriptionOnPage.textContent;
  editForm.classList.toggle('edit-form_status_active');
  editFormFullName.focus();
};

const closeForm = (event) => {
  if (event.target === event.currentTarget || event.target === saveButton || event.target === closeButton) {
    editForm.classList.toggle('edit-form_status_active');
  }
};

const saveProfile = (event) => {
  event.preventDefault();
  fullNameOnPage.textContent = editFormFullName.value;
  descriptionOnPage.textContent = editFormDescription.value;
};
/*  Edit form - END */

/* Init Cards in Gallary - START */
const gallery = document.querySelector('.gallery');
const galleryItem = document.querySelector('#gallery-item').content;

const renderGalleryItems = () => {
  initialCards.forEach((item, index) => {
    const card = galleryItem.cloneNode(true);
    card.querySelector('.gallery-item').setAttribute('data-index', `${index}`);
    card.querySelector('.gallery-item__image').setAttribute('src', `${item.link}`);
    card.querySelector('.gallery-item__image').setAttribute('alt', `${item.name}`);
    card.querySelector('.gallery-item__title').textContent = item.name;
    gallery.append(card);
  });
};
/* Init Cards in Gallary - END */



renderGalleryItems();
profileEditButton.addEventListener('click', openEditForm);
editFormContainer.addEventListener('submit', saveProfile);
editForm.addEventListener('click', closeForm);
