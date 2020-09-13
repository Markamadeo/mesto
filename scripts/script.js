import { initialCards } from './data.js';
const gallery = document.querySelector('.gallery');
const galleryItem = document.querySelector('#gallery-item').content;

/* POPUP: Edit form */
const editForm = document.querySelector('.edit-form');
const profileEditButton = document.querySelector('.profile__edit-botton');
const editFormFullName = document.querySelector('.edit-form__textinput_type_full-name');
const editFormDescription = document.querySelector('.edit-form__textinput_type_description');
const fullNameOnPage = document.querySelector('.profile__full-name');
const descriptionOnPage = document.querySelector('.profile__description');
const editFormContainer = document.querySelector('.edit-form__container');
const closeEditButton = document.querySelector('.edit-form__close-button');
const saveEditButton = document.querySelector('.edit-form__save-button');

const openEditForm = () => {
  editFormFullName.value = fullNameOnPage.textContent;
  editFormDescription.value = descriptionOnPage.textContent;
  editForm.classList.toggle('edit-form_status_active');
  editFormFullName.focus();
};

const closeEditForm = (event) => {
  if (event.target === event.currentTarget || event.target === saveEditButton || event.target === closeEditButton) {
    editForm.classList.toggle('edit-form_status_active');
  }
};

const saveProfile = (event) => {
  event.preventDefault();
  fullNameOnPage.textContent = editFormFullName.value;
  descriptionOnPage.textContent = editFormDescription.value;
};

profileEditButton.addEventListener('click', openEditForm);
editFormContainer.addEventListener('submit', saveProfile);
editForm.addEventListener('click', closeEditForm);
/* POPUP: Edit form - END */

/* POPUP: Adding cards form */
const addingForm = document.querySelector('.adding-form');
const profileAddingButton = document.querySelector('.profile__add-botton');
const addingFormName = document.querySelector('.adding-form__textinput_type_name');
const addingFormLinkAdress = document.querySelector('.adding-form__textinput_type_link-adress');
const addingFormAddButton = document.querySelector('.adding-form__add-button');
const addingFormCloseButton = document.querySelector('.adding-form__close-button');
const addingFormContainer = document.querySelector('.adding-form__container');

const openAddingForm = () => {
  addingFormName.value = 'Название';
  addingFormLinkAdress.value = 'Ссылка на картинку';
  addingForm.classList.toggle('adding-form_status_active');
  addingFormName.focus();
};

const addNewCard = (event) => {
  event.preventDefault();
  const card = galleryItem.cloneNode(true);
  card.querySelector('.gallery-item').setAttribute('data-index', `${gallery.children.length}`);
  card.querySelector('.gallery-item__image').setAttribute('src', `${addingFormLinkAdress.value}`);
  card.querySelector('.gallery-item__image').setAttribute('alt', `${addingFormName.value}`);
  card.querySelector('.gallery-item__title').textContent = addingFormName.value;
  gallery.prepend(card);
};

const closeAddingForm = (event) => {
  if (event.target === event.currentTarget || event.target === addingFormAddButton || event.target === addingFormCloseButton) {
    addingForm.classList.toggle('adding-form_status_active');
  }
};
profileAddingButton.addEventListener('click', openAddingForm);
addingFormContainer.addEventListener('submit', addNewCard);
addingForm.addEventListener('click', closeAddingForm);
/* POPUP: Adding cards form - END */

/* POPUP: Foto viewer */
const fotoViewerImg = document.querySelector('.foto-viewer__img');
const fotoViewer = document.querySelector('.foto-viewer');
const closeFotoViewerButton = document.querySelector('.foto-viewer__close-button');
const fotoCaption = document.querySelector('.foto-viewer__description');

const closeFotoViewer = (event) => {
  if (event.target === event.currentTarget || event.target === closeFotoViewerButton) {
    fotoViewer.classList.toggle('foto-viewer_status_active');
  }
}

const openFotoViewer = (event) => {
  const linkAdress = event.target.getAttribute('src');
  const imgName = event.target.getAttribute('alt');
  fotoViewerImg.setAttribute('src', linkAdress);
  fotoViewerImg.setAttribute('alt', imgName);
  fotoCaption.textContent = imgName;
  fotoViewer.classList.toggle('foto-viewer_status_active');
}

fotoViewer.addEventListener('click', closeFotoViewer);
/* Foto viewer - END */

/* Event cards */
const eventCards = (event) => {
  if (event.target.classList.contains('gallery-item__heart-button')) {
    event.target.classList.toggle('gallery-item__heart-button_type_active');
  }

  if (event.target.classList.contains('gallery-item__image')) {
    openFotoViewer(event);
  }

  if (event.target.classList.contains('gallery-item__trash-button')) {
    const listItem = event.target.closest('.gallery-item');
    listItem.remove();
  }
};

gallery.addEventListener('click', eventCards);
/* Event cards - END */

/* Init Cards in Gallary */
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
