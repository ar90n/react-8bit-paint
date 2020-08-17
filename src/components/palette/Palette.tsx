import React, { useRef } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { useModal } from 'react-modal-hook'

import { PaletteColor, PaletteIndex } from './Palette.type'
import { ColorPicker } from './ColorPicker'

const PaletteColorSample = styled.div`
  margin: 1px;
  border-radius: 6px;
  background-color: ${({ color }: { color: PaletteColor }) => color};
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
  onPickColor: ({
    idx,
    color,
  }: {
    idx: PaletteIndex
    color: PaletteColor
  }) => void
}

const getModalContent = (elm: Element | null): React.CSSProperties => {
  const defaultContent = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid #ccc',
    background: '#f2f2f2',
    borderRadius: '6px',
    padding: '20px',
    overflow: 'hidden',
  } as const

  if (elm === null) {
    return defaultContent
  }

  const rect = elm.getBoundingClientRect()
  const left = `${(rect.left + rect.right) / 2}px`
  const top = `${(rect.top + rect.bottom) / 2}px`
  return { ...defaultContent, left, top }
}

const ColorCard: React.FC<ColorCardProps> = ({
  idx,
  color,
  onPickColor,
}: ColorCardProps) => {
  const colorEl = useRef(null)
  const [showModal, hideModal] = useModal(() => {
    const content = getModalContent(colorEl.current)
    return (
      <Modal
        isOpen
        style={{
          overlay: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          content,
        }}
        onRequestClose={hideModal}
      >
        <ColorPicker
          onPickColor={(color: PaletteColor) => {
            onPickColor({ idx, color })
            hideModal()
          }}
        />
      </Modal>
    )
  })

  const onClick = () => {
    showModal()
  }
  return (
    <CardContainer>
      <PaletteColorSample ref={colorEl} color={color} onClick={onClick} />
      <Index> {`${idx}`} </Index>
      <ColorCode> {color} </ColorCode>
    </CardContainer>
  )
}

const Container = styled.div`
  height: 100%;
  margin: 16px;
  padding 8px;
  border-radius: 6px;
  background-color: #b2b2b2;
`

export type Props = {
  colors: PaletteColor[]
  onPickColor: ({
    idx,
    color,
  }: {
    idx: PaletteIndex
    color: PaletteColor
  }) => void
}

export const Palette: React.FC<Props> = ({ colors, onPickColor }) => {
  const colorCards = colors.map((color, idx) => {
    const paletteIndex = idx as PaletteIndex
    return (
      <ColorCard
        key={`${color}_${idx}`}
        color={color}
        idx={paletteIndex}
        onPickColor={onPickColor}
      />
    )
  })

  return <Container>{colorCards} </Container>
}
