import '../src/pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard } from './components/card.js';
import { enableValidation, validationConfig, clearValidation } from './components/validation.js';
import { getCards, getUser, updateUser, createNewCard, updateAvatar, likeCard } from './components/api.js'

const profileEeditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupForm = popupTypeEdit.querySelector('.popup__form');
const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const popupInputTypeDescription = popupTypeEdit.querySelector('.popup__input_type_description');
const modalAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = modalAvatar.querySelector('.popup__form');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const formElement = popupTypeNewCard.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');  
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

//Лайк
function handleLike(likeButton, cardId, isLiked, likeCountElement) {
  likeCard(cardId, isLiked)
  .then((updatedCard) => {
    const updatedLikes = updatedCard.likes.length;
    likeButton.classList.toggle('card__like-button_is-active', !isLiked);
    likeCountElement.textContent = updatedLikes;
  });
}

// Функция закрытия Модальных окон
popups.forEach(function (popup) {
  popup.classList.add('popup_is-animated');

  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

// Функция для изменения состояния кнопки Сохранить
function setButtonState(form, isLoading, text) {
  const button = form.querySelector('.popup__button');
  button.textContent = text;
  button.disabled = isLoading;
}

// Модальное окно Edit
function openModalEdit(
  popupTypeEdit,
  profileTitle,
  profileDescription,
  popupInputTypeName,
  popupInputTypeDescription
) {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  clearValidation(popupForm, validationConfig);
}

profileEeditButton.addEventListener('click', function () {
  clearValidation(popupTypeEdit, validationConfig);
  openModal(popupTypeEdit);
  openModalEdit(
    popupTypeEdit,
    profileTitle,
    profileDescription,
    popupInputTypeName,
    popupInputTypeDescription
  );
});

profileAddButton.addEventListener('click', function () {
  clearValidation(
    formElement, 
    validationConfig, 
    true);
   openModal(popupTypeNewCard);
});

// Функция открытия картинки
function openImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupTypeImage);
}

// Модальное окно Аватара
profileImage.addEventListener('click', () => {
  openModal(modalAvatar);
  clearValidation(
    avatarForm,
    validationConfig,
    true
  );
});

// Pедактирование профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = popupInputTypeName.value;
  const jobInput = popupInputTypeDescription.value;
  const form = evt.target;
  setButtonState(form, true, 'Сохранение...');
  updateUser(nameInput, jobInput)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupTypeEdit);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => setButtonState(form, false, 'Сохранить'));
}

// Функция добавления новых карточек
function handleCardSubmit(evt) {
  evt.preventDefault();

  const placeName = formElement.elements['place-name'].value;
  const placeLink = formElement.elements['link'].value;

  createNewCard( placeName, placeLink )
  .then((cardData) => {
    placesList.prepend(
      createCard(
        cardData,
        deleteCard,
        handleLike,
        openImage,
        cardData.owner._id,
      )
  );

  closeModal(popupTypeNewCard);
  formElement.reset();
})
.catch(err => {
  console.log(err);
})
}

// Прикрепляем обработчик к форме
popupForm.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('submit', handleCardSubmit);

// Вызов Promise
Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    const ownerIds = cards.map((card) => card.owner._id);
    displayCards(cards, userData._id, ownerIds);
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch(err => {
    console.error(err);
  });
  
 // Вывести карточки на страницу
function displayCards(cards, userId) {
  cards.forEach(function (cardData) {
    placesList.append(
      createCard(cardData, deleteCard, handleLike, openImage, userId)
    );
  });
}

// Обработчик отправки нового аватара
function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();

  setButtonState(evt.target, true, "Сохранение...");
  updateAvatar(modalAvatar.querySelector('input[name="link"]').value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(modalAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => setButtonState(evt.target, false, "Сохранить"));
}

avatarForm.addEventListener("submit", handleUpdateAvatarSubmit);

enableValidation(validationConfig);
