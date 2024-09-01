import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { persistor, store } from '../store'
import { PersistGate } from 'redux-persist/integration/react'

const providerWrapper = ({ children }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

export default providerWrapper;