import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit.bind(this);
  }

  close = () => {
    this._formContainer.reset();
    this._togglePopupStatus(this._form);
    document.removeEventListener('keydown', this._handleEscClose);
    this._closeButton.removeEventListener('click', this.close);
    this._form.removeEventListener('click', this._handleClickClose);
    this._formContainer.removeEventListener('submit', this._submit);
  };

  setEventListeners = () => {
    document.addEventListener('keydown', this._handleEscClose);
    this._closeButton.addEventListener('click', this.close);
    this._form.addEventListener('click', this._handleClickClose);
    this._formContainer.addEventListener('submit', this._submit);
  };

  _getInputsValues = () => {
    const dataUserArr = this._form.querySelectorAll('.form__textinput');
    let dataUser = {};
    dataUserArr.forEach((item, index) => {
      dataUser[`value${index}`] = item.value;
    });
    return dataUser;
  };
}
