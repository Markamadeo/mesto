import {openViewerForm} from './script.js';

export class Card {
  constructor (data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getTamplate() {
    const card = document.querySelector(this._selector).content.cloneNode(true);
    return card;
  }

  _likeHandler() {
    this._cardProperties.like.addEventListener('click', () => {
      this._cardProperties.like.classList.toggle('gallery-item__heart-button_type_active');
    });
  }

  _deleteHandler() {
    this._cardProperties.trash.addEventListener('click', (event) => {
      const listItem = event.target.closest('.gallery-item');
      listItem.remove();
    });
  }

  _imgHandler() {
    this._cardProperties.img.addEventListener('click', () => {
      const fotoViewerImg = document.querySelector('.form__foto-viewer-img');
      const fotoCaption = document.querySelector('.form__foto-viewer-description');
      fotoViewerImg.setAttribute('src', this._link);
      fotoViewerImg.setAttribute('alt', this._name);
      fotoCaption.textContent = this._name;
      openViewerForm();
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
      'title': this._card.querySelector('.gallery-item__title')
    }

    this._cardProperties.img.setAttribute('src', `${this._link}`);
    this._cardProperties.img.setAttribute('alt', `${this._name}`);
    this._cardProperties.title.textContent = this._name;
    this._setEventListeners();

    return this._card;
  }
}
