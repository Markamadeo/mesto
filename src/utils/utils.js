import {Card} from '../components/Card.js';

export const createNewCard = (data, template, formViever, formDelete, userInfo) => {
  const card = new Card(data, template, formViever, formDelete, userInfo);
  const cardElement = card.generateCard();
  return cardElement;
}
