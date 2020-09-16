import { initialCards } from './data.js';

const gallery = document.querySelector('.gallery');
const form = document.querySelectorAll('.form');
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
const addingFormName = document.querySelector('.form__textinput_type_adding-name');
const addingFormLinkAdress = document.querySelector('.form__textinput_type_adiing-link-adress');

const togglePopupStatus = (elem) => {
  elem.classList.toggle('form_status_active');
};

const findParentForm = elem => elem.closest('.form');

const closeForm = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('form__close-button')) {
    togglePopupStatus(event.target.closest('.form'));
  };
};

const createNewCard = (name, link) => {
  const card = galleryItem.cloneNode(true);
  const cardImg = card.querySelector('.gallery-item__image');
  const cardLike = card.querySelector('.gallery-item__heart-button');
  const cardTrash = card.querySelector('.gallery-item__trash-button');

  cardImg.setAttribute('src', `${link}`);
  cardImg.setAttribute('alt', `${name}`);
  card.querySelector('.gallery-item__title').textContent = name;

  cardLike.addEventListener('click', (event) => {
    event.target.classList.toggle('gallery-item__heart-button_type_active');
  });
  cardTrash.addEventListener('click', (event) => {
    const listItem = event.target.closest('.gallery-item');
    listItem.remove();
  });
  cardImg.addEventListener('click', (event) => {
    const linkAdress = event.target.getAttribute('src');
    const imgName = event.target.getAttribute('alt');
    fotoViewerImg.setAttribute('src', linkAdress);
    fotoViewerImg.setAttribute('alt', imgName);
    fotoCaption.textContent = imgName;
    togglePopupStatus(fotoViewer);
  });

  return card;
};

const submitEditForm = (event) => {
  event.preventDefault();
  fullNameOnPage.textContent = editFormFullName.value;
  descriptionOnPage.textContent = editFormDescription.value;
  togglePopupStatus(findParentForm(event.target));
};

const submitAddingForm = (event) => {
  event.preventDefault();
  gallery.prepend(createNewCard(addingFormName.value, addingFormLinkAdress.value));
  event.target.closest('.form__container').reset();
  togglePopupStatus(findParentForm(event.target));
};

const renderGalleryItems = () => {
  initialCards.forEach((item) => {
    gallery.append(createNewCard(item.name, item.link));
  });
};

form.forEach((form) => {
  form.addEventListener('click', closeForm);
});
profileEditButton.addEventListener('click', () => {
    togglePopupStatus(editForm);
    editFormFullName.value = fullNameOnPage.textContent;
    editFormDescription.value = descriptionOnPage.textContent;
    editFormFullName.focus();
});
profileAddingButton.addEventListener('click', () => togglePopupStatus(addingForm));
editForm.addEventListener('submit', submitEditForm);
addingForm.addEventListener('submit', submitAddingForm);

renderGalleryItems();
