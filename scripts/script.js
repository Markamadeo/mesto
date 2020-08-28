const editForm = document.querySelector(".edit-form");
const profileEditButton = document.querySelector(".profile__edit-botton");
const editFormFullName = document.querySelector(".edit-form__full-name");
const editFormDescription = document.querySelector(".edit-form__description");
const fullNameOnPage = document.querySelector(".profile__full-name");
const descriptionOnPage = document.querySelector(".profile__description");
const editFormContainer = document.querySelector(".edit-form__container");
const closeButton = document.querySelector(".edit-form__close-button");
const saveButton = document.querySelector(".edit-form__save-button");

const openForm = () => {
  editForm.classList.toggle("edit-form_status_active");
  editFormFullName.focus();
  editFormFullName.value = fullNameOnPage.textContent;
  editFormDescription.value = descriptionOnPage.textContent;
}

const saveProfile = (event) => {
  event.preventDefault();
  fullNameOnPage.textContent = editFormFullName.value;
  descriptionOnPage.textContent = editFormDescription.value;
  closeForm();
}

const closeForm = (event) => {
  if (event.target === event.currentTarget || event.target === saveButton) {
    editForm.classList.toggle("edit-form_status_active");
  }
}

profileEditButton.addEventListener('click', openForm);
closeButton.addEventListener('click', closeForm);
editFormContainer.addEventListener('submit', saveProfile);
editForm.addEventListener('click', closeForm);
