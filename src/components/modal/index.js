import React from 'react'
import './index.css'
import { useDispatch } from 'react-redux';
import { initGame, endGame } from '../../slices/gameSlice'

function Modal({ n }) {
  const dispatch = useDispatch()

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h3>Start over?</h3>
        <div>
          <button id='yes' onClick={() => dispatch(initGame(n))}>Yes</button>
          <button id='no' onClick={() => dispatch(endGame())}>No</button>
        </div>
      </div>
    </div>
    
  )
}

export default Modal
