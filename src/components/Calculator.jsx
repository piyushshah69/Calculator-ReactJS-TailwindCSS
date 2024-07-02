/* eslint-disable default-case */
import React, { useReducer, useState } from 'react'
import '../output.css'
import DigitButton from './DigitButton'
import OperatorButton from './OperatorButton'

const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    DELETE_LAST: 'delete-last',
    CLEAR_ALL: 'clear-all',
    OPERATOR: 'operator',
    EVALUATE: 'evaluate',
}

const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === '0' && state.currentOperand === '0') {
                return state
            }
            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            }
        case ACTIONS.CLEAR_ALL:
            return {}
        case ACTIONS.DELETE_LAST:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }
            if (state.currentOperand == null || state.currentOperand == 0) {
                return state
            }
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: 0
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.OPERATOR:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operator: payload.operator
                }
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operator: payload.operator,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                currentOperand: null,
                operator: payload.operator,
            }
        case ACTIONS.EVALUATE:
            if (state.operator == null || state.currentOperand == null || state.previousOperand == null) {
                return state
            }

            return {
                ...state,
                previousOperand: null,
                currentOperand: evaluate(state),
                operator: null,
                overwrite: true,
            }
    }
}

const evaluate = ({ currentOperand, previousOperand, operator }) => {
    const current = parseFloat(currentOperand);
    const previous = parseFloat(previousOperand);
    let calculation = '';

    if (isNaN(current) || isNaN(previous)) {
        return ''
    }
    switch (operator) {
        case '+':
            calculation = previous + current;
            break;
        case '-':
            calculation = previous - current;
            break;
        case 'x':
            calculation = previous * current;
            break;
        case '÷':
            calculation = previous / current;
            break;
        case '%':
            calculation = previous % current;
            break;
    }

    return calculation.toString();
}

const Calculator = () => {
    const [{ currentOperand = '0', previousOperand, operator }, dispatch] = useReducer(reducer, {})
    return (
        <div className="bg-gray-900 text-white text-3xl max-w-[20rem] w-[80%]">
            <div className="min-h-[80px] flex justify-end items-center px-6">
                <h1 className='text-5xl overflow-x-scroll no-scrollbar'>{currentOperand}</h1>
            </div>
            <div className='flex flex-col gap-[2px]'>
                <div className='grid grid-cols-4 gap-[2px]'>
                    <button className="p-4  bg-gray-700" onClick={()=>{dispatch({type: ACTIONS.CLEAR_ALL})}}>AC</button>
                    <button className="p-4  bg-gray-700" onClick={() => { dispatch({ type: ACTIONS.DELETE_LAST }) }}>CE</button>
                    <OperatorButton operator='%' dispatch={dispatch} />
                    <OperatorButton operator='÷' dispatch={dispatch} />
                </div>
                <div className='grid grid-cols-4 gap-[2px]'>
                    <DigitButton digit='7' dispatch={dispatch} />
                    <DigitButton digit='8' dispatch={dispatch} />
                    <DigitButton digit='9' dispatch={dispatch} />
                    <OperatorButton operator='x' dispatch={dispatch} />
                </div>
                <div className='grid grid-cols-4 gap-[2px]'>
                    <DigitButton digit='4' dispatch={dispatch} />
                    <DigitButton digit='5' dispatch={dispatch} />
                    <DigitButton digit='6' dispatch={dispatch} />
                    <OperatorButton operator='+' dispatch={dispatch} />
                </div>
                <div className='grid grid-cols-4 gap-[2px]'>
                    <DigitButton digit='1' dispatch={dispatch} />
                    <DigitButton digit='2' dispatch={dispatch} />
                    <DigitButton digit='3' dispatch={dispatch} />
                    <OperatorButton operator='-' dispatch={dispatch} />
                </div>
                <div className='grid grid-cols-4 gap-[2px]'>
                    <DigitButton digit='0' dispatch={dispatch} />
                    <DigitButton digit='.' dispatch={dispatch} />
                    <button className="p-4 col-span-2 bg-gray-700" onClick={() => { dispatch({ type: ACTIONS.EVALUATE }) }}>=</button>
                </div>
            </div>
        </div>
    )
}

export {ACTIONS, Calculator}
// ÷