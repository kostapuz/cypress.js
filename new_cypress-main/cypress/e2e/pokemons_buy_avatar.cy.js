import * as userData from "../helpers/pokemons_default_data.json"
import * as authPageElements from "../locators/pokemons_auth_page_elements.json"
import * as pagesElements from "../locators/pokemons_pages_elements.json"

describe("Покупка нового аватара для тренера", function () {
    it("Авторизация", function () {
        cy.visit('https://pokemonbattle.ru'); //Открыть сайт
        cy.get(authPageElements.input_login).type(userData.login); //Найти инпут логина, вввести логин
        cy.get(authPageElements.input_password).type(userData.password); //Найти импут пароля, ввести пароль
        cy.get(authPageElements.button_enter).click(); //Найти кнопку "Войти", нажать

        cy.intercept("GET", "https://api.pokemonbattle.ru/v2/**").as("pokemons-list_request"); //Перехватить запрос на открытие страницы с покемонами
        cy.wait("@pokemons-list_request"); //Дождаться открытия страницы с покемонами
        cy.get(pagesElements.mainPageHeaderIdButton).click(); //Найти в хедере кнопку с ID тренера, нажать


        cy.intercept("GET", "https://api.pokemonbattle.ru/v2/trainers?**").as("page-trainer_request"); //Перехватить запрос на открытие страницы тренера
        cy.wait("@page-trainer_request"); //Дождаться открытия страницы с покемонами
        cy.get(pagesElements.trainerPageChangeAvatarButton).contains("Смена аватара").click({ force: true }); //Найти кнопку "Смена аватара" с ссылкой на магазин, нажать


        cy.intercept("GET", "https://api.pokemonbattle.ru/v2/debug_menu/get_avatars").as("page-shop_request"); //Перехватить запрос на открытие страницы магазина с аватарами
        cy.wait("@page-shop_request"); //Дождаться открытия страницы магазина с аватарами
        cy.get(pagesElements.shopPageFirstAvailableAvatar).first().click({ force: true }); //Найти кнопку "Купить" в первой карточке с доступным для покупки аватаром, нажать

        cy.get(pagesElements.paymentPageCardNumberInput).type("4620869113632996"); //Найти импут для номера карты, внести значение
        cy.get(pagesElements.paymentPageCardValidDateInput).type("1225"); //Найти импут для ввода даты, внести значение
        cy.get(pagesElements.paymentpageCardCvvCodeInput).type("125"); //Найти импут для ввода CVV, внести значение
        cy.get(pagesElements.paymentPageCardHolderNameInput).type("NAME"); //Найти импут для ввода имени владельца, внести значение
        cy.get(pagesElements.paymentPageSubmitButton).click(); //Найти кнопку "Оплатить", нажать

        cy.wait(2000); //Подождать 2 секунды для загрузки страницы с инпутом для кода из смс
        cy.get(pagesElements.paymentPageVerificationCodeInput).type("56456"); //Найти импут для кода из смс, внести
        cy.get(pagesElements.paymentPageVerificationSubmitButton).click(); //Найти кнопку "Подтвердить", нажать

        cy.wait(2000); //Подождать 2 секунды для загрузки страницы
        cy.get(pagesElements.paymentPageSuccessMessageContainer).contains("Покупка прошла успешно") //Сообщение об успешной покупке
    })
})