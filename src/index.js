import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal} from "./components/modal.js";
import { createCard, deleteCard, likeCard} from './components/card.js';


const profileEeditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
// const editProfile = document.forms.edit-profile;
// const popupInputTypeName = document.querySelector('.popup__input_type_name');
// const popupInputTypeDescription = document.querySelector('.popup__input_type_description');
// const profileTitle = document.querySelector('.profile__title');
// const profileDescription = document.querySelector('.profile__description');


// Вывести карточки на страницу
initialCards.forEach((data) => placesList.append(createCard(data.name, data.link, deleteCard, openImage, likeCard)));

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

