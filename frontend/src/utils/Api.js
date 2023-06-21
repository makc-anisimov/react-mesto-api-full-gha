class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  };

  _checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      this._headers.Authorization = `Bearer ${jwt}`;
    };
  }

  _getResponseData(res) {
    if (!res.ok) { return Promise.reject(res.status); }
    return res.json();
  }

  getProfile() {
    this._checkToken();
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  };

  getInitialCards() {
    this._checkToken();
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._getResponseData)
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
      .then(this._getResponseData)
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
      .then(this._getResponseData)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return (api.deleteLike(id))
    } else return (api.addLike(id))
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3001',
  // baseUrl: 'https://api.akum777.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json'
  }
});
