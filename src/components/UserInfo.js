export default class UserInfo {
    constructor(name, description, avatar) {
        this._name = name;
        this._description = description;
        this._avatar = avatar;
    }

    // Возвращает объект с информацией(канал во внешний мир от объекта)
    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
        }
    }

    // Вставляет информацию(канал во внутрь объекта)
    setUserInfo(name, description) {
        this._name.textContent = name;
        this._description.textContent = description;
    }

    // Вставляет аватар
    setAvatar(avatar) {
        this._avatar.src = avatar;
        this._avatar.alt = `Фото: ${this._name}`;
    }
}