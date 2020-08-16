import * as React from 'react'
import styled from 'styled-components'

const Contents = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2em;
  font-family: Montserrat, sans-serif;
`

export const Title: React.FC = () => {
  return (
    <Contents>
      <h1> React 8bit Paint</h1>
    </Contents>
  )
}
