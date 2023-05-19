export default class Api {
  constructor(options) {
    this._cohortId = options.cohortId;
    this._headers = options.headers;
  }

  _checkResponseStatus(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error ${response.status} ${response.statusText}`);
  }

  getUserData() {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`,
      {
        method: "GET",
        headers: this._headers,
      }
    ).then(this._checkResponseStatus);
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponseStatus);
  }

  setUserData(data) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.description,
        }),
      }
    ).then(this._checkResponseStatus);
  }

  addNewCard(name, link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponseStatus);
  }

  setUserAvatar(avatar) {
    // console.log(avatar);
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar }),
      }
    ).then(this._checkResponseStatus);
  }

  likeCard(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then(this._checkResponseStatus);
  }

  unlikeCard(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._checkResponseStatus);
  }

  deleteCard(id) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._checkResponseStatus);
  }
}
