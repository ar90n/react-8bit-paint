import * as React from 'react'
import styled from 'styled-components'
import { Title } from '../components/title'
import { range } from '../libs/util'
import { Canvas, CanvasSize } from '../components/canvas'
import {
  Palette,
  PaletteProps,
  PaletteIndex,
  PaletteColor,
  ColorPicker,
  ColorPickerProps,
} from '../components/palette'
import { useAppState, AppState } from '../contexts/AppContext'
import { Url } from '../components/url'

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

export const Edit: React.FC = () => {
  const [appState, setAppState] = useAppState()

  const onClickPixel = ({
    row,
    col,
    canvasSize,
  }: {
    row: number
    col: number
    canvasSize: number
  }) => {
    const pixelIndex = row * canvasSize + col
    setAppState(
      (appState: AppState): AppState => {
        const data = [...appState.data]
        data[pixelIndex] = ((data[pixelIndex] + 1) % 4) as PaletteIndex
        return { ...appState, data }
      }
    )
  }

  const onPickColor = ({
    idx,
    color,
  }: {
    idx: PaletteIndex
    color: PaletteColor
  }) => {
    setAppState(
      (appState: AppState): AppState => {
        const palette = [...appState.palette]
        palette[idx] = color
        return { ...appState, palette }
      }
    )
  }
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
