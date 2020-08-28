const editForm = document.querySelector(".edit-form");
const profileEditButton = document.querySelector(".profile__edit-botton");
const editFormFullName = document.querySelector(".edit-form__textinput_type_full-name");
const editFormDescription = document.querySelector(".edit-form__textinput_type_description");
const fullNameOnPage = document.querySelector(".profile__full-name");
const descriptionOnPage = document.querySelector(".profile__description");
const editFormContainer = document.querySelector(".edit-form__container");
const closeButton = document.querySelector(".edit-form__close-button");
const saveButton = document.querySelector(".edit-form__save-button");

const openForm = () => {
  editFormFullName.value = fullNameOnPage.textContent;
  editFormDescription.value = descriptionOnPage.textContent;
  editForm.classList.toggle("edit-form_status_active");
  editFormFullName.focus();
}

const closeForm = (event) => {
  if (event.target === event.currentTarget || event.target === saveButton) {
    editForm.classList.toggle("edit-form_status_active");
  }
}

const saveProfile = (event) => {
  event.preventDefault();
  fullNameOnPage.textContent = editFormFullName.value;
  descriptionOnPage.textContent = editFormDescription.value;
  closeForm(event);
}

profileEditButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
editFormContainer.addEventListener('submit', saveProfile);
editForm.addEventListener('click', closeForm);
