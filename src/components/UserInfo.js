export default class UserInfo {
  constructor( {nameOnPage, userDescription, userAvatar}) {
    this._nameOnPage = nameOnPage;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
  }

  loadUserInfo(data) {
    this._nameOnPage.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._userAvatar.setAttribute('src', data.avatar);
  }

  getUserinfo = () => {
    return {
      fullName: this._nameOnPage.textContent,
      userDescription: this._userDescription.textContent
    }
  };

  setUserInfo = ({value0: fullName, value1: userDescription}) => {
    this._nameOnPage.textContent = fullName;
    this._userDescription.textContent = userDescription;
  };
}
