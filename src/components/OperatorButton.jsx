import React from 'react'
import { ACTIONS } from './Calculator'
import '../output.css'

const OperatorButton = ({ dispatch, operator }) => {
    return (
        <button className="p-4 bg-yellow-500 hover:bg-opacity-90"
            onClick={() => { dispatch({ type: ACTIONS.OPERATOR, payload: { operator } }) }}>
            {operator}
        </button>
    )
}

export default OperatorButton