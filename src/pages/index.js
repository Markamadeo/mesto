import './index.css';
import { initialCards, paramsForValidationOfForm, profileEditButton, profileAddingButton, editFormFullName, editFormDescription, submitButton, nameUserOnPage, aboutUserOnPage, avatarUserOnPage} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import { createNewCard } from '../utils/utils.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

function submitEditForm () {
  userInfo.setUserInfo(this._getInputsValues());
  this.close();
};

function submitAddingForm () {
  const dataUser = this._getInputsValues();
  const dataInput = {
    name: dataUser.value0,
    link: dataUser.value1
  };
  const card = createNewCard(dataInput, '#gallery-item', popupPhotoViewer.open.bind(popupPhotoViewer));
  galleryItems.addItem(card);
  this.close();
};

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

const galleryItems = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      return createNewCard(item, '#gallery-item', popupPhotoViewer.open.bind(popupPhotoViewer));
    }
  },
  '.gallery'
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {'authorization': 'ce46bc36-f433-488f-bf62-df1955cfcd45', 'Content-Type': 'application/json'}
});

const setUserInfo = (data) => {
  nameUserOnPage.textContent = data.name;
  aboutUserOnPage.textContent = data.about;
  avatarUserOnPage.setAttribute('src', data.avatar);
}

api.getUserInfo().then(data => setUserInfo(data));

const userInfo = new UserInfo({nameSelector: '.profile__full-name', userInfoSelector: '.profile__description'});
const popupPhotoViewer = new PopupWithImage('.form_type_foto-viewer');
const popupEditForm = new PopupWithForm('.form_type_edit', submitEditForm);
const popupAddingForm = new PopupWithForm('.form_type_adding', submitAddingForm);

const formEditValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_edit');
formEditValidator.enableValidation();
const formAddingValidator = new FormValidator(paramsForValidationOfForm, '.form__container_type_adding');
formAddingValidator.enableValidation();

profileEditButton.addEventListener('click', openEditForm);
profileAddingButton.addEventListener('click', openAddingForm);

galleryItems.renderItems();
