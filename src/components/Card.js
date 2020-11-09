export class Card {
  constructor (data, selector, openViewerForm) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openViewerForm = openViewerForm;
    this._cardId = data._id;
    this._likes = data.likes;
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
    this._cardProperties.trash.addEventListener('click', (event) => {
      this._card.remove();
      this._card = null;
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

    this._cardProperties.img.setAttribute('src', `${this._link}`);
    this._cardProperties.img.setAttribute('alt', `${this._name}`);
    this._cardProperties.title.textContent = this._name;
    this._cardProperties.counter.textContent = this._likes.length;
    this._setEventListeners();

    return this._card;
  }
}
