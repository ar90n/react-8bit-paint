import * as React from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { useModal } from 'react-modal-hook'
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
  const [showModal, hideModal] = useModal(() => (
    <Modal
      isOpen
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
        },
      }}
      onRequestClose={hideModal}
    >
        <div>fsdfasfasdfasdf</div>
      <ColorPicker onColorPick={color => {}} />
    </Modal>
  ))

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
        const data = appState.data.map((v, idx) => {
          const inc = +(idx === pixelIndex)
          return ((v + inc) % 4) as PaletteIndex
        })
        return { ...appState, data }
      }
    )
  }

  const onClickColor = (idx: PaletteIndex) => {
    showModal()
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
        <Palette colors={appState.palette} onClickColor={onClickColor} />
      </Contents>
      <Url state={appState} />
    </Main>
  )
}
