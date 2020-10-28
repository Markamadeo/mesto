export default class UserInfo {
  constructor( {nameSelector, userInfoSelector} ) {
    this._nameSelector = document.querySelector(nameSelector);
    this._userInfoSelector = document.querySelector(userInfoSelector);
  }

  getUserinfo = () => {
    return {
      fullName: this._nameSelector.textContent,
      userDescription: this._userInfoSelector.textContent
    }
  };

  setUserInfo = ({value0: fullName, value1: userDescription}) => {
    this._nameSelector.textContent = fullName;
    this._userInfoSelector.textContent = userDescription;
  };
}
