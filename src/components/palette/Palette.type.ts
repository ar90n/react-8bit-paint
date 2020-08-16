export const paletteIndice = [0, 1, 2, 3] as const
export type PaletteIndex = typeof paletteIndice[number]

export const paletteColors = [
  '#757575',
  '#271B8F',
  '#0000AB',
  '#47009F',
  '#BCBCBC',
  '#0073EF',
  '#233BEF',
  '#8300F3',
  '#FFFFFF',
  '#3FBFFF',
  '#5F73FF',
  '#A78BFD',
  '#FFFFFF',
  '#ABE7FF',
  '#C7D7FF',
  '#D7CBFF',
  '#8F0077',
  '#AB0013',
  '#A70000',
  '#7F0B00',
  '#BF00BF',
  '#E7005B',
  '#DB2B00',
  '#CB4F0F',
  '#F77BFF',
  '#FF77B7',
  '#FF7763',
  '#FF9B3B',
  '#FFC7FF',
  '#FFC7DB',
  '#FFBFB3',
  '#FFDBAB',
  '#432F00',
  '#004700',
  '#005100',
  '#003F17',
  '#8B7300',
  '#009700',
  '#00AB00',
  '#00933B',
  '#F3BF3F',
  '#83D313',
  '#4FDF4B',
  '#58F898',
  '#FFE7A3',
  '#E3FFA3',
  '#ABF3BF',
  '#B3FFCF',
  '#1B3F5F',
  '#000000',
  '#00838B',
  '#00EBDB',
  '#757575',
  '#9FFFF3',
  '#BCBCBC',
] as const

export type PaletteColor = typeof paletteColors[number]
