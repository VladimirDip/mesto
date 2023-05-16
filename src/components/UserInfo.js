export default class UserInfo {
  constructor(dataInfo) {
    this._profileName = document.querySelector(dataInfo.profileNameSelector);
    this._profileDescription = document.querySelector(
      dataInfo.profileDescriptionSelector
    );
    this._profileAvatar = document.querySelector(dataInfo.profileAvatar);
    // console.log(this._profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
      avatar: this._profileAvatar,
    };
  }

  setUserInfo(dataUser) {
    if (dataUser.name) {
      this._profileName.textContent = dataUser.name;
    }
    if (dataUser.description) {
      this._profileDescription.textContent = dataUser.description;
    }
    if (dataUser.avatar) {
      // console.log(dataUser.avatar);
      this._profileAvatar.src = dataUser.avatar;
    }
  }
}
