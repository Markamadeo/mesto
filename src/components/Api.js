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
}
