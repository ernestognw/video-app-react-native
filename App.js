import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import LoadingScreen from './src/sections/components/loading-screen';
import AppLayout from './src/app';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider
        store={store}
      >
        <PersistGate
          loading={<LoadingScreen />}
          persistor={persistor}
        >
          <AppLayout />
        </PersistGate>
      </Provider>
    );
  }
}