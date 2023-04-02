export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    }
    return userInfo;
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userName, userJob) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }
}
