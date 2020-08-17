import * as React from 'react'
import styled from 'styled-components'

import { CanvasSize, canvasSizes } from './Canvas.type'
import { PaletteIndex, PaletteColor } from '../palette'

type PixelProps = {
  size: number
  color: string
  row: number
  col: number
  onClick: () => void
}

const Pixel = styled.div`
  margin: 1px;
  border-radius: 6px;
  background-color: ${(props: PixelProps) => props.color};
  width: ${(props: PixelProps) => `${props.size}px`};
  height: ${(props: PixelProps) => `${props.size}px`};
  grid-row: ${(props: PixelProps) => props.row + 1};
  grid-column: ${(props: PixelProps) => props.col + 1};
`

const PixelContainer = styled.div`
  display: grid;
  margin: 16px;
  grid-template-columns: repeat(${({ size }: { size: number }) => size}, 1fr);
  grid-template-rows: repeat(${({ size }: { size: number }) => size}, 1fr);
`

const getCanvasSize = (data: PaletteIndex[]): CanvasSize => {
  const canvasSize = canvasSizes.find(size => size * size === data.length)
  if (canvasSize === undefined) {
    throw Error('Not supported canvas size')
  }

  return canvasSize
}

export type Props = {
  data: PaletteIndex[]
  palette: PaletteColor[]
  onClickPixel: (idx: number) => void
}

export const Canvas: React.FC<Props> = ({ data, palette, onClickPixel }) => {
  const canvasSize = getCanvasSize(data)
  const pixels = data.map((code, idx) => {
    const row = Math.floor(idx / canvasSize)
    const col = idx % canvasSize
    const onClick = () => onClickPixel(idx)
    return (
      <Pixel
        key={`${row}_${col}`}
        color={palette[code]}
        size={32}
        row={row}
        col={col}
        onClick={onClick}
      />
    )
  })

  return <PixelContainer size={canvasSize}> {pixels} </PixelContainer>
}
