import React from 'react'
import { ACTIONS } from './Calculator'
import '../output.css'

const DigitButton = ({dispatch, digit}) => {
  return (
    <button className="p-4 bg-gray-600 hover:opacity-80"
          onClick={() => { dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } }) }}>
          {digit}
        </button>
  )
}

export default DigitButton