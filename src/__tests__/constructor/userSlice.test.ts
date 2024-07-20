import {
  apiGetUser,
  login,
  logout,
  register,
  updateUserData,
  userReducer,
  initialState
} from '../../services/userSlice';

describe('Тестирование экшенов слайса userSlise', () => {
  describe('получение данных пользователя', () => {
    test('fulfilled', () => {
      const state = userReducer(initialState, {
        type: apiGetUser.fulfilled.type,
        payload: { user: { name: 'TestName', email: 'TestEmail' } }
      });
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toStrictEqual({
        name: 'TestName',
        email: 'TestEmail'
      });
    });
    test('rejected', () => {
      const state = userReducer(initialState, {
        type: apiGetUser.rejected.type,
        error: { message: 'Test Message' }
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe('Test Message');
    });
  });

  describe('регистрация пользователя', () => {
    test('fulfilled', () => {
      const state = userReducer(initialState, {
        type: register.fulfilled.type,
        payload: { user: { name: 'Test User', email: 'test@test.com' } }
      });
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toStrictEqual({
        name: 'Test User',
        email: 'test@test.com'
      });
      expect(state.error).toBe('');
    });

    test('rejected', () => {
      const state = userReducer(initialState, {
        type: register.rejected.type,
        error: { message: 'Test Message' }
      });
      expect(state.error).toBe('Test Message');
    });

    test('pending', () => {
      const state = userReducer(initialState, {
        type: register.pending.type
      });
      expect(state.error).toBe('');
    });
  });

  describe('авторизация пользователя', () => {
    test('fulfilled', () => {
      const state = userReducer(initialState, {
        type: login.fulfilled.type,
        payload: { user: { name: 'Test User', email: 'test@test.com' } }
      });
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toStrictEqual({
        name: 'Test User',
        email: 'test@test.com'
      });
      expect(state.error).toBe('');
    });

    test('rejected', () => {
      const state = userReducer(initialState, {
        type: login.rejected.type,
        error: { message: 'Test Message' }
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe('Test Message');
    });

    test('pending', () => {
      const state = userReducer(initialState, {
        type: login.pending.type
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe('');
    });
  });

  describe('редактирование информации о пользователе', () => {
    test('fulfilled', () => {
      const state = userReducer(initialState, {
        type: updateUserData.fulfilled.type,
        payload: { user: { name: 'Test User', email: 'test@test.com' } }
      });
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toStrictEqual({
        name: 'Test User',
        email: 'test@test.com'
      });
    });

    test('rejected', () => {
      const state = userReducer(initialState, {
        type: updateUserData.rejected.type,
        error: { message: 'Test Message' }
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe('Test Message');
    });

    test('pending', () => {
      const state = userReducer(initialState, {
        type: updateUserData.pending.type
      });
      expect(state.error).toBe('');
    });
  });

  describe('выход из аккаунта', () => {
    test('fulfilled', () => {
      const state = userReducer(initialState, {
        type: logout.fulfilled.type
      });
      expect(state.isAuthChecked).toBe(false);
      expect(state.user.name).toBe('');
      expect(state.user.email).toBe('');
    });
  });
});
