const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
    headers: {
      authorization: 'fcd2820e-1ad8-4826-b11c-e2add8d8bdd9',
      'Content-Type': 'application/json'
    }
  }

export function getProfileInformation() {
    return fetch(`${config.baseUrl}/users/me `, {
        headers: config.headers
    }).then(checkRes);
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(checkRes);
} 

export function editProfileServer(nameProfile, aboutProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: aboutProfile
    })
  }).then(checkRes);
}

export function postNewCardServer(nameCard, linkCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  }).then(checkRes)
}

export function cardDeleteFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkRes)
}

export function putLikeCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(checkRes)
}

export function deleteLikeCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkRes)
}

export function editAvatarServer(linkAvatar) {
  return fetch(`${config.baseUrl}//users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar
    })
  }).then(checkRes)
}

// Внутренние функции

function checkRes(res) {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}