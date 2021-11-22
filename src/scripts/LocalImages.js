class LocalImages {
    constructor() {
        this._logo = new URL('../images/logo.svg', import.meta.url);
        this._kusto = new URL('../images/kusto.jpg', import.meta.url);

        this._logoImage = { name: 'Логотип: Место', link: this._logo };
        this._kustoImage = { name: 'Фото: Жак-Ив Кусто', link: this._kusto };

        this._profileAvatar = document.querySelector('.profile__avatar');
        this._headerLogo = document.querySelector('.header__logo');
        this._profileAvatar.src = this._kustoImage.link;
        this._profileAvatar.alt = this._kustoImage.name;
        this._headerLogo.src = this._logoImage.link;
        this._headerLogo.alt = this._logoImage.name;
    }
}

export default LocalImages;