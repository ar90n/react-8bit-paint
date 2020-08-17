import * as React from 'react'
import styled from 'styled-components'
import { Title } from '../title'
import { Canvas } from '../canvas'
import { Palette, PaletteColor } from '../palette'
import { AppState } from '../../contexts/AppContext'
import { Url } from '../url'

const Contents = styled.div`
  display: flex;
  justify-content: center;
`

const HowTo = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 1.5em;
  font-weight: 700;
  font-size: 1.2em;
`

const Main = styled.div`
  max-width: 50em;
  min-width: 50em;
  margin: 0 auto 1.5em;
  padding: 3rem;
  width: 80%;
`

export type Props = {
  appState: AppState
  onClickPixel: (idx: number) => void
  onPickColor: ({ idx, color }: { idx: number; color: PaletteColor }) => void
}

export const Edit: React.FC<Props> = ({
  appState,
  onClickPixel,
  onPickColor,
}) => {
  return (
    <Main>
      <Title />
      <HowTo>
        <ul>
          <li> Click any pixels to increment its color index </li>
          <li> Click any palette colors to change its colors </li>
          <li> The result is saved as URL in the bottom of this page</li>
        </ul>
      </HowTo>
      <Contents>
        <Canvas
          data={appState.data}
          palette={appState.palette}
          onClickPixel={onClickPixel}
        />
        <Palette colors={appState.palette} onPickColor={onPickColor} />
      </Contents>
      <Url state={appState} />
    </Main>
  )
}
