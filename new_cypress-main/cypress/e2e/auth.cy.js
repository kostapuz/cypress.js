import * as data from "../helpers/auth.default_data.json"
import * as mainPageElements from "../locators/auth.main_page_elements.json"
import * as resultPageElements from "../locators/auth.result_page_elements.json"
import * as recoveryPasswordPageElements from "../locators/auth.recovery_password_page_elements.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); //Открыть сайт
        cy.get(mainPageElements.forgot_password_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить наличие кнопки "Забыли пароль?" и её CSS-свойства
    });

    afterEach('Конец теста', function () {
        cy.get(resultPageElements.close_button).should('be.visible'); //Проверить наличие крестика в попапе
    });

    //Верный логин и верный пароль
    it('Верный пароль и верный логин', function () {
        cy.get(mainPageElements.email).type(data.login); //Найти импут почты и ввести верный логин
        cy.get(mainPageElements.password).type(data.password); //Найти импут пароля и ввести верный пароль
        cy.get(mainPageElements.login_button).click(); //Найти кнопку "Войти" и нажать
        cy.wait(1000); //Подождать 1с для открытия попапа
        cy.get(resultPageElements.result_popup).should('be.visible'); // Открылся попап
        cy.get(resultPageElements.result_popup_message).contains('Авторизация прошла успешно'); //Текст в попапе содержит "Авторизация прошла успешно"
    })

    //Восстановление пароля
    it('Восстановление пароля', function () {
        cy.get(mainPageElements.forgot_password_btn).click(); //Найти кнопку "Забыли пароль?" и нажать
        cy.get(recoveryPasswordPageElements.forgot_form).should('be.visible'); // Открылся попап с формой
        cy.get(recoveryPasswordPageElements.forgot_form_email_input).type(data.login); //Найти инпут и ввести верный логин
        cy.get(recoveryPasswordPageElements.forgot_form_send_button).click(); //Найти кнопку "Отправить код" и нажать
        cy.wait(1000); //Подождать 1с для открытия попапа
        cy.get(resultPageElements.result_popup).should('be.visible'); // Открылся попап
        cy.get(resultPageElements.result_popup_message).contains('Успешно отправили пароль на e-mail'); //Текст в попапе содержит "Успешно отправили пароль на e-mail"
    })

    //Верный логин и НЕверный пароль
    it('Верный логин и неверный пароль', function () {
        cy.get(mainPageElements.email).type(data.login); //Найти импут почты и ввести верный логин  
        cy.get(mainPageElements.password).type("incorrect123"); //Найти импут пароля и ввести НЕверный пароль
        cy.get(mainPageElements.login_button).click(); //Найти кнопку "Войти" и нажать
        cy.wait(1000); //Подождать 1с для открытия попапа
        cy.get(resultPageElements.result_popup).should('be.visible'); // Открылся попап
        cy.get(resultPageElements.result_popup_message).contains('Такого логина или пароля нет'); //Текст в попапе содержит "Такого логина или пароля нет"

    })

    //НЕверный логин и верный пароль
    it('Неверный логин и верный пароль', function () {
        cy.get(mainPageElements.email).type("test@yandex.ru"); //Найти импут почты и ввести НЕверный логин  
        cy.get(mainPageElements.password).type(data.password); //Найти импут пароля и ввести верный пароль
        cy.get(mainPageElements.login_button).click(); //Найти кнопку "Войти" и нажать
        cy.wait(1000); //Подождать 1с для открытия попапа
        cy.get(resultPageElements.result_popup).should('be.visible'); // Открылся попап
        cy.get(resultPageElements.result_popup_message).contains('Такого логина или пароля нет'); //Текст в попапе содержит "Такого логина или пароля нет"
    })

    //Наличие @ в пароле
    it('Валидация на наличие @ в логине', function () {
        cy.get(mainPageElements.email).type("test.ru"); //Найти импут почты и ввести логин без @
        cy.get(mainPageElements.password).type(data.password); //Найти импут пароля и ввести верный пароль
        cy.get(mainPageElements.login_button).click(); //Найти кнопку "Войти" и нажать
        cy.wait(1000); //Подождать 1с для открытия попапа
        cy.get(resultPageElements.result_popup).should('be.visible'); // Открылся попап
        cy.get(resultPageElements.result_popup_message).contains('Нужно исправить проблему валидации'); //Текст в попапе содержит "Нужно исправить проблему валидации"
    })

    //Строчные буквы в логине
    it('Приведение к строчным буквам в логине', function () {
        cy.get(mainPageElements.email).type("GerMan@Dolnikov.ru"); //Найти импут почты и ввести логин разным регистром
        cy.get(mainPageElements.password).type(data.password); //Найти импут пароля и ввести верный пароль
        cy.get(mainPageElements.login_button).click(); //Найти кнопку "Войти" и нажать
        cy.wait(1000); //Подождать 1с для открытия попапа
        cy.get(resultPageElements.result_popup).should('be.visible'); // Открылся попап
        cy.get(resultPageElements.result_popup_message).contains('Успешно отправили пароль на e-mail'); //Текст в попапе содержит "Успешно отправили пароль на e-mail"
    })
})