export default class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {headers: this.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: не удалось загрузить данные пользователя, статус ${res.status}`);
      })
      .catch(err => alert(err));
  }

  initialCards() {
    return fetch(this.baseUrl + '/cards', {headers: this.headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: не удалось загрузить данные галереи, статус ${res.status}`);
      })
      .catch(err => alert(err));
  }

  sendProfileInfo({value0: name, value1: about}) {
    return fetch(
      this.baseUrl + '/users/me',
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: не удалось отправить данные пользователя, статус ${res.status}`);
      })
      .catch(err => alert(err));
  }
}
