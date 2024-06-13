import { openModal, closeModal} from './modal'
import { apiDeleteCard } from './api'

// Функция создания карточки
export const createCard = (
  cardData, 
  callback,
  likeCallback,
  imageCallback,
  userId
) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const modalDelete = document.querySelector('.popup_type_delete');
  const deleteForm = modalDelete.querySelector('.popup__form');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes ? cardData.likes.length : 0;

  if (cardData.likes.some(element => element._id === userId)) {
    cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  }

  if (userId === cardData.owner._id) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }
   
  deleteButton.addEventListener('click', () => {
    openModal(modalDelete);
    deleteForm.onsubmit = (event) => {
      event.preventDefault();
      apiDeleteCard(cardData._id)
        .then(() => {
          callback(cardElement);
          closeModal(modalDelete);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  });

  likeButton.addEventListener('click', function () {
    const isLiked = likeButton.classList.contains(
      'card__like-button_is-active'
    );
    likeCallback(likeButton, cardData._id, isLiked, likeCount);
  });

  cardImage.addEventListener('click', function () {
    imageCallback(cardData['name'], cardData['link']);
  });

  return cardElement;
};

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
};