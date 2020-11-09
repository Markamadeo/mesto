export class Card {
  constructor (data, selector, openViewerForm, openDeleteForm, userInfo) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openViewerForm = openViewerForm;
    this._openDeleteForm = openDeleteForm;
    this._cardId = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._userInfo = userInfo;
  }

  _getTamplate() {
    const template = document.querySelector(this._selector).content.cloneNode(true);
    const card = template.querySelector('.gallery-item');
    return card;
  }

  _likeHandler() {
    this._cardProperties.like.addEventListener('click', () => {
      this._cardProperties.like.classList.toggle('gallery-item__heart-button_type_active');
    });
  }

  _deleteHandler() {
    this._cardProperties.trash.addEventListener('click', () => {
      this._openDeleteForm(this._cardId);
    });
  }

  _imgHandler() {
    this._cardProperties.img.addEventListener('click', () => {
      this._openViewerForm(this._name, this._link);
    });
  }

  _setEventListeners() {
    this._likeHandler();
    this._deleteHandler();
    this._imgHandler();
  }

  generateCard() {
    this._card = this._getTamplate();

    this._cardProperties = {
      'img': this._card.querySelector('.gallery-item__image'),
      'like': this._card.querySelector('.gallery-item__heart-button'),
      'trash':  this._card.querySelector('.gallery-item__trash-button'),
      'title': this._card.querySelector('.gallery-item__title'),
      'counter': this._card.querySelector('.gallery-item__like-counter')
    }
    if(this._userInfo._id !== this._owner._id) {
      this._cardProperties.trash.remove();
    }
    this._cardProperties.img.setAttribute('src', `${this._link}`);
    this._cardProperties.img.setAttribute('alt', `${this._name}`);
    this._cardProperties.title.textContent = this._name;
    this._cardProperties.counter.textContent = this._likes.length;
    this._setEventListeners();

    return this._card;
  }
}
