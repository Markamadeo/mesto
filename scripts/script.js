import { initialCards } from './data.js';

const gallery = document.querySelector('.gallery');
const galleryItem = document.querySelector('#gallery-item').content;
const fotoViewerImg = document.querySelector('.form__foto-viewer-img');
const fotoCaption = document.querySelector('.form__foto-viewer-description');
const profileEditButton = document.querySelector('.profile__edit-botton');
const profileAddingButton = document.querySelector('.profile__add-botton');
const editForm = document.querySelector('.form_type_edit');
const addingForm = document.querySelector('.form_type_adding');
const fotoViewer = document.querySelector('.form_type_foto-viewer');
const editFormFullName = document.querySelector('.form__textinput_type_edit-full-name');
const editFormDescription = document.querySelector('.form__textinput_type_edit-description');
const fullNameOnPage = document.querySelector('.profile__full-name');
const descriptionOnPage = document.querySelector('.profile__description');
const editSaveButton = document.querySelector('.form__submit-button_type_edit-save-button');
const addCardButton = document.querySelector('.form__submit-button_type_adding-add-button');
const addingFormName = document.querySelector('.form__textinput_type_adding-name');
const addingFormLinkAdress = document.querySelector('.form__textinput_type_adiing-link-adress');

const toggleClass = (elem) => {
  elem.classList.toggle('form_status_active');
};

const formFillValues = () => {
  editFormFullName.value = fullNameOnPage.textContent;
  editFormDescription.value = descriptionOnPage.textContent;
  editFormFullName.focus();
};

const fillFotoViewer = (event) => {
  const linkAdress = event.target.getAttribute('src');
  const imgName = event.target.getAttribute('alt');
  fotoViewerImg.setAttribute('src', linkAdress);
  fotoViewerImg.setAttribute('alt', imgName);
  fotoCaption.textContent = imgName;
};

const openForm = (event) => {
  if (event.target === profileEditButton) {
    formFillValues(event);
    toggleClass(editForm);
  }
  if (event.target === profileAddingButton) {
    toggleClass(addingForm);
  }
  if (event.target.classList.contains('gallery-item__image')) {
    fillFotoViewer(event);
    toggleClass(fotoViewer);
  }
};

const closeForm = (event) => {
  if (event.target === event.currentTarget || event.target === editSaveButton || event.target === addCardButton || event.target.classList.contains('form__close-button')) {
    toggleClass(event.target.closest('.form'));
  }
};

const createNewCard = (name, link) => {
  const card = galleryItem.cloneNode(true);
  const cardImg = card.querySelector('.gallery-item__image');
  cardImg.setAttribute('src', `${link}`);
  cardImg.setAttribute('alt', `${name}`);
  card.querySelector('.gallery-item__title').textContent = name;
  return card;
};

const submitInputChange = (event) => {
  event.preventDefault();
  if (event.target.classList.contains('form__container_type_edit')) {
    fullNameOnPage.textContent = editFormFullName.value;
    descriptionOnPage.textContent = editFormDescription.value;
  }
  if (event.target.classList.contains('form__container_type_adding')) {
    gallery.prepend(createNewCard(addingFormName.value, addingFormLinkAdress.value));
    addingFormName.value = '';
    addingFormLinkAdress.value = '';
  }
};

const eventCards = (event) => {
  if (event.target.classList.contains('gallery-item__heart-button')) {
    event.target.classList.toggle('gallery-item__heart-button_type_active');
  }
  if (event.target.classList.contains('gallery-item__trash-button')) {
    const listItem = event.target.closest('.gallery-item');
    listItem.remove();
  }
};

const renderGalleryItems = () => {
  initialCards.forEach((item) => {
    gallery.append(createNewCard(item.name, item.link));
  });
};

profileEditButton.addEventListener('click', openForm);
profileAddingButton.addEventListener('click', openForm);
gallery.addEventListener('click', openForm);
editForm.addEventListener('click', closeForm);
addingForm.addEventListener('click', closeForm);
fotoViewer.addEventListener('click', closeForm);
editForm.addEventListener('submit', submitInputChange);
addingForm.addEventListener('submit', submitInputChange);
gallery.addEventListener('click', eventCards);

renderGalleryItems();
