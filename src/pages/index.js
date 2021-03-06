import './index.css';
import { paramsForValidationOfForm, profileEditButton, profileAddingButton, changeAvatarButton, editFormFullName, editFormDescription, submitButton, nameUserOnPage, aboutUserOnPage, avatarUserOnPage} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import { createNewCard } from '../utils/utils.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {'authorization': 'ce46bc36-f433-488f-bf62-df1955cfcd45', 'Content-Type': 'application/json'}
});

function submitEditForm (evt) {
  evt.target.elements.editSubmit.textContent = 'Сохранить...';
  api.sendProfileInfo(this._getInputsValues())
    .then(data => {
      userInfo.loadUserInfo(data);
      evt.target.elements.editSubmit.textContent = 'Сохранить';
      this.close();
    })
};

function submitAddingForm (evt) {
  evt.target.elements.addingSubmit.textContent = 'Добавить...';
  const dataUser = this._getInputsValues();
  const dataInput = {
    name: dataUser.value0,
    link: dataUser.value1
  };
  api.sendNewCard(dataInput)
    .then(data => {
      const card = createNewCard(
        data,
        '#gallery-item',
        popupPhotoViewer.open.bind(popupPhotoViewer),
        popupDeleteForm.open.bind(popupDeleteForm),
        userInfo,
        api
      );
      galleryItems.addItemTheFirst(card);
      evt.target.elements.addingSubmit.textContent = 'Добавить';
      this.close();
    })
};

function submitDeleteForm (evt) {
  evt.target.elements.deleteSubmit.textContent = 'Да...';
  api.deleteCard(this._data)
    .then(() => {
    this._target.parentNode.remove();
    evt.target.elements.deleteSubmit.textContent = 'Да';
    this._close();
    })
}

function submitChangeAvatar (evt) {
  evt.target.elements.avatarSubmit.textContent = 'Сохранить...';
  const dataUser = this._getInputsValues();
  api.changeAvatar(dataUser)
    .then(data => {
      userInfo.loadUserInfo(data);
      evt.target.elements.avatarSubmit.textContent = 'Сохранить';
      this._close();
    })
}

const openEditForm = () => {
  const userData = userInfo.getUserinfo();
  editFormFullName.value = userData.fullName;
  editFormDescription.value = userData.userDescription;
  popupEditForm.open();
};

const openAddingForm = () => {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('form__submit-button_disabled');
  popupAddingForm.open();
};

const openAvatarForm = () => {
  pupupAvatarForm.open();
}

Promise.all([
  api.getUserInfo(),
  api.initialCards(),
])
  .then( ([userData, initialCards]) => {
    userInfo.loadUserInfo(userData);

    galleryItems = new Section(
      {
        items: initialCards,
        renderer: (item) => {
        return createNewCard(
          item,
          '#gallery-item',
          popupPhotoViewer.open.bind(popupPhotoViewer),
          popupDeleteForm.open.bind(popupDeleteForm),
          userInfo,
          api.removeLikePhoto.bind(api),
          api.addLikePhoto.bind(api)
          );
        }
      },
      '.gallery'
    );
    galleryItems.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

let galleryItems;
const userInfo = new UserInfo({nameOnPage: nameUserOnPage, userDescription: aboutUserOnPage, userAvatar: avatarUserOnPage});
const popupPhotoViewer = new PopupWithImage('.form_type_foto-viewer');
const popupEditForm = new PopupWithForm('.form_type_edit', submitEditForm);
const popupAddingForm = new PopupWithForm('.form_type_adding', submitAddingForm);
const popupDeleteForm = new PopupWithSubmit('.form_type_delete-card', submitDeleteForm);
const pupupAvatarForm = new PopupWithForm('.form_type_change-avatar', submitChangeAvatar)

const formEditValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_edit');
formEditValidator.enableValidation();
const formAddingValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_adding');
formAddingValidator.enableValidation();
const formDeleteCard = new FormValidator(paramsForValidationOfForm, '.form__container_type_delete');
formDeleteCard.enableValidation();
const formChangeAvatar = new FormValidator(paramsForValidationOfForm, '.form__container_type_change-avatar')
formChangeAvatar.enableValidation();

profileEditButton.addEventListener('click', openEditForm);
profileAddingButton.addEventListener('click', openAddingForm);
changeAvatarButton.addEventListener('click', openAvatarForm);
