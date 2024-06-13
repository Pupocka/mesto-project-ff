function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '1de7073e-8097-4f85-991b-cefc7e281b92',
    'Content-Type': 'application/json'
  },
};

//Загрузка информации о пользователе
export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(checkResponse);
}

// Функция для получения карточек
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(checkResponse);
}

//Редактирование профиля
export function updateUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(checkResponse);
}

//Добавление новой карточки
export const createNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
  .then(checkResponse);
}

 // Функция вызова API для удаления карточки
export function apiDeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}

// Функция для отправки нового аватара на сервер
export const updateAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    })
  })
  .then(checkResponse);
}

// Функция обработки лайка
export function likeCard(cardId, isLiked) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  })
    .then(checkResponse);
  }