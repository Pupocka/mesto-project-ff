// Функция создания карточки
export const createCard = (name, link, deleteCard, openImage, likeCard) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');


  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;

  cardLikeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', function() {
    openImage(name, link);
  });

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
};

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
};

//Лайк
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}