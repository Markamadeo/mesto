import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._formContainer = this._form.querySelector('.form__container');
    this._submit = submit.bind(this);
  }

  open (data, target) {
    this._data = data;
    this._target = target;
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
}
