import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import moviesSlice from '../moviesSlice'
import starredSlice from '../starredSlice'
import watchLaterSlice from '../watchLaterSlice'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { 
        movies: moviesSlice.reducer, 
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {

  setupListeners(store.dispatch)

  function Wrapper({ children }) {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}