export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc)
}

function closeEsc(evt) {
const openedPopup = document.querySelector('.popup_is-opened');
if (evt.key === 'Escape') {
  closeModal(openedPopup);
}
}