import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
      super(selector);
      this._viewerImg = this._form.querySelector('.form__foto-viewer-img');
      this._viewerDescription= this._form.querySelector('.form__foto-viewer-description');
    }

    open (name, link) {
      this._viewerImg.setAttribute('src', link);
      this._viewerImg.setAttribute('alt', name);
      this._viewerDescription.textContent = name;
      super.open();
      super.setEventListeners();
    };
}
