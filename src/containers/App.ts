import * as React from 'react'
import { Edit } from '../components/edit'
import { useAppState, AppState } from '../contexts/AppContext'
import { PaletteIndex, PaletteColor } from '../components/palette'

export const App = () => {
  const [appState, setAppState] = useAppState()

  const onClickPixel = (idx: number) => {
    setAppState(
      (appState: AppState): AppState => {
        const data = [...appState.data]
        data[idx] = ((data[idx] + 1) % 4) as PaletteIndex
        return { ...appState, data }
      }
    )
  }

  const onPickColor = ({
    idx,
    color,
  }: {
    idx: number
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

  return Edit({
    appState,
    onClickPixel,
    onPickColor,
  })
}
