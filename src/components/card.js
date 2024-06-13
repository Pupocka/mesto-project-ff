import { likeCard } from './api'

// Функция создания карточки
export const createCard = (
  cardData,
  apiDeleteCard,
  handleLike,
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
  
  deleteButton.addEventListener('click', (evt) => {
    apiDeleteCard(cardData._id)
      .then(() => {
        const card = evt.target.closest('.card');
        card.remove();
      })
      .catch(err => {
        console.log(err);
      });
  });

  likeButton.addEventListener('click', function () {
    const isLiked = likeButton.classList.contains(
      'card__like-button_is-active'
    );
    handleLike(likeButton, cardData._id, isLiked, likeCount);
  });

  cardImage.addEventListener('click', function () {
    imageCallback(cardData['name'], cardData['link']);
  });

  return cardElement;
};

//Лайк
export function handleLike(likeButton, cardId, isLiked, likeCountElement) {
  likeCard(cardId, isLiked)
  .then((updatedCard) => {
    const updatedLikes = updatedCard.likes.length;
    likeButton.classList.toggle('card__like-button_is-active', !isLiked);
    likeCountElement.textContent = updatedLikes;
  })
  .catch((err) => {
    console.error(err);
  });
};