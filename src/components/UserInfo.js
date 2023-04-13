export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  //принимает новый аватар и добавляет на страницу
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
