export const paletteIndice = [0, 1, 2, 3] as const
export type PaletteIndex = typeof paletteIndice[number]

export const paletteColors = [
  '#000000',
  '#757575',
  '#BCBCBC',
  '#FFFFFF', //
  '#271B8F',
  '#0073EF',
  '#3FBFFF',
  '#ABE7FF', //
  '#0000AB',
  '#233BEF',
  '#5F73FF',
  '#C7D7FF', //
  '#47009F',
  '#8300F3',
  '#A78BFD',
  '#D7CBFF', //
  '#8F0077',
  '#BF00BF',
  '#F77BFF',
  '#FFC7FF', //
  '#AB0013',
  '#E7005B',
  '#FF77B7',
  '#FFC7DB', //
  '#A70000',
  '#DB2B00',
  '#FF7763',
  '#FFBFB3', //
  '#7F0B00',
  '#CB4F0F',
  '#FF9B3B',
  '#FFDBAB', //
  '#432F00',
  '#8B7300',
  '#F3BF3F',
  '#FFE7A3', //
  '#004700',
  '#009700',
  '#83D313',
  '#E3FFA3', //
  '#005100',
  '#00AB00',
  '#4FDF4B',
  '#ABF3BF', //
  '#003F17',
  '#00933B',
  '#58F898',
  '#B3FFCF', //
  '#1B3F5F',
  '#00838B',
  '#00EBDB',
  '#9FFFF3', //
] as const
export type PaletteColor = typeof paletteColors[number]
