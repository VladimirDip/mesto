export default class UserInfo {
  constructor(dataInfo) {
    this._profileName = document.querySelector(dataInfo.profileNameSelector);
    this._profileDescription = document.querySelector(
      dataInfo.profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(dataUser) {
    this._profileName.textContent = dataUser.name;
    this._profileDescription.textContent = dataUser.description;
  }
}
