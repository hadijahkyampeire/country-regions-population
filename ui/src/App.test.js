import React from 'react';
import enzyme from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';

import { makeStore } from 'utils/tests';

test('renders app correctly', () => {
  const initialState = {
    people: { people: [{ id: 1, name: 'me' }] }
  };
  const store = makeStore(initialState);

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
