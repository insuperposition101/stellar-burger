import ingredients from '../fixtures/ingredients.json';
import orderData from '../fixtures/orders.json';
const constructor = '[data-cy=constructor]';
const modal = '[data-cy=modal]';
const closeButton = '[data-cy=close-button]';

beforeEach(() => {
  cy.intercept('GET', `api/ingredients`, {
    fixture: 'ingredients.json'
  });

  cy.intercept('GET', `api/auth/user`, {
    fixture: 'user.json'
  });

  cy.visit('/');
});

describe('Добавление ингредиента в конструктор', () => {
  it('добавление булки до клику мыши', () => {
    cy.get(`[data-cy=${ingredients.data[0]._id}]`).contains('Добавить').click();
    cy.get(constructor).should('contain', 'Краторная булка N-200i');
  });

  it('добавление начинки до клику мыши', () => {
    cy.get(`[data-cy=${ingredients.data[1]._id}]`).contains('Добавить').click();
    cy.get(constructor).should('contain', 'Биокотлета из марсианской Магнолии');
  });
});

describe('Открытие / закрытие модального окна ингредиента', () => {
  it('открытие модального окна с нужным ингредиентом', () => {
    cy.contains(`${ingredients.data[1].name}`).click();
    cy.get(modal).should('exist');
    cy.get(modal).contains('Биокотлета из марсианской Магнолии');
  });

  it('закрытие по клику на крестик', () => {
    cy.contains(`${ingredients.data[1].name}`).click();
    cy.get(closeButton).click();
    cy.get(modal).should('not.exist');
  });

  it('закрытие по клику на оверлей', () => {
    cy.contains(`${ingredients.data[1].name}`).click();
    cy.get('[data-cy=overlay]').click({ force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('POST', `api/orders`, {
      fixture: 'orders.json'
    }).as('createOrder');

    window.localStorage.setItem('refreshToken', '123');
    cy.setCookie('accessToken', 'abc');
  });

  it('добавление ингредиентов и оформление заказа', () => {
    cy.get(`[data-cy=${ingredients.data[0]._id}]`).contains('Добавить').click();
    cy.get(`[data-cy=${ingredients.data[5]._id}]`).contains('Добавить').click();
    cy.get(`[data-cy=${ingredients.data[3]._id}]`).contains('Добавить').click();

    cy.get(constructor).contains('Краторная булка N-200i (верх)');
    cy.get(constructor).contains('Краторная булка N-200i (низ)');
    cy.get(constructor).contains('Мясо бессмертных моллюсков Protostomia');
    cy.get(constructor).contains('Соус Spicy-X');

    cy.get('[data-cy=order-button]').click();
    cy.wait('@createOrder').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('success', true);
      expect(interception.response?.body.order).to.have.property(
        '_id',
        '66967fcf119d45001b4f93b2'
      );
      expect(interception.response?.body.order).to.have.property(
        'status',
        'done'
      );
      expect(interception.response?.body.order).to.have.property(
        'name',
        'Астероидный флюоресцентный антарианский бургер'
      );
      expect(interception.response?.body.order).to.have.property(
        'number',
        45904
      );
    });

    cy.get(modal).should('exist');
    cy.get(modal).contains(orderData.order.number);

    cy.get(closeButton).click();
    cy.get(modal).should('not.exist');

    cy.get(constructor).contains('Выберите булки');
    cy.get(constructor).contains('Выберите начинку');
    cy.get(constructor).contains('Выберите булки');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
