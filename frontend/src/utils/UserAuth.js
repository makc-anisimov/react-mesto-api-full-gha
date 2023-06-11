export const BASE_URL = 'https://auth.nomoreparties.co';

class UserAuth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(
    email,
    password
  ) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }).then(this._getResponseData);
  }

  authorize({
    email,
    password
  }) {

    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        "password": `${password}`,
        "email": `${email}`
      }),
    }).then(this._getResponseData);
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  };
}

export const userAuth = new UserAuth({
  baseUrl: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json"
  }
});
