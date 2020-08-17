import React from 'react'
import styled from 'styled-components'

import { paletteColors, PaletteColor, PaletteIndex } from './Palette.type'

const PickerColorSample = styled.div`
  margin: 1px;
  border-radius: 6px;
  background-color: ${({ color }: { color: PaletteColor }) => color};
  width: 24px;
  height: 24px;
`

const Container = styled.div`
  display: flex;
`

const getPaletteColorGrid = () => {
  return paletteColors.reduce((acc, cur, idx) => {
    if (idx % 4 == 0) {
      acc.push([])
    }
    acc[acc.length - 1].push(cur)
    return acc
  }, [] as PaletteColor[][])
}

type Props = {
  onPickColor: (color: PaletteColor) => void
}

export const ColorPicker: React.FC<Props> = ({ onPickColor }) => {
  const colors = getPaletteColorGrid()

  const colorSamples = colors.map(cs => (
    <div>
      {(() =>
        cs.map(c => (
          <PickerColorSample
            color={c as PaletteColor}
            onClick={() => onPickColor(c as PaletteColor)}
          />
        )))()}
    </div>
  ))

  return <Container> {colorSamples} </Container>
}
