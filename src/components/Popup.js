export default class Popup {
  constructor(selector) {
    this._form = document.querySelector(selector);
    this._closeButton = this._form.querySelector('.form__close-button');
    this._close = this.close.bind(this);
  }

  open () {
    this._togglePopupStatus(this._form);
  };

  close () {
    this._togglePopupStatus(this._form);
    this._closeButton.removeEventListener('click', this._close);
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.removeEventListener('click', this._handleClickClose);
  };

  setEventListeners () {
    this._closeButton.addEventListener('click', this._close);
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
