export default class Popup {
  constructor(selector) {
    this._form = document.querySelector(selector);
    this._formContainer = this._form.querySelector('.form__container');
    this._closeButton = this._form.querySelector('.form__close-button');
    this._submitButtom = this._form.querySelector('.form__submit-button');
  }

  open () {
    this._togglePopupStatus(this._form);
  };

  close = () => {
    this._togglePopupStatus(this._form);
    this._closeButton.removeEventListener('keydown', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.removeEventListener('click', this._handleClickClose);
  };

  setEventListeners () {
    this._closeButton.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    this._form.addEventListener('click', this._handleClickClose);
  };

  _togglePopupStatus (elem) {
    elem.classList.toggle('form_status_active');
  };

  _handleClickClose = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };
}
