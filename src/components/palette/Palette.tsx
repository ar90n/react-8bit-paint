import * as React from 'react'
import styled from 'styled-components'

import {PaletteColor, PaletteIndex} from './Palette.type'

type ColorSampleProps = {
    color: PaletteColor
}

const ColorSample = styled.div`
  margin: 1px;
  border-radius: 6px;
  background-color: ${({color}: ColorSampleProps) => color};
`

const PaletteColorSample = styled(ColorSample)`
  width: 100%;
  height: 100%;
  grid-row: 1 / 3;
  grid-column: 1;
`

const ColorCode = styled.div`
  display: flex;
  align-items: center;
  grid-row: 2 / 3;
  grid-column: 2;
`

const Index = styled.div`
  display: flex;
  align-items: center;
  grid-row: 1 / 2;
  grid-column: 2;
  font-weight: 700;
`

const CardContainer = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 48px 120px;
  grid-template-rows: 24px 24px;
  border-radius: 6px;
  padding: 8px;
  margin: 3px;
  background-color: #d2d2d2;
`

type ColorCardProps = {
    idx: PaletteIndex
    color: PaletteColor
    onClickColor: () => void
}

const ColorCard: React.FC<ColorCardProps> = ({
    idx,
    color,
    onClickColor,
}: ColorCardProps) => {
    return (
        <CardContainer>
            <PaletteColorSample color={color} onClick={() => onClickColor()} />
            <Index> {`${idx}`} </Index>
            <ColorCode> {color} </ColorCode>
        </CardContainer>
    )
}

const Container = styled.div`
  margin: 16px;
  padding 8px;
  border-radius: 6px;
  background-color: #b2b2b2;
`

export type PaletteProps = {
    colors: PaletteColor[]
    onClickColor: (idx: PaletteIndex) => void
}

export const Palette: React.FC<PaletteProps> = ({colors, onClickColor}) => {
    const colorCards = colors.map((color, idx) => {
        return (
            <ColorCard
                key={`${color}_${idx}`}
                color={color}
                idx={idx as PaletteIndex}
                onClickColor={() => onClickColor(idx as PaletteIndex)}
            />
        )
    })

    return <Container>{colorCards} </Container>
}


const PickerColorSample = styled(ColorSample)`
    width: 24px;
    height: 24px;
`

export type ColorPickerProps = {
    onColorPick: (color: PaletteColor) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = props => {
    return (
        <div>
            <p>Pick Color20</p>
            <PickerColorSample color="#004700" />
        </div>
    )
}
