import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { AppStateProvider, createInitialState } from './contexts/AppContext'
import Modal from 'react-modal'
import { ModalProvider } from 'react-modal-hook'
import { App } from './containers/App'

const GlobalStyle = createGlobalStyle`
  body {
    background: #e2e2e2;
    margin: 0;
    padding: 0;
    font-family: "Nunito Sans";
    color: #374054
  }
  p {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    padding: 0;
  }
`

const appState = createInitialState()

Modal.setAppElement('#modal')

render(
  <React.StrictMode>
    <GlobalStyle />
    <AppStateProvider initialState={appState}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
