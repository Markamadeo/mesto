import './index.css';
import { paramsForValidationOfForm, profileEditButton, profileAddingButton, editFormFullName, editFormDescription, submitButton, nameUserOnPage, aboutUserOnPage, avatarUserOnPage} from '../utils/constants.js';
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

function submitAddingForm () {
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
      this.close();
    })
};

function submitDeleteForm () {
  api.deleteCard(this._data)
    .then(() => {
      this._target.parentNode.remove();
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
api.initialCards()
  .then(data => {
    galleryItems = new Section(
      {
        items: data,
        renderer: (item) => {
        return createNewCard(
          item,
          '#gallery-item',
          popupPhotoViewer.open.bind(popupPhotoViewer),
          popupDeleteForm.open.bind(popupDeleteForm),
          userInfo,
          api
          );
        }
      },
      '.gallery'
    );
    galleryItems.renderItems();
  })

api.getUserInfo().then(data => userInfo.loadUserInfo(data));
let galleryItems;
const userInfo = new UserInfo({nameOnPage: nameUserOnPage, userDescription: aboutUserOnPage, userAvatar: avatarUserOnPage});
const popupPhotoViewer = new PopupWithImage('.form_type_foto-viewer');
const popupEditForm = new PopupWithForm('.form_type_edit', submitEditForm);
const popupAddingForm = new PopupWithForm('.form_type_adding', submitAddingForm);
const popupDeleteForm = new PopupWithSubmit('.form_type_delete-card', submitDeleteForm);

const formEditValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_edit');
formEditValidator.enableValidation();
const formAddingValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_adding');
formAddingValidator.enableValidation();
const formDeleteCard = new FormValidator(paramsForValidationOfForm, '.form__container_type_delete');
formDeleteCard.enableValidation();

profileEditButton.addEventListener('click', openEditForm);
profileAddingButton.addEventListener('click', openAddingForm);

