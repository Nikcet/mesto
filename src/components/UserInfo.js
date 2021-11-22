export default class UserInfo {
    constructor(name, description) {
        this._name = name;
        this._description = description;
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
}