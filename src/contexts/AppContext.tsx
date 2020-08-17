import * as React from 'react'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import * as JSONCrush from 'jsoncrush'
import queryString from 'query-string'

import { range } from '../libs/util'
import { canvasSizes } from '../components/canvas'
import { PaletteIndex, PaletteColor } from '../components/palette'

export type AppState = {
  palette: PaletteColor[]
  data: PaletteIndex[]
}

const initialState: AppState = {
  palette: ['#000000', '#757575', '#BCBCBC', '#FFFFFF'],
  data: range(canvasSizes[1] * canvasSizes[1]).map(() => 0),
}

export const createInitialState = (): AppState => {
  const { state } = queryString.parse(location.search)
  if (!state) {
    return initialState
  }

  return JSON.parse(JSONCrush.JSONUncrush(state))
}

export function useAppState(): [AppState, Dispatch<SetStateAction<AppState>>] {
  const appState = useContext(AppStateContext)
  const setAppState = useContext(SetAppStateContext)
  return [appState, setAppState]
}

export const AppStateProvider = (props: {
  initialState?: AppState
  children: React.ReactNode
}) => {
  const [state, setState] = useState<AppState>(
    props.initialState ?? initialState
  )
  return (
    <AppStateContext.Provider value={state}>
      <SetAppStateContext.Provider value={setState}>
        {props.children}
      </SetAppStateContext.Provider>
    </AppStateContext.Provider>
  )
}

const AppStateContext = React.createContext<AppState>(initialState)
const SetAppStateContext = React.createContext<
  Dispatch<SetStateAction<AppState>>
>(() => void 0)
