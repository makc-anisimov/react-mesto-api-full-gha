class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  };


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  };

  edtiProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => this._getResponseData(res))
  }

  updateAvatar(newAvatarlink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarlink
      })
    })
      .then(res => this._getResponseData(res))
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => this._getResponseData(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return (
        api.deleteLike(id)
      )

    } else {
      return (
        api.addLike(id)
      )
    }
  }
}

export const api = new Api({
  baseUrl: 'https://api.akum777.nomoredomains.rocks',
  headers: {
    // authorization: 'test fail', // для вызова ошибки
    // authorization: 'b1e741c7-60c4-4f43-a930-80a1fe61268c', // мой токен
    'Content-Type': 'application/json'
  }
});
