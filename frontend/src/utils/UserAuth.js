// export const BASE_URL = 'https://api.akum777.nomoredomains.rocks';
export const BASE_URL = 'http://localhost:3001';

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
  
  setHeader({ name, value }) {
    this._headers[name] = value;
  }
  
  delHeader(name) {
    delete this._headers[name];
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

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  };

}

export const userAuth = new UserAuth({
  baseUrl: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json"
  }
});
