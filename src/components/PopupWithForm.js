import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit.bind(this);
  }

  open () {
    super.open();
    this.setEventListeners();
  }

  close () {
    this._formContainer.reset();
    super.close();
    this._formContainer.removeEventListener('submit', this._submit);
  };

  setEventListeners () {
    super.setEventListeners();
    this._formContainer.addEventListener('submit', this._submit);
  };

  _getInputsValues () {
    const dataUserArr = this._form.querySelectorAll('.form__textinput');
    const dataUser = {};
    dataUserArr.forEach((item, index) => {
      dataUser[`value${index}`] = item.value;
    });
    return dataUser;
  };
}
