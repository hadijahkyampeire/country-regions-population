import React from 'react';
import enzyme from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';

import { makeStore, alwaysSuccess } from 'utils/tests';

test('renders app correctly', () => {
  const state = {
    people: { people: [{ id: 1, name: 'me' }], pending: false, error: 'something wrong' }
  };
  const http = {
    get: alwaysSuccess({})
  };
  const store = makeStore({ http }, state);

  const app = enzyme.mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // check it has a navbar
  const NavBar = app.find('NavBar');
  expect(NavBar).toHaveLength(1);
  expect(NavBar.find('NavLink')).toHaveLength(3);
  expect(NavBar.find('NavLink a').map(link => link.text())).toEqual([
    'Home',
    'People',
    'Districts'
  ]);
});
