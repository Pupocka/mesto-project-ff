import '../src/pages/index.css';
import { initialCards } from './components/cards.js';
import { openModal, closeModal} from './components/modal.js';
import { createCard, deleteCard, likeCard} from './components/card.js';
import { enableValidation, validationConfig } from './components/validation.js';

const profileEeditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const popupForm = popupTypeEdit.querySelector('.popup__form');
const popupInputTypeName = popupForm.querySelector('.popup__input_type_name');
const popupInputTypeDescription = popupForm.querySelector('.popup__input_type_description');
const formElement = popupTypeNewCard.querySelector('.popup__form');
const cardName = formElement.querySelector('.popup__input_type_card-name');
const cardLink = formElement.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');  
const profileDescription = document.querySelector('.profile__description');

enableValidation(validationConfig);

// Открытие и закрытие модального окна
profileEeditButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// Функция открытия картинки
function openImage(name, link) {
  popupTypeImage.querySelector('.popup__image').src = link;
  popupTypeImage.querySelector('.popup__image').alt = name;
  popupTypeImage.querySelector('.popup__caption').textContent = name;

  openModal(popupTypeImage);
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

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameInput = popupInputTypeName.value;
  const jobInput = popupInputTypeDescription.value;

  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;

  closeModal(popupTypeEdit);
}

// Pедактирование профиля
function OpenProfileEditForm() {
  const nameInput = profileTitle.textContent;
  const jobInput = profileDescription.textContent;

  popupInputTypeName.value = nameInput;
  popupInputTypeDescription.value = jobInput;
}

// Функция добавления новых карточек
function handleCardSubmit(evt) {
  evt.preventDefault();

  const name = cardName.value;
  const link = cardLink.value;

  placesList.prepend(createCard(name, link, deleteCard, openImage, likeCard));

  closeModal(popupTypeNewCard);
  
  formElement.reset();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('submit', handleCardSubmit);
profileEeditButton.addEventListener('click', OpenProfileEditForm);

// Вывести карточки на страницу
initialCards.forEach((data) => placesList.append(createCard(data.name, data.link, deleteCard, openImage, likeCard)));