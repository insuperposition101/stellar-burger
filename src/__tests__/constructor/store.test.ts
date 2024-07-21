import store, { rootReducer } from '../../services/store';

describe('тест rootReducer', () => {
  test('тест на неизвестное действие', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      store.getState()
    );
  });
});
