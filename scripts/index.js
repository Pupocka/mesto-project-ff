// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const addCard = (name, link, deleteCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => placesList.append(addCard(data.name, data.link, deleteCard)));
