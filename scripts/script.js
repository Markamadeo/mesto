let profileEditButton = document.querySelector(".profile__edit-botton");
let editForm = document.querySelector(".edit-form");
let editFormFullName = document.querySelector(".edit-form__full-name");
let editFormDescription = document.querySelector(".edit-form__description");
let fullNameOnPage = document.querySelector(".profile__full-name");
let DescriptionOnPage = document.querySelector(".profile__description");
let saveButton = document.querySelector(".edit-form__save-button");
let closeButton = document.querySelector(".edit-form__close-button");

editFormFullName.value = fullNameOnPage.textContent;
editFormDescription.value = DescriptionOnPage.textContent;

function openCloseEdit() {
  editForm.classList.toggle("edit-form_status_active");
  editFormFullName.focus();
}

function saveProfile(evt) {
  evt.preventDefault();
  fullNameOnPage.textContent = editFormFullName.value;
  DescriptionOnPage.textContent = editFormDescription.value;
  openCloseEdit();
}

profileEditButton.addEventListener('click', openCloseEdit);
closeButton.addEventListener('click', openCloseEdit);
saveButton.addEventListener('click', saveProfile);
