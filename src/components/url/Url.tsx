import * as React from 'react'
import styled from 'styled-components'
import * as JSONCrush from 'jsoncrush'
import copy from 'copy-to-clipboard'

import { AppState } from '../../contexts/AppContext'

export type Props = {
  state: AppState
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
`

const UrlInput = styled.input`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 80%;
  font-size: 12px;
  padding: 3px 8px;
  border: 1px solid #b2b2b2;
  outline: none;
`

const CopyButton = styled.button`
  margin-left: -1px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 6px 14px;
  border: 1px solid #b2b2b2;
  outline: none;
  :hover {
    background-color: #dadada;
  }
  :active {
    background-color: #cacaca;
  }
`

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path d="M7 13h10v1h-10v-1zm15-11v22h-20v-22h3c1.229 0 2.18-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1zm9 15.135c-1.073 1.355-2.448 2.763-3.824 3.865h3.824v-3.865zm0-14.135h-4l-2 2h-3.898l-2.102-2h-4v18h7.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-9.543zm-13 12h5v-1h-5v1zm0-4h10v-1h-10v1zm0-2h10v-1h-10v1z" />
  </svg>
)

const createCrushedUrl = (state: AppState) => {
  const crushed = JSONCrush.JSONCrush(JSON.stringify(state))
  return `${window.location.origin}${window.location.pathname}?state=${crushed}`
}

export const Url: React.FC<Props> = ({ state }) => {
  const url = createCrushedUrl(state)
  const onClick = () => copy(url)
  return (
    <Container>
      <UrlInput value={url} readOnly />
      <CopyButton onClick={onClick}>
        <CopyIcon />
      </CopyButton>
    </Container>
  )
}
