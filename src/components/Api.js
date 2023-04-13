export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //проверка запроса
  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //запрос информации о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkRequest(res);
    });
  }

  //запрос на редактирование данных
  editUserInfo({ name, job }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
    .then((res) => {
       return this._checkRequest(res)
    });
  }

  //запрос на редактирования аватара
  editUserAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      }),
    })
    .then((res) => {
      return this._checkRequest(res)
    });
  }

  //запрос карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkRequest(res)
    });
  }

  //запрос на добавление новой карточки
  addNewCard({ placename, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: placename,
        link: link,
      }),
    })
    .then((res) => {
      return this._checkRequest(res)
    });
  }

  //запрос на удаление карточки
  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkRequest(res)
    });
  }

  //запрос на лайк
  addLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
     return this._checkRequest(res)
    });
  }

  //запрос на удаление лайка
  removeLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkRequest(res)
    });
  }
}

