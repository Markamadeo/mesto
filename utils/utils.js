import {Card} from '../components/Card.js';

export const createNewCard = (data, template, func) => {
  const card = new Card(data, template, func);
  const cardElement = card.generateCard();
  return cardElement;
}
