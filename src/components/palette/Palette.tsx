import React, { useRef } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { useModal } from 'react-modal-hook'

import { PaletteColor, PaletteIndex } from './Palette.type'

type ColorSampleProps = {
  color: PaletteColor
}

const ColorSample = styled.div`
  margin: 1px;
  border-radius: 6px;
  background-color: ${({ color }: ColorSampleProps) => color};
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

export type PaletteProps = {
  colors: PaletteColor[]
  onPickColor: ({
    idx,
    color,
  }: {
    idx: PaletteIndex
    color: PaletteColor
  }) => void
}

export const Palette: React.FC<PaletteProps> = ({ colors, onPickColor }) => {
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

const PickerColorSample = styled(ColorSample)`
  width: 24px;
  height: 24px;
`

export type ColorPickerProps = {
  onPickColor: (color: PaletteColor) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onPickColor }) => {
  const colors = [
    ['#000000', '#757575', '#BCBCBC', '#FFFFFF'],
    ['#271B8F', '#0073EF', '#3FBFFF', '#ABE7FF'],
    ['#0000AB', '#233BEF', '#5F73FF', '#C7D7FF'],
    ['#47009F', '#8300F3', '#A78BFD', '#D7CBFF'],
    ['#8F0077', '#BF00BF', '#F77BFF', '#FFC7FF'],
    ['#AB0013', '#E7005B', '#FF77B7', '#FFC7DB'],
    ['#A70000', '#DB2B00', '#FF7763', '#FFBFB3'],
    ['#7F0B00', '#CB4F0F', '#FF9B3B', '#FFDBAB'],
    ['#432F00', '#8B7300', '#F3BF3F', '#FFE7A3'],
    ['#004700', '#009700', '#83D313', '#E3FFA3'],
    ['#005100', '#00AB00', '#4FDF4B', '#ABF3BF'],
    ['#003F17', '#00933B', '#58F898', '#B3FFCF'],
    ['#1B3F5F', '#00838B', '#00EBDB', '#9FFFF3'],
  ]

  const ps = colors.map(cs => {
    const cc = cs.map(c => (
      <PickerColorSample
        color={c as PaletteColor}
        onClick={() => onPickColor(c as PaletteColor)}
      />
    ))
    return <div> {cc} </div>
  })

  return <div style={{ display: 'flex' }}> {ps} </div>
}
